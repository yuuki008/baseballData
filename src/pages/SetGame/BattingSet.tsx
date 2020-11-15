import { FourK } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/config'

const BattingSet = () => {
    const gameId = window.location.pathname.split('/battingSet')[1]

    const [results, setResults] = useState([])
    const [players, setPlayers] = useState([])
    const [pitch, setPitch] = useState({})
    const [player, setPlayer] = useState<any>({})
    const [result, setResult] = useState<any>({}) 
    const [details, SetDetails] = useState<any>([])
    const [detail, SetDetail] = useState<any>({})
    const [resulted, setResulted] = useState<any>([])
    const [four, setFour] = useState(0)
    
    const resultSet = () => {
        const resultRef =  db.collection('result').doc()
        const resultId = resultRef.id
        const data = {
            playerId: player.id,
            gameId: gameId,
            pitch: pitch,
            result: result, 
            resultDetail: detail,
            four: four,
        }
        db.collection('result').doc(resultId).set(data, {merge: true})

    }

    useEffect(() => {
        db.collection('game').doc(gameId).get()
        .then((snapshot:any) => {
            const data = snapshot.data()
            setPlayers(data.players)
        })
        db.collection('batterResult').orderBy("index", "asc").get()
        .then((snapshot:any) => {
            setResults(snapshot.docs.map((doc:any) => doc.data()))
        })
    },[])

    useEffect(() => {
        if(result){
            db.collection('resultDetailBar').get()
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

    return (
        <div>
            
        </div>
    )
}

export default BattingSet
