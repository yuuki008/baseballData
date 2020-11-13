import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
  button: {
    fontWeight: 600,
    fontSize: "15px",
    color: 'rgb(0,0,0,0.7)'
  }
})

interface Props {
    handleClose:any,
    anchorEl: any,
    teams: any,
    handleSignOut: any,
}

const HeaderMenu:React.FC<Props> = ({handleClose, anchorEl, teams, handleSignOut}) => {
  const classes = useStyles()
  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {teams.map((team:any, index:number) => 
            <MenuItem  className={classes.button}
            key={index} onClick={handleSignOut}>{team.name}</MenuItem>
        )}
      </Menu>
    </div>
  );
}

export default HeaderMenu
