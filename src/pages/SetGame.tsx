import React, { useCallback, useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Button} from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import { GameCell, SelectBox, TextInput } from '../components';
import '../assets/SetGame.css'
import {SelectBox2} from '../components'
import {upGame} from '../redux/game/operations'
import {useDispatch} from 'react-redux'

const useStyles = makeStyles({
    button: {
        margin: "50px 0",
        padding: '10px',
        fontWeight: 700,
        fontSize: "15px",
        color: 'white',
        backgroundColor: '#008000	',
        borderRadius: '40px',
    },
    score: {
        width: "40%",
    },
    cell:{
        fontSize: "13px !important",
        textAlign: 'center',
        padding: '10px',
    }
})

const data = [
    {name: "選手名"},{name: "打数"},{name: "安打"},{name: "内野安打"},{name: "2塁打"},{name: "3塁打"},
    {name: "本塁打"},{name: "失策"},{name: "盗塁"},{name: '盗塁失敗'},{name: "四死球"},{name: "空振り三振"},{name: "見逃し三振"},
]



interface data {
    id: string,
    name: string,
}
const GameData = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [users, setUsers] = useState([])
    const [select, setSelect] = useState<any>([])
    const [gametype, setGametype] = useState([])
    const [teams, setTeams] = useState([])
    const [type, setType] = useState<any>({})
    const [team, setTeam] = useState<any>({})
    const [opponent, setOpponent] = useState("")
    const [date, setDate] = useState(1)
    const [score, setScore] = useState(0)
    const [opponentScore, setOpponentScore] = useState<number>(0)
    const [comment, setComment] = useState("")
    const [upload, setUpload] = useState(false)
    const [list, setList] = useState<any>([])
    const [autoData, setAutodata] = useState<any>([])

    const inputOpponent = useCallback((event) => {
        setOpponent(event.target.value)
    },[setOpponent]) 

    const inputScore = useCallback((event) => {
        setScore(event.target.value)
    },[setScore])

    const inputOpponentScore = useCallback((event) => {
        setOpponentScore(event.target.value)
    },[setOpponentScore])
    
    const inputDate = useCallback((event) => {
        setDate(event.target.value)
    },[setDate]) 

    const inputComment = useCallback((event) => {
        setComment(event.target.value)
    },[setComment])

    const selectPlayer = (e: any, setCheck: any) => {
        const Select = {name: e.target.name, id: e.target.id}
        const filteredPositions = select.filter((posi: any) => posi.id !== Select.id)
        if(filteredPositions.length === select.length){
            setSelect([
                ...filteredPositions,
                Select,
            ])
            setCheck(true)
        }else{
            setSelect([
                ...filteredPositions
            ])
            setCheck(false)
        }
    }

    const uploadGame = () => {
            if(comment === ""){
                alert('管理者コメントがありません')
                return false
            }
            if(Object.keys(type).length === 0 ||Object.keys(team).length === 0){
                alert('必須項目が未入力です')
                return false
            }
            dispatch(upGame(team, type, opponent, date, score, opponentScore, comment,list))
    }


    useEffect(() => {
        if(upload){
        if(list.length === select.length){
            uploadGame()
        }
        }
    },[list])
    
    useEffect(() => {
        db.collection('player')
        .onSnapshot((snapshot:any) => {
            setUsers(snapshot.docs.map((doc:any) => doc.data()))
        })
        db.collection('type')
        .onSnapshot((snapshot:any) => {
            setGametype(snapshot.docs.map((doc:any) => doc.data()))
        })
        db.collection('team')
        .onSnapshot((snapshot:any) => {
            const list:any = []
            snapshot.docs.map((doc:any) => {
            const data = doc.data()
            list.push(data)
            })
            setTeams(list)
        })
    },[])

    useEffect(() => {
        if(Object.keys(team).length !== 0){
            if(team.id === 0){
                db.collection('player')
                .onSnapshot((snapshot:any) => {
                    setUsers(snapshot.docs.map((doc:any) => doc.data()))
                })            
            }else{
                setSelect([])
                db.collection('player').get()
                .then((snapshot:any) => {
                    const list:any = []
                    snapshot.docs.map((doc:any) => {
                        const data = doc.data()
                        if(data.team.id === team.id){
                            list.push(data)
                        }
                    })
                    setUsers(list)
                })
            }
        }
    },[team])

  return (
    <div className="setgame">
    <div className="setgame__data">
        <input type='date' value={date}
        onChange={(event => inputDate(event))}
        />
        <SelectBox label="試合タイプ"　options={gametype} required={true} select={setType} value={type}/>
        <div className="module-spacer--small"/>
        <SelectBox label="チーム"　options={teams} required={true} select={setTeam} value={team}/>
        {type.name == '公式戦' || type.name == "練習試合" ? (
        <>
        <div className="module-spacer--small"/>
        <TextInput label="相手チーム" fullWidth={true} multiline={true} required={true} rows={1} value={opponent} type={"text"} onChange={inputOpponent} />
        <div className="module-spacer--small"/>
        <div className="setgame__score">
            <TextInput label="西南" fullWidth={false} multiline={false} required={true} rows={1} value={score} type={"number"} onChange={inputScore} />
            対
            <TextInput label="相手" fullWidth={false} multiline={false} required={true} rows={1} value={opponentScore} type={"number"} onChange={inputOpponentScore} />
        </div>
        </>
        ):(<></>)}
        <Button
        className={classes.button}
        onClick={() => {
            autogame(teams, setAutodata, users, gametype, setUsers, setSelect, team)
        }}
        >
            公開する
        </Button>
    </div>
    <div className="setgame__gamedata">
        <div className="setgame__setplayer">
        <SelectBox2
        label="出場選手" positions={users} required={true} select={selectPlayer} selected={select}
        />  
        </div>
        {select.length >  0 && (
            <>
            <div style={{maxWidth:"100%", margin: '20px auto'}}>
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    {data.map((item:any, index:number) => 
                    <TableCell key={index} className={classes.cell}>{item.name}</TableCell>
                    )}
                </TableRow>
                </TableHead>
                <TableBody>
                {select.length > 0 && (
                    select.map((user:any) => (
                        <GameCell user={user} upload={upload} setList={setList}/>
                    ))
                )}
                </TableBody>
            </Table>
            </TableContainer>
            </div>
            <div className="setgame__comment">
                責任者コメント
                <TextInput label="" fullWidth={true} multiline={true} required={true} rows={5} value={comment} type={"number"} onChange={inputComment} />
            </div>
            </>
        )}
    </div>
    </div>
  );
}

