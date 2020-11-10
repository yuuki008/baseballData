import React, {useState, useEffect} from 'react'
import { db } from '../../firebase/config'
import {PlayerCard, SelectBox} from '..'
import '../../assets/PlayerList.css'
import {makeStyles} from '@material-ui/styles'

interface Props {
    players: any
}

const PlayerList:React.FC<Props> = ({players}) => {
    const [pitcher, setPitcher] = useState<any>([])
    const [catcher, setCatcher] = useState<any>([])
    const [inside, setInside] = useState<any>([])
    const [outside, setOutside] = useState<any>([])
    const [runner, setRunner] = useState<any>([])
    const [left , setLeft] = useState<any>([])
    const [right , setRight] = useState<any>([])
    const [oneYear, setOneYear] = useState<any>([])
    const [twoYear, setTwoYear] = useState<any>([])
    const [threeYear, setThreeYear] = useState<any>([])
    const [fourYear, setFourYear] = useState<any>([])

    const datalist = [
        {name: '人数', list: players},
        {name: '投手', list: pitcher},
        {name: '捕手', list: catcher},
        {name: '内野手', list: inside},
        {name: '外野手', list: outside},
        {name: '代走', list: runner},
        {name: '1年生', list: oneYear},
        {name: '2年生', list: twoYear},
        {name: '3年生', list: threeYear},
        {name: '4年生', list: fourYear},
        {name: '右打', list: right},
        {name: '左打', list: left},
    ]
    
    const resetPlayers = () => { 
        setPitcher([])
        setCatcher([])
        setInside([])
        setOutside([])
        setRunner([])
        setRight([])
        setLeft([])
        setOneYear([])
        setTwoYear([])
        setThreeYear([])
        setFourYear([])
    }


    useEffect(() => {
        resetPlayers()
        players.map((player:any) => {
            const bool = player.position.map((posi:any) => posi.id)
            const position = (num:string) => {
                return bool.some((i:any) => i === num)
            }
            if(position("1")){
                setPitcher((prevState:any) => [...prevState, player])
            }
            if(position("2")){
                setCatcher((prevState:any) => [...prevState, player])
            }
            if(position("3")|| position("4") || position('5') || position('6')){
                setInside((prevState:any) => [...prevState, player])
            }
            if(position('7') || position('8') || position('9')){
                setOutside((prevState:any) => [...prevState, player])
            }
            if(position('10')){
                setRunner((prevState:any) => [...prevState, player])
            }
            if(player.hit.name === '右'){
                setRight((prevState:any) => [...prevState, player])
            }
            if(player.hit.name === "左"){
                setLeft((prevState: any) => [...prevState, player])
            }
            if(player.schoolYear.id === 1){
                setOneYear((prevState:any) => [...prevState, player])
            }
            if(player.schoolYear.id === 2){
                setTwoYear((prevState:any) => [...prevState, player])
            }
            if(player.schoolYear.id === 3){
                setThreeYear((prevState:any) => [...prevState, player])
            }
            if(player.schoolYear.id === 4){
                setFourYear((prevState:any) => [...prevState, player])
            }
        
        })     
    },[players])

    return (
        <div className="playerlist">
        <div className="playerlist__headerTitle">選手一覧 {players.length}人</div>   
        <div className="playerlist__players">
            {datalist.map((data:any) => 
            data.name === "人数" || data.name === '4年生' ? (<></>):(
            <div>
                <div className="playerlist__title"><span>{data.name}<span>{data.list.length}人</span></span></div>
                <div className="playerlist__all">
                {data.list.map((player:any, index:number) => 
                    <PlayerCard key={index} player={player} />
                )}
                </div>         
            </div>
            )
            )}
        </div>       
        </div>
    )
}

export default PlayerList
