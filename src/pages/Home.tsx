import React, {useEffect, useState} from 'react'
import { db } from '../firebase/config'
import '../assets/Home.css'
import {useDispatch} from 'react-redux'
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import { SelectBox } from '../components'
import PlayerList from '../components/PageComponent/PlayerList'

const useStyles = makeStyles({
    cell:{
        fontSize: "12px !important",
        textAlign: 'center',
        padding: '10px'
    },
    item:{
        textAlign: 'center',
        fontWeight: 600,
    },
    select:{
        width: '80px',

    }
})

const dataName = [
    "試合数","勝","負",'分','勝率','打率','長打率','出塁率','失策','盗塁'
]

const Home = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [games, setGames] = useState<any>([])
    const [teams, setTeams] = useState([])
    const [players, setPlayers] = useState([])
    const [team, setTeam] = useState({id: 0,name: '全体'})
    const [win, setWin] = useState(0)
    const [lose, setLose] = useState(0)
    const [draw, setDraw] = useState(0)
    const [hit, setHit] = useState(0)
    const [total, setTotal] = useState(0)
    const [two, setTwo] = useState(0)
    const [three, setThree] = useState(0)
    const [four, setFour] = useState(0)
    const [homerun, setHomerun] = useState(0)
    const [sacrifice, setSacrifice] = useState(0)
    const [error, setError] = useState(0)
    const [stolen, setStolen] = useState(0)

    const reset = () => {
        setWin(0); setLose(0); setDraw(0); setHit(0); setTotal(0);setStolen(0)
        setTwo(0);setThree(0);setHomerun(0);setSacrifice(0);setError(0);
    }


    const gameData = [
        games.length,
         win, 
         lose, 
         draw, 
         `${(win/games.length*100).toFixed(1)}%`,
         (hit/total).toFixed(3).slice(1),
         ((total/(hit - (two+three+homerun)) + (two*2) +  (three*3) + (homerun*4))/1000).toFixed(3).slice(1),
         ((hit+four)/(total+four+sacrifice)).toFixed(3).slice(1),
         error,
         stolen,
    ]
    useEffect(() => {
        reset()
        games.map((game:any) => {
            game.list.map((item:any) => {
                setHit((prevState:any) => prevState + item.hit)
                setTotal((prevState:any) => prevState + item.total)
                setTwo((prevState:any) => prevState + item.two)
                setThree((prevState:any) => prevState + item.three)
                setHomerun((prevState:any) => prevState + item.homerun)
                setFour((prevState:any) => prevState + item.four)
                setSacrifice((prevState:any) => prevState + item.sacrifice)
                setError((prevState:any) => prevState + item.error)
                setStolen((prevState:any) => prevState + item.stolen)
            })
            if(game.score > game.opponentScore){
                setWin((prevState:any) => prevState + 1)
            }else if(game.opponentScore > game.score){
                setLose((prevState:any) => prevState + 1)
            }else if(game.opponentScore === game.score){
                setDraw((prevState:any) => prevState + 1) 
            }
        })
    },[games])

    useEffect(() =>{
        db.collection('team').get()
        .then((snapshot:any) => {
            setTeams(snapshot.docs.map((doc:any) => doc.data()))
        })
    },[])

    useEffect(() => {
        setPlayers([])
        console.log(team)
        db.collection('game').get()
        .then((snapshot:any) => {
            const list:any = []
            snapshot.docs.map((doc:any) => {
                const data = doc.data()
                if(team.id === 0){
                    list.push(data)
                }else if(team.id === data.team.id){
                    list.push(data)
                }
            })
            setGames(list)
        })
        db.collection('player').get()
        .then((snapshot:any) => {
            const list:any = []
            snapshot.docs.map((doc:any) => {
                const data = doc.data()
                if(team.id === 0){
                    list.push(data)
                }else if(team.id === data.team.id){
                    list.push(data)
                }
            })
            setPlayers(list)
        })
    },[team])



    return (
        <div className="home">
        <div className="home__wrapper">
            <div className="home__header">
                試合成績 <span>2020-2021</span> 
                <div className="home__select">
                {teams.map((item:any) => 
                <div className={item.id == team.id ? `home__teamlist action` : `home__teamlist`}
                onClick={() => setTeam(item)}
                key={item.id}
                >
                {item.name}
                </div>
                )}
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="simiple table">
                    <TableHead>
                        <TableRow>
                            {dataName.map((item:any, index:number) => 
                            <TableCell className={classes.cell} key={index}>{item}</TableCell>
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
            <div className="player__home">
            <PlayerList players={players} />
            </div>
        </div>   
        </div>
    )
}

export default Home
