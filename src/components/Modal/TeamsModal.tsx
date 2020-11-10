import React, { useState, useCallback, useEffect} from 'react'
import { IconButton, Modal, Theme, Button } from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import ClearIcon from '@material-ui/icons/Clear'
import BoxList from '../UIkit/BoxList'


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
        top: '50',
        left: '50',
        width: 250,
        backgroundColor: 'white',
        border: '2px solid #000'
    },
    icon:{
        position: 'absolute',
        right: 0,
        top: 0,
    },
    title:{
        padding: "10px",
        fontSize: "18px",
        fontWeight: 600,
        color: 'rgb(0,0,0,0.7)',
        borderBottom: "2px solid #e3e3e3"
    },
    enter:{
        textAlign: 'center',
        width: "100%",
        padding: "10px 0",
        fontSize: '18px',
        fontWeight: 600,
        color: 'rgb(0,0,0,0.7)'
    },
    width:{
        width: "100%",
    }
}))

interface Props{
    handleClose:any,
    open: boolean,
    teams: any,
    moveTeam: any,
    player: any,
}
const TeamsModal:React.FC<Props>= ({handleClose, open, teams, moveTeam, player}) => {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)
    const [team, setTeam] = useState<any>({})

    useEffect(() => {
        setTeam(player.team)
    },[])
    return (
        <Modal
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        >
            <div>
            <div className={classes.paper} style={modalStyle}>
            <p className={classes.title}>移動先...</p>
            <IconButton
            onClick={() => handleClose()}
            className={classes.icon}
            >
                <ClearIcon/>
            </IconButton>
            {teams.map((item:any, index:number) => 
            <BoxList key={index} item={item} setTeam={setTeam} player={player} team={team}/>
            )}
            <Button
            className={classes.enter}
            onClick={() => moveTeam(team, setTeam)}
            >
                更新
            </Button>      
            </div>
            </div>
        </Modal>
    )
}

export default TeamsModal




