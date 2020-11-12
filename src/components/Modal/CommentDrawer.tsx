import React, {useCallback, useEffect, useState} from 'react'
import { createStyles, Drawer, makeStyles, Theme } from '@material-ui/core'
import { db, FirebaseTimestamp } from '../../firebase/config'
import {Button} from '@material-ui/core'
import '../../assets/CommentDrawer.css'

const useStyles = makeStyles((theme) => 
    createStyles({
        drawer:{
            [theme.breakpoints.up('sm')]:{
                width: 400,
                flexShrink: 0,
            }
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper:{
            width: 400,
        },
        button:{
            width: 50,
            color: 'rgb(0,0,0,0.7)',
            fontWeight: 600,
            textAlign: 'center',
        }
    })
)

interface Props{
    open: boolean;
    onClose: any;
}

const CommentModal:React.FC<Props> = ({open, onClose}) => {
    const classes = useStyles()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")

    const inputMessage = useCallback((event) => {
        setMessage(event.target.value)
    },[setMessage])
 
    const sendMessage = () => {
        if(message === ''){
            alert('メッセージが入力されていません')
            return false
        }
        const ref = db.collection('room').doc('KEWm1y1nuP3UbUrHDucT').collection('message').doc()
        const messageId = ref.id
        const setData = {
            message: message,
            timestamp: FirebaseTimestamp.now(),
            id: messageId
        }
        db.collection('room').doc('KEWm1y1nuP3UbUrHDucT').collection('message').doc(messageId).set(setData)
        .then(() => {
            setMessage("")
        })
    }

    useEffect(() => {
        db.collection('room').doc("KEWm1y1nuP3UbUrHDucT").collection('message').get()
        .then((snapshot:any) => {
            setMessages(snapshot.docs.map((doc:any) => doc.data()))
        })
    },[])
    
    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
        <Drawer
        variant="temporary"
        anchor={"right"}
        open={open}
        onClose={(e) => onClose(e, false)}
        classes={{paper: classes.drawerPaper,}}
        ModalProps={{keepMounted: true,}}
        >
        <div className="comment__drawer">
        <div className="drawer__room">

        </div>
        <div className="message__post">
            <input 
            type="text"
            placeholder="メッセージを送信する"
            value={message}
            onChange={(event) => inputMessage(event)}
            />
            <Button 
            className={classes.button}
            onClick={() => sendMessage()}
            >
                送信
            </Button>
        </div>
        </div> 
        </Drawer>
        </nav>
    )
}

export default CommentModal