export default GameData



const opponentName = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']

const setdata = (selected:any, selectTeam:any, gametype:any) => {
    const a = Math.floor( Math.random() * 11 )
    const b = Math.floor( Math.random() * 11 )
    const name = opponentName[Math.floor(Math.random() * opponentName.length)]
    const newDate = new Date()
    const newComm = "nice game"
    const newType = gametype[Math.floor(Math.random() * gametype.length)]
    const ref = db.collection('game').doc()
    const gameId = ref.id
    const newList:any = []
    selected.map((item:any) => {
        let total = Math.floor(Math.random() * 6)
        let hit = Math.floor(Math.random() * total)
        let twobase = Math.floor(Math.random() * hit)
        let threebase = Math.floor(Math.random() * hit - twobase)
        let homerun = Math.floor(Math.random() * hit - twobase - threebase)
        let error = Math.floor(Math.random() * 3)
        let inside = Math.floor(Math.random() * hit - twobase - threebase - homerun)
        let stolen = Math.floor(Math.random() * 3)
        let stolenOut = Math.floor(Math.random() * stolen)
        let strikeOut = Math.floor(Math.random() * total - hit)
        let missedStrikeOut = Math.floor(Math.random() * total - hit - strikeOut)
        let sacrifice = Math.floor(Math.random() * 1)
        let dead = Math.floor(Math.random() * 3)
        if(hit < 0){hit = 0}
        if(twobase < 0){twobase = 0}
        if(threebase < 0){threebase = 0}
        if(homerun < 0){homerun = 0}
        if(error < 0){error = 0}
        if(inside < 0){inside = 0}
        if(stolen < 0){stolen = 0}
        if(stolenOut < 0){stolenOut = 0}
        if(strikeOut < 0){strikeOut = 0}
        if(missedStrikeOut < 0){missedStrikeOut = 0}
        if(sacrifice < 0){sacrifice = 0}
        if(dead < 0){dead = 0}
        const data = {
            id: gameId,
            team: selectTeam,
            playerId: item.id,
            total: total,
            hit: hit, 
            two: twobase,
            three: threebase,
            homerun: homerun,
            error: error,
            inside: inside,
            stolen: stolen,
            stolenOut: stolenOut,
            strikeOut: strikeOut,
            missedStrikeOut: missedStrikeOut,
            sacrifice: sacrifice,
            four: dead,
        }
        newList.push(data)
    })
    db.collection('game').doc(gameId).set({
        id: gameId, 
        team: selectTeam,
        type: newType,
        date: newDate,
        score: a,
        opponent: name,
        opponentScore: b,
        comment: newComm,
        list: newList,
    })
    .then(() => {
        newList.map((item:any) => {
            db.collection('player').doc(item.playerId).collection('game').doc(gameId).set(item)
            db.collection('player').doc(item.playerId).collection('game').get()
            .then((snapshot:any) => {
                let total:any = 0; let hit:any = 0; let homerun:any = 0; let two:any = 0; let three:any = 0; let four:any = 0; let stolen:any = 0; let sacrifice:any = 0;
                snapshot.docs.map((doc:any) => {
                    const data = doc.data()
                    total = total + data.total;
                    hit = hit + data.hit;
                    two = two + data.two;
                    three = three + data.three;
                    homerun = homerun + data.homerun;
                    four = four + data.four;
                    stolen = stolen + data.stolen;
                    sacrifice = sacrifice + data.sacrifice;
                })
                const data = {
                    total: total,
                    hit: hit,
                    average: (hit/total).toFixed(3),
                    two: two,
                    three: three,
                    homerun: homerun,
                    slupping: (((hit - (two+three+homerun)) + (two*2) + (three*3) + (homerun*4)/total)/100).toFixed(3).slice(1),
                    stolen: stolen,
                    onBase: ((hit+four)/(total+four+sacrifice)).toFixed(3).slice(1),
                }
                db.collection('player').doc(item.playerId).set({'grade': data},{merge:true})
            })
            
        })
    })
}

const finedUser = (setUsers:any, setSelect:any, team:any) => {
    if(Object.keys(team).length !== 0){
        if(team.id === 0){
            db.collection('player')
            .onSnapshot((snapshot:any) => {
                setUsers(snapshot.docs.map((doc:any) => doc.data()))
            })            
        }else{
            setSelect([])
            db.collection('player').get()
            .then((snapshot:any) => {
                const list:any = []
                snapshot.docs.map((doc:any) => {
                    const data = doc.data()
                    if(data.team.id === team.id){
                        list.push(data)
                    }
                })
                setUsers(list)
            })
        }
    }
}


const autogame = (teams:any, setAutodata:any, users:any, gametype:any, setUsers:any, setSelect:any, team:any) => {
    if(teams.length !== 0){
        for(let i = 0; i < 15; i++){
            const selectTeam = teams[Math.floor(Math.random() * teams.length)]
            finedUser(setUsers, setSelect, team)
            const copy = users.slice();
            const selected = [...Array(9)].map(() => copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
            setdata(selected, selectTeam, gametype)
            setAutodata([])
        }
    }
}


