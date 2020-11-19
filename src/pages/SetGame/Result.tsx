import { FourK } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import '../../assets/Result.css'
import { Avatar, Button, makeStyles } from '@material-ui/core'
import { push } from 'connected-react-router'
import {SelectBox} from '../../components'

const useStyles = makeStyles({
    avatar:{
        width: "100px",
        height: "100px",
        margin: "20px",
    }
})

const pitchs = [{id: 1, name: "右"},{id: 2, name: '左'}]

const Result = () => {
    const classes = useStyles()
    const gameId = window.location.pathname.split('/game/set/')[1]
    console.log(gameId)

    const [results, setResults] = useState([])
    const [players, setPlayers] = useState([])
    const [pitch, setPitch] = useState({})
    const [game, setGame] = useState<any>({})
    const [player, setPlayer] = useState<any>({})
    const [result, setResult] = useState<any>({}) 
    const [details, SetDetails] = useState<any>([])
    const [detail, setDetail] = useState<any>({})
    const [resulted, setResulted] = useState<any>([])
    const [four, setFour] = useState(0)
    
    // const resultSet = () => {
    //     const resultRef =  db.collection('result').doc()
    //     const resultId = resultRef.id
    //     const data = {
    //         playerId: player.id,
    //         gameId: gameId,
    //         gameType: game.type.id,
    //         pitch: pitch,
    //         result: result, 
    //         resultDetail: detail,
    //         four: four,
    //     }
    //     db.collection('result').doc(resultId).set(data, {merge: true})
    // }

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
    },[player])
    console.log(resulted.length)

    return (
        <div className="result">
            <div className="result__players">
                <div className="result__players__title">出場選手</div>
                <div className="result__players__avatars">
                    {players.map((item:any) => 
                    <div className="result__player"
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
                </div> 
            </div> 
            <div className="result__bat">
            {Object.keys(player).length > 0 && (
                <>
                <div className="module-spacer--medium" />
                <div className="result__resulted">
                    {resulted.length === 0 ? (
                        <div>打席結果なし</div>
                    ):(
                        <div>あるべし</div>
                    )}
                </div>
                <div className="result__batting">  
                    {resulted.length !== 0 ? (
                        <div>一打席目</div>
                    ):(
                        <Button>新しい打席</Button>
                    )} 

                    <div className="result__dataset">
                    <SelectBox label="投手（右・左）" options={pitchs} required={true} select={setPitch} value={pitch} />
                    <div className="module-spacer--small"/>
                    <SelectBox label="打席結果" options={results} required={true} select={setResult} value={result} />
                    <div className="module-spacer--small"/>
                    {details.length > 0 && (
                        <SelectBox label="結果（詳細）" options={details} required={true} select={setDetail} value={detail} />
                    )}
                    </div>
                </div>
                </>
            )}
            </div>


        </div>
    )
}

export default Result

