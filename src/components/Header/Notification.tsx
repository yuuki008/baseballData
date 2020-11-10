import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import {Menu, MenuItem} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'
import {FirebaseTimestamp} from '../../firebase/config'

const useStyles = makeStyles({
    item:{
        fontWeight: 600,
        fontSize: "14px",
        color: "rgb(0,0,0,0.7)",
        padding: "8px",
    },
    span:{
        paddingLeft: "15px",
    }
})

interface Props{
    anchorEl:any,
    handleClose:any,
    players:any
}
const Notification:React.FC<Props> = ({anchorEl, handleClose, players}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    interface Player{
        player:any
    }

    const NoticeList:React.FC<Player> = ({player}) => {
        const [date, setDate] = useState("")
    
        const checkDate = (timestamp:any) => {
            const d = timestamp.toDate()
            const month = d.getMonth() + 1;
            const day   = d.getDate();
            return(month + '/' + day);
          }
    
        useEffect(() => {
            setDate((checkDate(player.timestamp)))
        },[player])

        useEffect(() => {
            const day:any = FirebaseTimestamp.now()
            if(day.seconds - player.timestamp.seconds > 172800){
                db.collection('notification').doc(player.id).delete()
            }            
        },[])

        return(
            <div>{date}<span className={classes.span}/>{player.name}<span className={classes.span}>{player.team}</span></div>
        )
    }

    return (
        <div>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {players.length > 0 ? (
                players.map((player:any) => 
                <MenuItem 
                className={classes.item}
                key={player.id} 
                onClick={() => {
                    handleClose()
                    dispatch(push('/player/' + player.id))           
                }}
                >
                <NoticeList player={player}/>
                </MenuItem>
                )
            ):(
                <MenuItem
                className={classes.item}
                onClick={() => {
                    handleClose()
                }}
                >新しいチーム移動はありません</MenuItem>
            )}
            </Menu>
            
        </div>
    )
}

export default Notification

