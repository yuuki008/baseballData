import React, { useEffect, useState, useCallback } from 'react'
import { db, FirebaseTimestamp } from '../firebase/config'
import '../assets/PlayerProfile.css'
import { TableContainer, Paper, TableRow, Table, TableCell, TableHead, TableBody, makeStyles, IconButton } from '@material-ui/core'
import GroupIcon from '@material-ui/icons/Group';
import { TeamsModal } from '../components';

const useStyles = makeStyles({
    cell:{
        fontSize: "12px !important",
    },
    item:{
        textAlign:'center',
        fontWeight: 600,
    },
    table:{
        width: "70%",
        margin: '0 auto',
    },
    icon:{
        height: "50px",
        lineHeight: "50px",
        marginLeft: 'auto',
    },
})


const playerData = [
    {name: '打数'},{name: '安打'},{name: '打率'},{name: '2塁打'},{name: '3塁打'},{name:'本塁打'},{name: '長打率'},
    {name: '盗塁'},{name: '盗塁失敗'},{name: '成功率'},{name:'四死球'},{name:'出塁率'},{name:'OPS'},{name: '失策'},{name: '三振'},
    {name: '見逃し'},{name: '空振り'}
]

const PlayerProfile = () => {
    const classes = useStyles()
    const playerId = window.location.pathname.split('/player/')[1]
    const [player, setPlayer] = useState<any>({})
    const [open, setOpen] = useState(false)
    const [games, setGames] = useState<any>([])
    const [teams, setTeams] = useState<any>([])
    const [total, setTotal] = useState(0)
    const [hit, setHit] = useState(0)
    const [two, setTwo] = useState(0)
    const [three, setThree] = useState(0)
    const [homerun, setHomerun] = useState(0)
    const [four, setFour] = useState(0)
    const [stolen, setStolen] = useState(0)
    const [stolenOut, setStolenOut] = useState(0)
    const [strikeOut, setStrikeOut] = useState(0)
    const [missedStrikeOut, setMissedStrikeOutHit] = useState(0)
    const [error, setError] = useState(0)
    const [sacrifice, setSacrifice] = useState(0)
    const [onBase, setOnBase] = useState(0)
    const [slupping, setslupping] = useState(0)

    const handleClose = useCallback(() => {
        setOpen(false)
    },[setOpen])

    const handleOpen = useCallback(() => {
        setOpen(true)
    },[setOpen])

    const reset = () => {
        setTotal(0); setHit(0); setTwo(0); setThree(0); setHomerun(0); setFour(0);
        setStolen(0); setStolenOut(0); setStrikeOut(0); setMissedStrikeOutHit(0); setError(0)
    }

    const inputOnBase = () => {
        setOnBase(((hit+four)/(total+four+sacrifice)))
    }

    const inputSlupping = () => {
        setslupping(((hit - (two+three+homerun)) + (two*2) +  (three*3) + (homerun*4)/total)/100)
    }

    const gameData = [
        total, 
        hit, 
        ((hit/total)).toFixed(3).slice(1),
        two,
        three,
        homerun,
        slupping.toFixed(3).slice(1),
        stolen, 
        stolenOut,
        `${((stolen/(stolenOut+stolen))*100).toFixed(1)}%`,
        four, 
        (onBase.toFixed(3)).slice(1),
        (onBase+slupping).toFixed(3),
        error,
        strikeOut+missedStrikeOut,
        missedStrikeOut,
        strikeOut,
    ]

    console.log(slupping)

    const moveTeam = (team:any, setTeam:any) => {
        if(Object.keys(team).length === 0){
            alert('チームが更新されていません')
            return false
        }
        db.collection('player').doc(player.id).set({"team": team},{merge:true})
        .then(() => {
        const data = {
            timestamp: FirebaseTimestamp.now(),
            name: player.name,
            id: player.id,
            team: team.name,
        }
        db.collection('notification').doc(player.id).set(data)
        setTeam({})
        handleClose()
        })
    }


    useEffect(() => {
        db.collection('player').doc(playerId).onSnapshot((snapshot:any) => {            
            setPlayer(snapshot.data())
        })
        db.collection('player').doc(playerId).collection('game').get()
        .then((snapshot:any) => {
            setGames(snapshot.docs.map((doc:any) => doc.data()))
        })
    },[])


    useEffect(() => {
        if(games){
            reset()
            games.map((game:any) => {
                setTotal((prevState:any) => prevState + game.total)
                setHit((prevState:any) => prevState + game.hit)
                setTwo((prevState:any) => prevState + game.two)
                setThree((prevState:any) => prevState + game.three)
                setHomerun((prevState:any) => prevState + game.homerun)
                setFour((prevState:any) => prevState + game.four)
                setStolen((prevState:any) => prevState + game.stolen)
                setStolenOut((prevState:any) => prevState + game.stolenOut)
                setStrikeOut((prevState:any) => prevState + game.strikeOut)
                setMissedStrikeOutHit((prevState:any) => prevState + game.missedStrikeOut)
                setError((prevState:any) => prevState + game.error)
                setSacrifice((prevState:any) => prevState + game.sacrifice)
            })
        }
    },[games])

    useEffect(() => {
        if(Object.keys(player).length > 0){
            db.collection('team').get()
            .then((snapshot:any) => {
                const list:any = []
                snapshot.docs.map((doc:any) => {
                    const data = doc.data()
                    if(data.id === 0){
                        return false
                    }
                    list.push(data)
                })
                setTeams(list)
            })
        }
    },[player])

    useEffect(() => {
        inputOnBase()
        inputSlupping()
    },[total])

    return (
        Object.keys(player).length !== 0 ? (
        <div>
        <div className="player">
        <div className="player__detail">
            <div className="player__info">
                <div className="player__name">
                    {player.name}
                    {player.position !== undefined && (
                    player.position.map((item:any) => 
                    <span key={item.id}>{item.name}</span>
                    )
                    )}
                    <IconButton
                    onClick={handleOpen}
                    className={classes.icon}
                    >
                        <GroupIcon/>
                    </IconButton>
                </div>
                <div className="player__info__list">
                    <div className="player__pitch_hit list__title">
                        チーム<span>{player.team.name}</span>
                    </div>
                    <div className="player__pitch_hit list__title">
                        学年<span>{player.schoolYear.name}</span>
                    </div>
                    <div className="player__pitch_hit list__title">
                        出身校<span>{player.school}</span>
                    </div>
                    <div className="player__pitch_hit list__title">
                        投打<span>{player.pitch.name}{player.hit.name}</span>
                    </div>
                    <div className="player__pitch_hit list__title">
                        体重<span>{player.weight}kg</span>
                    </div>
                    <div className="player__selling">
                        <div className="list__title">自己PR</div>
                        <div className="player__selling_description">
                            {player.selling}
                        </div>
                        <div className="list__title">今シーズンの目標</div>
                        <div className="player__selling_description">
                            {player.target}
                        </div>
                    </div>
                </div>
            </div>
            <div className="player__poster">
                <img src={player.image} style={{width: "342px", backgroundSize: 'cover', borderRadius: "10px"}} />
            </div>
        </div>
        </div>
        <div className="player__grades">
        <div className="player__grades_header">
            試合成績<span>{games.length}試合</span>
        </div>
        <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    {playerData.map((item:any, index:number) => 
                    <TableCell className={classes.cell} key={index}>{item.name}</TableCell>
                    )}
                </TableRow>
                </TableHead>
                <TableBody>
                    {gameData.map((data:any, index:number) => 
                    <TableCell className={classes.item} key={index}>{data}</TableCell>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    
        <TeamsModal handleClose={handleClose} open={open} teams={teams} moveTeam={moveTeam} player={player}/>       
        </div>
       ):(
           <p>なし</p>
       )
    )
}

export default PlayerProfile
