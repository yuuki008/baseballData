import { Games } from '@material-ui/icons'
import React, {useEffect, useState} from 'react'
import {db} from '../../firebase/config'
interface Props{
    player: any,
    setAverage: any,
    average: any,
}
const Grade:React.FC<Props> = ({player, setAverage,average}) => {
    const playerId = window.location.pathname.split('/player/')[1]
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

    const reset = () => {
        setTotal(0); setHit(0); setTwo(0); setThree(0); setHomerun(0); setFour(0);
        setStolen(0); setStolenOut(0); setStrikeOut(0); setMissedStrikeOutHit(0); setError(0)
    }

    useEffect(() => {
        if(player){
            db.collection('player').doc(player.id).collection('game').get()
            .then((snapshot:any) => {
                setGames(snapshot.docs.map((doc:any) => doc.data()))
            })
        }
    },[player])

    useEffect(() => {
        if(games.length > 0){
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

    // useEffect(() => {
    //     setAverage((prevState:any) => {
    //         .sort(
    //             function(){
    //                 if(prevState < total/hit) return -1 
    //                 if(prevState > total/hit) return 1
    //                 return 0
    //             }
    //         )
    //     })
    // },[sacrifice])

    return (
        <div>
            
        </div>
    )
}

export default Grade
