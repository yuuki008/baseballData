import React, {useState, useEffect, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import { push } from 'connected-react-router'
import { db, FirebaseTimestamp } from '../../firebase/config'
import { SelectBox, TextInput } from '../../components';
import {CheckPlayer} from '../../components'
import '../../assets/GameInfo.css'
import shortId from 'shortid'
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    button:{
        fontWeight: 600,
        position: 'fixed',
        top: "10%",
        right: "10px",
        fontSize: "20px",
        color: 'rgb(0,0,0,0.7)',
        width: '100px',
    }
})
const GameInfo = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [date, setDate] = useState<any>()
    const [opponent, setOpponent] = useState("")
    const [teams, setTeams] = useState([])
    const [types, setTypes] = useState([])
    const [team, setTeam] = useState<any>({})
    const [type, setType] = useState<any>({})
    const [players, setPlayers] = useState<any>([])
    const [selects, setSelects] = useState<any[]>([])

    const inputOpponent = useCallback((event:any) => {
        setOpponent(event.target.value)
    },[setOpponent])

    const inputDate = useCallback((event) => {
        setDate(event.target.value)
    },[setDate])

    const handlePlayers = (player:any, setChecked: any) => {
        const filterPlayers = selects.filter((item:any) => item.id !== player.id)
        console.log(player)
        if(filterPlayers.length === selects.length){
            setChecked(true)
            setSelects([...filterPlayers, player])
        }else{
            setChecked(false)
            setSelects([...filterPlayers])
        }
    }
    console.log(date)

    const setGameInfo = () => {
        if(Object.keys(type).length === 0 || Object.keys(team).length === 0 || date === undefined){
            alert('必須項目が未入力です!')
            return false
        }
        if(type.game === true && opponent === ""){
            alert('相手チーム情報が入力されていません。')
            return false
        }
        const gameData = {
            date: date,
            opponent: opponent,
            team: team,
            players: selects,
            type: type,
        }
        const gameRef = db.collection('games').doc()
        const gameId = gameRef.id
        db.collection('games').doc(gameId).set(gameData)
        .then(() => {
            dispatch(push('/game/player/' + gameId))
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

    useEffect(() => {
        db.collection('player').get()
        .then((snapshot:any) => {
            const list:any = []
            snapshot.docs.map((doc:any) => {
                const data = doc.data()
                if(team.id === 0){
                    list.push(data)
                }
                if(data.team.id === team.id){
                    list.push(data)
                }
            })
            setPlayers(list)
        })
    },[team])


    interface Id{
        id: number,
        handlePlayers: any
    }
    const HandleYearPlayers:React.FC<Id> = ({id, handlePlayers}) => {
        return (
            <div>
            <div className="gameInfo__yearsTitle">{JSON.stringify(id)}年</div>
            {players.map((player:any) => 
            player.schoolYear.id === id && (
                <div key={shortId.generate()}>
                    <CheckPlayer player={player} handlePlayers={handlePlayers} />
                </div>
            )
            )}
            </div>
        )
    }

    return (
        <div className="gameInfo">
        <div className="gameInfo__game">
            <h2 className="gameInfo__gameTitle">試合登録</h2>
            <input type="date" value={date} onChange={(event) => inputDate(event)}/>
            <SelectBox label="チーム" options={teams} required={true} select={setTeam} value={team} />
            <div className="module-spacer--small"/>
            <SelectBox label="試合タイプ" options={types} required={true} select={setType} value={type} />
            {type.game && (
                <div>
                <div className="module-spacer--small"/>
                <TextInput label="相手チーム" fullWidth={true} multiline={false} required={true} rows={1} value={opponent} type={"text"} onChange={inputOpponent}/>
                </div>
            )}
        </div>
        <div className="gameInfo__players">
        {players.length > 0 && (
            <>
            <div className="gameInfo__playersTitle">
                出場選手を選択してください
            </div>
            <div className="gameInfo__playerslist">
                <HandleYearPlayers id={1}  handlePlayers={handlePlayers}/>
                <HandleYearPlayers id={2}  handlePlayers={handlePlayers}/>
                <HandleYearPlayers id={3}  handlePlayers={handlePlayers}/>
            <div>
            {/* {players.map((player:any) => 
                <div>
                    <CheckPlayer player={player} handlePlayers={handlePlayers} />
                </div>
            )} */}
                </div>
            </div>
            </>
        )}
        </div>
        <div className="gameInfo__decision">
        <Button 
        className={classes.button}
        onClick={() => setGameInfo()}
        >
            次へ
        </Button>
        </div>
        </div>
    )
}

export default GameInfo
