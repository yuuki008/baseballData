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
        height: "50px",
        lineHeight: "50px",
    },
    span:{
        paddingLeft: "15px",
    },
    newUser:{
        fontWeight: 600,
        fontSize: "18px",
        color: 'rgb(0,0,0,0.7)',
        margin: "13px",
    }
})

interface Props{
    anchorEl:any,
    handleClose:any,
    players:any,
    users:any,
    userAdmit: any,
}
const Notification:React.FC<Props> = ({anchorEl, handleClose, players, users, userAdmit}) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    
    
    return (
        <div>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            {users.length > 0 && (
                <div>
                <div className="module-spacer--extra-small"/>
                <span className={classes.newUser}>登録希望者</span>
                <div className="module-spacer--extra-small"/>
                {users.map((user:any) => 
                <MenuItem
                className={classes.item}
                key={user.uid}
                onClick={() => {
                    userAdmit(user, handleClose)
                }}
                >
                    <div>{user.username}が{user.role.name}登録希望</div>
                </MenuItem>
                )}
                </div>
            )}
            <div style={{border: "1px solid #e3e3e3"}} />
            {players.length > 0 ? (
                <div>
                    <div className="module-spacer--extra-small"/>
                    <span className={classes.newUser}>チーム移動</span>
                    <div className="module-spacer--extra-small"/>
                    {players.map((player:any) => 
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
                    )}
                </div>
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


interface Player{
    player:any,
}

const NoticeList:React.FC<Player> = ({player}) => {
    const [date, setDate] = useState("")
    const classes = useStyles()

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