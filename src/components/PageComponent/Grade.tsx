import React from 'react'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'

interface Props{
    players:any,
    label: string,
}
const Grade:React.FC<Props> = ({players, label}) => {
    const dispatch = useDispatch()

    const gradeFunc = (player:any) => {
        switch(label){
            case '打率':
                return player.grade.average.toFixed(3).slice(1)
                break;
            case '本塁打':
                return player.grade.homerun
                break;
            case '安打数':
                return player.grade.hit
                break;
            case '盗塁':
                return player.grade.stolen
                break;
            case '打点':
                return player.grade.rbi
                break;
            case '出塁率':
                return player.grade.onBase.toFixed(3).slice(1)
                break;
            case '長打率':
                return player.grade.slupping.toFixed(3)
                break;
            case 'OPS':
                return (player.grade.slupping + player.grade.onBase).toFixed(3)
                break;
            case '二塁打':
                return player.grade.two
                break;
        }
    }
    
    return (
        <div className="grade__card">
            <div className="grade__card_title">
            {label}
            </div>
            {players.sort(function(a:any, b:any){
                if(label === "打率"){
                    if(a.grade.average > b.grade.average) return -1 
                    if(a.grade.average < b.grade.average) return 1
                    return 0
                }else if(label === "本塁打"){
                    if(a.grade.homerun > b.grade.homerun) return -1
                    if(a.grade.homerun < b.grade.homerun) return 1
                    return 0
                }else if(label === "安打数"){
                    if(a.grade.hit > b.grade.hit) return -1
                    if(a.grade.hit < b.grade.hit) return 1
                    return 0
                }else if(label === "盗塁"){
                    if(a.grade.stolen > b.grade.stolen) return -1
                    if(a.grade.stolen < b.grade.stolen) return 1
                    return 0
                }else if(label === "打点"){
                    if(a.grade.rbi > b.grade.rbi) return -1
                    if(a.grade.rbi < b.grade.rbi) return 1
                    return 0
                }else if(label === "出塁率"){
                    if(a.grade.onBase > b.grade.onBase) return -1
                    if(a.grade.onBase < b.grade.onBase) return 1
                    return 0
                }else if(label === "長打率"){
                    if(a.grade.slupping > b.grade.slupping) return -1
                    if(a.grade.slupping < b.grade.slupping) return 1
                    return 0
                }else if(label === "OPS"){
                    if(a.grade.slupping + a.grade.onBase > b.grade.slupping + b.grade.onBase) return -1
                    if(a.grade.slupping + a.grade.onBase < b.grade.slupping + b.grade.onBase) return 1
                    return 0
                }else if(label === "二塁打"){
                    if(a.grade.two > b.grade.two) return -1
                    if(a.grade.two < b.grade.two) return 1
                    return 0
                }
            }).slice(0,10).map((player:any, index:number) => 
            <div className="grade__player_wrapper"
            onClick={() => dispatch(push('/player/' + player.id))}
            >
                <div className="grade__player">
                {index + 1}<span>{player.name}</span>
                </div>
                <div className="grade__player_grade">
                {gradeFunc(player)}
                </div>
            </div>
            )}
        </div>
    )
}

export default Grade

