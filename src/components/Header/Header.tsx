import React, { useEffect, useState, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'
import GroupIcon from '@material-ui/icons/Group';
import { db } from '../../firebase/config';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import HeaderMenu from './HeaderMenu'
import {Badge, Button, IconButton} from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications';
import MessageIcon from '@material-ui/icons/Message';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Notification from './Notification'
import LightTooltip from '../UIkit/LightTooltip';
import CommentDrawer from '../Modal/CommentDrawer';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginBottom: '68px',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      fontSize: 14,
      fontWeight: 700,
    },
    color:{
        backgroundColor: 'white',
        color: 'rgb(0,0,0,0.7)',
    },
    title: {
      fontSize: "20px",
      fontWeight: 600,
      flexGrow: 1,
      display: 'none',
      paddingLeft: "20px",
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    stringButton:{
      fontWeight: 600,
      fontSize: "15px",
      color: 'rgb(0,0,0,0.7)'
    },
    icon:{
      width: '23px',
      height: '23px',
    },
    menu:{
      marginTop: "30px",
      display: 'flex',
      alignItem: 'baseline',
      flexWrap: 'wrap',
      minHeight: '28px',
    },
    badge:{
      fontSize: "14px",
      fontWeight: 600,
    }
  }));

const Header = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [teams, setTeams] = useState<any>([])
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [notices, setNotices] = useState<any>([])
    const [noticeAnchorEl, setNoticeAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleDrawerToggle = useCallback((event:any, isOpen:boolean) => {
      if(event.key === 'keydown' && (event.key === "Tab" || event.key === "Shift")){
        return;
      }
      setDrawerOpen(isOpen)
    },[setDrawerOpen])

    const handleNoticeClick = (event:React.MouseEvent<HTMLButtonElement>) => {
      setNoticeAnchorEl(event.currentTarget)
    }

    const handleNoticeClose = () => {
      setNoticeAnchorEl(null)
    }
    
    useEffect(() => {
      db.collection('team')
      .onSnapshot((snapshot) => {
        setTeams(snapshot.docs.map((doc) => doc.data()))
      })
      db.collection('notification')
      .onSnapshot((snapshot:any) => {
        setNotices(snapshot.docs.map((doc:any) => doc.data()))
      })
    },[])
    
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.color}>
            <Toolbar>
              <div
              onClick={() => dispatch(push('/'))}
              >
              <img 
              style={{width: "70px"}}
              src="https://res-2.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/yqoqg3vdou4dpzpiyxhs"
              />
              </div>
                <Typography
                className={classes.title} variant="h6" noWrap
                >
                    SEINAN BASEBALL
                </Typography>
                <Button className={classes.stringButton}
                onClick={() => dispatch(push('/grade'))}
                >
                  個人成績
                </Button>
                <LightTooltip title="試合を追加する">
                  <IconButton
                  onClick={() => dispatch(push('/game'))}
                  >
                      <AddIcon className={classes.icon}/>
                  </IconButton>
                </LightTooltip>
                <IconButton
                  aria-controls="simple-menu" aria-haspopup="true"
                  onClick={handleNoticeClick}
                >
                  <Badge badgeContent={notices.length} className={classes.badge}>
                  <NotificationsIcon className={classes.icon}/>
                  </Badge>
                </IconButton>
                <IconButton
                aria-label="Menu Items"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => handleDrawerToggle(e, true)}
                >
                    <MessageIcon className={classes.icon}/>
                </IconButton>
                <Notification handleClose={handleNoticeClose} anchorEl={noticeAnchorEl} players={notices}/>
            </Toolbar>
            </AppBar>    
            <CommentDrawer open={drawerOpen} onClose={handleDrawerToggle}/>    
        </div>
    )
}

export default Header
