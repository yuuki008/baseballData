import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface Props {
    handleClose:any,
    anchorEl: any,
    teams: any,
}

const HeaderMenu:React.FC<Props> = ({handleClose, anchorEl, teams}) => {
  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {teams.map((team:any) => 
            <MenuItem key={team.id} onClick={handleClose}>{team.name}</MenuItem>
        )}
      </Menu>
    </div>
  );
}

export default HeaderMenu
