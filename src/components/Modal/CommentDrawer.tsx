import React, {useCallback, useEffect, useState} from 'react'
import { createStyles, Drawer, makeStyles } from '@material-ui/core'
import { db, FirebaseTimestamp } from '../../firebase/config'
import { Button } from '@material-ui/core'
import '../../assets/CommentDrawer.css'
import TextInput from '../UIkit/TextInput'
import { getUid, getUsername } from '../../redux/selectors'
import {useSelector} from 'react-redux'

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
            marginTop: "25px",
            height: "50px",
            fontWeight: 600,
            textAlign: 'center',
            backgroundColor: "#008000",
            color: 'white',
        },
        chat:{
            overflow:'auto',
            paddingTop: "30px",
            margin: '0 auto',
            width: "100%",
        }
    })
)

interface Props{
    open: boolean;
    onClose: any;
}

const CommentModal:React.FC<Props> = ({open, onClose}) => {
    const classes = useStyles()
    const selector = useSelector(state => state)
    const uid = getUid(selector)
    const username = getUsername(selector)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")

    const inputMessage = useCallback((event) => {
        setMessage(event.target.value)
    },[setMessage])

    const time = (timestamp:any) => {
        const date = timestamp.toDate()
        return (date.getMonth() + 1) + "/"
        + ('00' + date.getDate()).slice(-2) + " "
        + ('00' + date.getHours()).slice(-2) + ":"
        + ('00' + date.getMinutes()).slice(-2)   
    }
 
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
            id: messageId,
            uid: uid,
            username: username,
        }
        db.collection('room').doc('KEWm1y1nuP3UbUrHDucT').collection('message').doc(messageId).set(setData)
        .then(() => {
            setMessage("")
        })
    }

    
    useEffect(() => {
        db.collection('room').doc("KEWm1y1nuP3UbUrHDucT").collection('message').orderBy('timestamp', 'asc')
        .onSnapshot((snapshot:any) => {
            setMessages(snapshot.docs.map((doc:any) => doc.data()))
        })
    },[])
    
    useEffect(() => {
        const scrollArea = document.getElementById('scroll-area');
        if (scrollArea) {
            scrollArea.scroll({top: scrollArea.scrollHeight, behavior: "smooth"})
        }       
    },[messages])

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
        <div id={"scroll-area"} className="drawer__room">
            {messages.length > 0 && (
                messages.map((message:any) =>
                <div key={message.id}>
                    <div className={`message ${message.uid === uid ? 'sent' : 'received'}`}>
                        <div className="message__user">
                            {message.username}
                        </div>
                        <p>{message.message}</p>
                        <span>{time(message.timestamp)}</span>
                    </div>
                </div>
                )
            )}
        </div>
        <div className="comment__drawer">
        <div className="message__post">
            <div className="meesage__textfield">
            <TextInput
            fullWidth={true} label="メッセージを入力してください" multiline={true}
            required={true} rows={3} type="text" value={message} onChange={inputMessage} 
            />
            </div>
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
