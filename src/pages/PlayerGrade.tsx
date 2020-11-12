import React, {useEffect, useState} from 'react'
import Grade from '../components/PageComponent/Grade'
import { db } from '../firebase/config'
import '../assets/PlayerGrade.css'
import { useDispatch } from 'react-redux'
import {push} from 'connected-react-router'

const PlayerGrade = () => {
    const dispatch = useDispatch()
    const [players, setPlayers] = useState([])
    const [teams, setTeams] = useState([])
    const [team, setTeam] = useState({id: 0,name: '全体'})

    useEffect(() => {
        db.collection('team').get()
        .then((snapshot:any) => {
            setTeams(snapshot.docs.map((doc:any) => doc.data()))
        })
    },[])

    useEffect(() => {
        db.collection('player').get()
        .then((snapshot:any) => {
            const list:any = []
            snapshot.docs.map((doc:any) => {
                const data = doc.data()
                if(team.id === 0) {
                    list.push(data)
                }else if(team.id === data.team.id){
                    list.push(data)
                }
            })
            setPlayers(list)
        })
    },[team])



    return (
        <div style={{width: "100%", position: 'relative', backgroundColor: 'rgb(0,0,0,0.05)'}}>
        <div className="playerGrade">
        <div className="playerGrade__title">
            個人成績ランキング
            <div className="playerGrade__teams">
                {teams.map((item:any) => 
                <div className={item.id == team.id ? `grade__teamlist grade__action` : `grade__teamlist`}
                onClick={() => setTeam(item)}
                key={item.id}
                >
                {item.name}
                </div>
                )}
            </div>
        </div>
        <div className="players__grade">
        <Grade players={players} label="打率"/>
        <Grade players={players} label="盗塁"/>
        <Grade players={players} label="本塁打"/>
        <Grade players={players} label="安打数"/>
        <Grade players={players} label="出塁率" />
        <Grade players={players} label="長打率" />
        <Grade players={players} label="OPS" />
        <Grade players={players} label="二塁打" />
        </div>
        </div>
        </div>
    )
}

export default PlayerGrade
