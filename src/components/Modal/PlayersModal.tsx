import React, { useState, useCallback, useEffect} from 'react'
import { IconButton, Modal, Theme, Button } from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import ClearIcon from '@material-ui/icons/Clear'
import { db } from '../../firebase/config'
import {CheckPlayer} from '../'
import shortId from 'shortid'


function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme:Theme) => ({
    paper:{
        position: 'absolute',
        width: "600px",
        top: '20%',
        left: '40%',
        backgroundColor: 'white',
        overflowY: 'scroll',
        border: '2px solid #000',
        height: "700px",
    },
    button:{
        margin: "20px 0",
        position: 'absolute',
        textAlign: 'center',
        left: "270px",
        fontWeight: 600,
        color: 'rgb(0,0,0,0.7)'
    }
}))
interface Props{
    handleClose: any,
    open: boolean;
    items: any,
    team: any,
}
const PlayersModal:React.FC<Props> = ({handleClose, open, items, team}) => {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)
    const [players, setPlayers] = useState<any>([])
    const [selects, setSelects] = useState<any>([])

    console.log(team)
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

    useEffect(() => {
        if(team){
            db.collection('player').get()
            .then((snapshot:any) => {
                const list:any = []
                snapshot.docs.map((doc:any) => {
                    const data = doc.data()
                    if(team.id !== 0){
                        if(team.id === data.team.id){
                            list.push(data)
                        }
                    }else{
                        list.push(data)
                    }
                })
                setPlayers(list)
            })
        }
    },[team])
    console.log(players)

    return (
        <Modal
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        >
            <div>
            <div className={classes.paper} style={modalStyle}>
                <div className="center title" style={{padding: "30px 0", fontSize: "20px !important"}}>
                    選手追加
                </div>
                <div style={{display: 'flex', justifyContent: 'space-around', overflowY: 'scroll'}}>
                <div style={{width: "150px"}}>
                <div className="title">1年</div>
                {players.map((player:any) => 
                player.schoolYear.id === 1 && (
                    <div key={shortId.generate()}>
                        <CheckPlayer player={player} handlePlayers={handlePlayers} />
                    </div>
                )
                )}
                </div>
                <div style={{width: "150px"}}>
                <div className="title">2年</div>
                {players.map((player:any) => 
                player.schoolYear.id === 2 && (
                    <div key={shortId.generate()}>
                        <CheckPlayer player={player} handlePlayers={handlePlayers} />
                    </div>
                )
                )}
                </div>
                <div style={{width: "150px"}}>
                <div className="title">3年</div>
                {players.map((player:any) => 
                player.schoolYear.id === 3 && (
                    <div key={shortId.generate()}>
                        <CheckPlayer player={player} handlePlayers={handlePlayers} />
                    </div>
                )
                )}
                </div>
                </div>
                <div style={{width: "100%", position: 'relative'}}>
                <Button
                className={classes.button}
                onClick={() => {
                    handleClose()
                }}
                >完了</Button>     
                </div>
             </div>
             </div>
         </Modal>
    )
}

export default PlayersModal
