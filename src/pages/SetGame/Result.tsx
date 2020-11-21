import React, { useCallback, useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import '../../assets/Result.css'
import { Avatar, Button, makeStyles } from '@material-ui/core'
import {LightTooltip, SelectBox, TextInput} from '../../components'
import shortId from 'shortid'
import {PlayersModal} from '../../components'
const useStyles = makeStyles({
    avatar:{
        width: "100px",
        height: "100px",
        margin: "20px",
    },
    Addplayer:{
        width: "100px",
        height: "100px",
        margin: '20px',
        fontSize: "20px",
        display: 'teble-cell',
        verticalAlign: 'middle',
        '&:hover':{
            transform: 'scale(1.2)',
        }
    },
    next:{
        margin: '0 auto',
        fontSize: "16px",
        fontWeight: 600,
    }
})

const pitchs = [{id: 1, name: "右"},{id: 2, name: '左'}]

const Result = () => {
    const classes = useStyles()
    const gameId = window.location.pathname.split('/game/set/')[1]

    const [results, setResults] = useState([])
    const [players, setPlayers] = useState([])
    const [bats, setBats] = useState([])
    const [pitch, setPitch] = useState({})
    const [game, setGame] = useState<any>({})
    const [player, setPlayer] = useState<any>({})
    const [result, setResult] = useState<any>({}) 
    const [details, SetDetails] = useState<any>([])
    const [detail, setDetail] = useState<any>({})
    const [resulted, setResulted] = useState<any>([])
    const [foul, setFoul] = useState(0)
    const [bat, setBat] = useState(0)
    const [open, setOpen] = useState(false)

    const inputFoul = useCallback((event) => {
        setFoul(event.target.value)
    },[setFoul])

    const inputBat = useCallback((event) => {
        setBat(event.target.value)
    },[setBat])

    const handleOpen = useCallback(() => {
        setOpen(true)
    },[setOpen])

    const handleClose = useCallback(() => {
        setOpen(false)
    },[setOpen])

    const resultedSet = () => {
        db.collection('result').get()
        .then((snapshot:any) => {
            const list:any = []
            snapshot.docs.map((doc:any) => {
                const data = doc.data()
                if(gameId === data.gameId){
                    list.push(data)
                }
            })
            setResulted(list)
        })
    }

    const resultedUpdate = (item:any) => {
        
    }

    const resultSet = () => {
        if(bat === 0 || Object.keys(pitch).length === 0 || Object.keys(result).length === 0 || Object.keys(detail).length === 0){
            alert('必須項目が未入力です')
            return false
        }
        const resultRef =  db.collection('result').doc()
        const resultId = resultRef.id
        const data = {
            bat: bat,
            playerId: player.id,
            gameId: gameId,
            gameType: game.type.id,
            pitch: pitch,
            result: result, 
            resultDetail: detail,
            foul: foul,
        }
        db.collection('result').doc(resultId).set(data, {merge: true})
        .then(() => {
            setFoul(0)
            setBat(0)
            setPitch({})
            setDetail({})
            setResult({})
            resultedSet()
        })
    }

    useEffect(() => {
        db.collection('games').doc(gameId).get()
        .then((snapshot:any) => {
            const data = snapshot.data()
            setGame(data)
            setPlayers(data.players)
            setPlayer(data.players[0])
        })
        db.collection('batterResult').orderBy("index", "asc").get()
        .then((snapshot:any) => {
            setResults(snapshot.docs.map((doc:any) => doc.data()))
        })
    },[])

    useEffect(() => {
        if(result){
            db.collection('batterResultDetail').get()
            .then((snapshot:any) => {
                const list:any = []
                snapshot.docs.map((doc:any) => {
                    const data = doc.data()
                    if(result.id === data.resultId){
                        list.push(data)
                    }
                })
                SetDetails(list)    
            })
        }
    },[result])

    useEffect(() => {
        resultedSet()
    },[player])

    useEffect(() => {
        if(resulted){
            const list:any = []
            resulted.map((item:any) => {
                if(item.playerId === player.id){
                    list.push(item)
                }
            })
            list.sort((a:any,b:any) => {
                if(a.bat < b.bat) return -1
                if(a.bat > b.bat) return 1
                return 0
            })
            setBats(list)
        }
    },[resulted])
    return (
        <div className="result">
            <div className="result__players">
                <div className="result__players__title">出場選手</div>
                <div className="result__players__avatars">
                    {players.map((item:any) => 
                    <div className="result__player"
                        key={shortId.generate()}
                        onClick={() => {
                            setPlayer(item)
                        }}
                    >
                        <Avatar 
                        className={classes.avatar}
                        src={item.image} 
                        />
                        <div className="result__border"/>
                        <div className="result__player__description">
                            {item.name}
                            <span>{item.hit.name}{item.pitch.name}</span>
                        </div>
                        <div className={player.id == item.id  ? ("active__player"):("none")}/>
                    </div>
                    )}
                    <LightTooltip title="選手追加">
                        <Avatar className={classes.Addplayer}
                         onClick={handleOpen}
                         >+</Avatar>
                    </LightTooltip>
                </div> 
            </div> 
            <div className="result__bat">
            {Object.keys(player).length > 0 && (
                <>
                <div className="module-spacer--medium" />
                <div className="result__resulted">
                    <div className="result__resulted__data">
                    <div className="title">
                    打席結果
                    </div>
                    <div className="result__resulted__datalist">
                        {bats.map((item:any) => 
                            <div className="resulted__detailist">
                            {item.bat}打席目
                            <div className="resulted__detail">
                                {item.result.name}
                                ({item.resultDetail.name})
                            </div>
                            </div>
                        )}
                    </div>
                    </div>
                </div>
                <div className="result__batting"> 
                    <div className="result__batting__info">
                        <div className="title center">{player.name}</div>
                    </div> 
                    <div className="module-spacer--medium"/>
                    <div className="result__dataset">
                        <div className="result__bat_foul">
                            <TextInput
                                fullWidth={false} label={"打席目"} multiline={false} required={true} 
                                rows={1} value={bat} type={'number'} onChange={inputBat}
                            />
                            <TextInput
                                fullWidth={false} label={"ファール数"} multiline={false} required={true} 
                                rows={1} value={foul} type={'number'} onChange={inputFoul}
                            />
                        </div>
                        <div className="module-spacer--small" />
                        <SelectBox label="投手（右・左）" options={pitchs} required={true} select={setPitch} value={pitch} />
                        <div className="module-spacer--small"/>
                        <SelectBox label="打席結果" options={results} required={true} select={setResult} value={result} />
                        <div className="module-spacer--small"/>
                        <SelectBox label="打席結果を入力してください" options={details} required={true} select={setDetail} value={detail} />
                        </div>
                        <div className="module-spacer--medium"/>
                        <div className="center">
                        <Button 
                        className={classes.next}
                        onClick={() => resultSet()}
                        >完了</Button>
                        </div>
                </div>
                </>
            )}
            <PlayersModal handleClose={handleClose} open={open} items={players} team={game.team} />
            </div>


        </div>
    )
}

export default Result

