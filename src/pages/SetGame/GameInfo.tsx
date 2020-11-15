import React, {useState, useEffect, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import { push } from 'connected-react-router'
import { db, FirebaseTimestamp } from '../../firebase/config'

const GameInfo = () => {
    const timestamp = FirebaseTimestamp.now().toDate()
    const dispatch = useDispatch()

    const [date, setDate] = useState(timestamp)
    const [opponent, setOpponent] = useState("")
    const [teams, setTeams] = useState([])
    const [types, setTypes] = useState([])
    const [team, setTeam] = useState({})
    const [type, setType] = useState({})
    const [game, setGame] = useState(true)
    const [score, setScore] = useState(0)
    const [opponentScore ,setOpponentScore] = useState(0)

    const inputOpponent = useCallback((event:any) => {
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

    const setGameInfo = () => {
        if(game && opponent === ""){
            alert('相手チーム情報が入力されていません。')
            return false
        }
        const gameData = {
            date: date,
            opponent: opponent,
            team: team,
            type: type,
            score: score,
            opponentScore: opponentScore,
        }
        const gameRef = db.collection('game').doc()
        const gameId = gameRef.id
        db.collection('game').doc(gameId).set(gameData)
        .then(() => {
            dispatch(push('/gamePlayer/' + gameId))
        })
        .catch(() => {
            alert('試合セットに失敗しました。通信環境を整えてサイドお試し下さい')
            return false
        })
    }
    useEffect(() => {
        db.collection("team").get()
        .then((snapshot:any) => {
            setTeams(snapshot.docs.map((doc:any) => doc.data()))
        })
        db.collection('type').get()
        .then((snapshot:any) => {
            setTypes(snapshot.docs.map((doc:any) => doc.data()))
        })
    },[])

    return (
        <div>
            
        </div>
    )
}

export default GameInfo
