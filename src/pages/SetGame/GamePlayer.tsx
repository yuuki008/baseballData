import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {db} from '../../firebase/config'
import {push} from 'connected-react-router'

const GamePlayer = () => {
    const dispatch = useDispatch()
    const gameId:any = window.location.pathname.split('/gameplayer/')

    const [game, setGame] = useState<any>({})
    const [players, setPlayers] = useState([])
    const [select, setSelect] = useState<any>([])

    const addselect = (event:any, setCheck:any) => {
        const newSelect = {name: event.target.name, id: event.target.id}
        const filteredPlayer = select.filter((player:any) => player.id !== newSelect.id)
        if(filteredPlayer.length === select.length){
            setSelect([
                ...filteredPlayer,
                newSelect,
            ])
            setCheck(true)
        }else{
            setSelect([
                ...filteredPlayer
            ])
            setCheck(false)
        }
    }

    const DecisionPlayers = () => {
        db.collection('game').doc(gameId).set({players: select}, {merge: true})
    }

    const setGameCancel = () => {
        const ret = window.confirm('これまでセットした試合情報を削除します。よろしいですか？')
        if(!ret) return false

        db.collection('game').doc(gameId).delete()
        .then(() => {
            dispatch(push('/'))
        })
    }

    useEffect(() => {
        db.collection('game').doc(gameId).get()
        .then((snapshot:any) => {
            setGame(snapshot.data())
        })
    },[])

    useEffect(() => {
        if(game){
            db.collection('player').get()
            .then((snapshot:any) => {
                const list:any = []
                snapshot.docs.map((doc:any) => {
                    const data = doc.data()
                    if(game.team.name === "全体"){
                        list.push(data)
                    }else if(game.team.name === data.team.name){
                        list.push(data)
                    }
                })
                setPlayers(list)
            })
        }
    },[game])

    return (
        <div>
            
        </div>
    )
}

export default GamePlayer
