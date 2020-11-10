import React, { useState, useCallback, useEffect} from 'react'
import {TextInput, SelectBox, SelectBox2} from '../components'
import {Button, makeStyles} from '@material-ui/core'
import {settingPlayer} from '../redux/player/operations'
import {useDispatch} from 'react-redux'
import {db} from '../firebase/config';

const useStyles = makeStyles({
    button: {
        width: "60%",
        fontSize: "20px",
        backgroundColor: '#008000	',
        borderRadius: '40px',
        color: 'white',
        fontWeight: 700,
    }
})

// const teams = [
//     {id: 1, name: '選抜'},
//     {id: 2, name: '強化'},
//     {id: 3, name: '育成'},
// ]

const positions = [
    {id: "1", name: '投手'},
    {id: "2", name: '捕手'},
    {id: "3", name: '一塁手'},
    {id: "4", name: '二塁手'},
    {id: "5", name: '三塁手'},
    {id: "6", name: '遊撃手'},
    {id: "7", name: '左翼手'},
    {id: "8", name: '中堅手'},
    {id: "9", name: '右翼手'},
    {id: "10", name: '代走'},
    {id: "11", name: '指名打者'},
]

const schoolYear = [
    {id: 1, name: "1年"},
    {id: 2, name: "2年"},
    {id: 3, name: "3年"},
    {id: 4, name: "4年"}
]

const Hitting = [
    {id: 1, name: '右'},
    {id: 2, name: '左'}
]

const Pitching = [
    {id: 1, name: '右'},
    {id: 2, name: '左'}
]

interface position {
    id: number,
    name: string,
}

const SetPlayer = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [selling, setSelling] = useState("")
    const [target, setTarget] = useState("")
    const [school, setSchool] = useState("")
    const [weight, setWeight] = useState(0)
    const [position, setPosition] = useState<any[]>([])
    const [team, setTeam] = useState({})
    const [number, setNumber] = useState({})
    const [hit, setHit] = useState({})
    const [pitch, setPitch] = useState({})
    const [teams, setTeams] = useState<any>([])
    const [image, setImage] = useState("")

    const selectPosition = (event: any, setCheck: any) => {
        const Position = {name: event.target.name, id: event.target.id}
        const filteredPositions = position.filter((posi: any) => posi.id !== Position.id)
        if(filteredPositions.length === position.length){
            setPosition([
                ...filteredPositions,
                Position,
            ])
            setCheck(true)
        }else{
            setPosition([
                ...filteredPositions
            ])
            setCheck(false)
        }
    }


    const inputSchool = useCallback((event) => {
        setSchool(event.target.value)
    },[setSchool])

    const inputName = useCallback((event) => {
        setName(event.target.value)
    },[setName])

    const inputSelling = useCallback((event) => {
        setSelling(event.target.value)
    },[setSelling])

    const inputTarget = useCallback((event) => {
        setTarget(event.target.value)
    },[setTarget])

    const inputWeight = useCallback((event) => {
        setWeight(event.target.value)
    },[setWeight])

    const inputImage = useCallback((event) => {
        setImage(event.target.value)
    },[setImage])

    useEffect(() => {
        db.collection('team')
        .onSnapshot((snapshot) => {
            setTeams(snapshot.docs.map((doc:any) => doc.data()))
        })
    },[])

    return (
        <div className="c-section-container">
            <h2 className="u-text-center u-text__headline">選手登録</h2>
            <TextInput
                fullWidth={true} label={"選手名"} multiline={false} required={true}
                rows={1} value={name} type={"text"} onChange={inputName}
            />
            <div style={{display: 'flex'}}>
            <SelectBox 
                label={"投"} options={Pitching} required={true} select={setPitch} value={pitch}
            />  
            <SelectBox 
                label={"打"} options={Hitting} required={true} select={setHit} value={hit}
            />  
            </div>  
            <SelectBox 
                label={"学年"} options={schoolYear} required={true} select={setNumber} value={number}
            />  
            <SelectBox2 
                label={"ポジション"} positions={positions} required={true} select={selectPosition} selected={position}
            />  
            <SelectBox 
                label={"現在のチーム"} options={teams} required={true} select={setTeam} value={team}
            />  
            <TextInput
                fullWidth={true} label={"出身高校"} multiline={true} required={true}
                rows={1} value={school} type={"text"} onChange={inputSchool}
            />
            <TextInput
                fullWidth={true} label={"アピールポイント"} multiline={true} required={true}
                rows={4} value={selling} type={"text"} onChange={inputSelling}
            />
            <TextInput
                fullWidth={true} label={"次のシーズンの目標"} multiline={true} required={true}
                rows={3} value={target} type={"text"} onChange={inputTarget}
            />
            <TextInput
                fullWidth={true} label={"現在の体重"} multiline={false} required={true}
                rows={1} value={weight} type={"number"} onChange={inputWeight}
            /> 
            <TextInput
                fullWidth={true} label={"プロフィール写真"} multiline={false} required={true}
                rows={1} value={image} type={"text"} onChange={inputImage}
            /> 
            <div className="module-spacer--medium"/>
            <div className="center">
                <Button
                onClick={() => 
                    dispatch(settingPlayer(name, number, position, team, school, selling, target, weight, image, hit, pitch))
                }
                className={classes.button}
                >登録</Button>
            </div>
        </div>
    )
}

export default SetPlayer
