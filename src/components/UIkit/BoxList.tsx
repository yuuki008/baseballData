import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/styles'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles({
    list:{
        display: 'flex',
        padding: "5px",
        position: 'relative',
    },
    teamname:{
        height: "45px",
        lineHeight: "45px",
        paddingLeft: "10px",
        fontSize: "15px",
        fontWeight: 550,
    },
})

interface Props{
    item:any;
    setTeam:any;
    player:any;
    team: any;
}

const BoxList:React.FC<Props> = ({item, setTeam, player, team}) => {
    const classes = useStyles()
    const [check, setCheck] = useState(false)

    const changeTeam = () => {
        if(!check){
            setCheck(true)   
            setTeam(item)       
        }else{
            setCheck(false)
            setTeam({})
        }
    }

    useEffect(() => {
        if(item.id === team.id){
            setCheck(true)
        }else if(item.id !== team.id){
            setCheck(false)
        }
    },[team]) 

    return(
        <div className={classes.list}>
         <Checkbox 
            checked={check}
            color="default"
            onChange={() => changeTeam()}
        />
        <p className={classes.teamname}>{item.name}</p>
        </div>
        
    )
}

export default BoxList