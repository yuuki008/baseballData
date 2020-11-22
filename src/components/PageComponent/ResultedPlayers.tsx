import React, {useEffect, useState} from 'react'
import { db } from '../../firebase/config'

interface Props{
    player: any,
    gameId: string,
    resulted: any,
}

const ResultedPlayers:React.FC<Props> = ({player, gameId, resulted}) => {
    const [resultBats, setResultBats] = useState([]) 
    const [hit, setHit] = useState(0)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        db.collection('result').get()
        .then((snapshot:any) => {
            const list:any = []
            snapshot.docs.map((doc:any) => {
                const data = doc.data()
                if(data.playerId === player.id && data.gameId === gameId){
                    list.push(data)
                }
            })
            setResultBats(list)
        })
    },[resulted])

    useEffect(() => {
        if(resultBats){
            let hit = 0
            let total = 0
            resultBats.map((item:any) => {
                if(item.result.name !== '四死球' || item.resultDetail.name !== "犠飛"){
                    total = total + 1
                }     
                if(item.result.name === `単打` || item.result.name === "2塁打" || item.result.name === '3塁打' || item.result.name === '本塁打' || item.result.name === '内野安打'){
                    hit = hit + 1
                }
            })
            setHit(hit)
            setTotal(total)
        }
    },[resultBats])

    console.log(total, hit)

    return (
        <div className="player__resulted">
        {player.name}
        <div className="player__hit__total">
            {resultBats.length === 0 ? (
                <>登録なし</>
            ):(
                <>
                {total}打数{hit}安打
                </>
            )}
        </div>
        </div>
    )
}

export default ResultedPlayers
