import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import {push} from 'connected-react-router';
import NoImage from '../../assets/no_image.png';
import LightTooltip from '../UIkit/LightTooltip';

const useStyles = makeStyles({
  root: {
    width: "120",
    borderRadius: '10px',
    '&:hover':{
      transform: 'scale(1.05)'
    }
  },
  media: {
    height: 160,
    width: 120,
    backgroundSize: 'cover',
    backgroundColor: 'lightgray',
    borderRadius: '10px',
  },
  name:{
      fontSize: "14px"
  },
  character:{
      fontSize: "10px",
      fontWeight: 300,
      display: 'flex',
      overflowX: 'hidden'
  },
  content: {
    overflowY: 'scroll',
    height: '40px',
  }
});
interface Props{
    player: any,
}
const PlayerCard:React.FC<Props> = ({player}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    return (
        <div style={{width: "120px", margin: "10px"}}>
        <Card className={classes.root}>
        <LightTooltip title={player.selling}>
        <CardActionArea
            onClick={() =>dispatch(push('/player/' + player.id))}
        >
            <CardMedia
            className={classes.media}
            image={player.image === "" ? ("") : (player.image)}
            title={player.name}
            />
            <CardContent className={classes.content}>
            <Typography className={classes.name}>
            {player.name}
            </Typography>
            <Typography className={classes.character}>
            {player.position.slice(0,3).map((item:any) => 
            <p key={item.id}
            style={{paddingRight: '5px', display: 'flex'}}>{item.name}</p>
            )}
            </Typography>
            </CardContent>
        </CardActionArea>
        </LightTooltip>
        </Card>
    </div>
    )
}

export default PlayerCard

