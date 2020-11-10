import React, {useEffect, useState} from 'react'
import { db } from '../firebase/config'
import {Grade} from '../components'

const PlayerGrade = () => {
    const [players, setPlayers] = useState([])
    const [hit, setHit] = useState(0)
    const [average, setAverage] = useState<any>([])

    useEffect(() => {
        db.collection('player').get()
        .then((snapshot:any) => {
            setPlayers(snapshot.docs.map((doc:any) => doc.data()))
        })
    },[])
    useEffect(() => {
        players.map((player:any) => {
        db.collection('player').doc(player.id).collection('game').get()
        .then((snapshot:any) => {
            snapshot.docs.map((doc:any) => {
                
            })
        })
        })
    },[players])
    return (
        <div>
            {players.map((player:any) => 
            <Grade player={player} setAverage={setAverage} average={average} />
            )}
        </div>
    )
}

export default PlayerGrade
