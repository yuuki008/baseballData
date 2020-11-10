import React, {useState, useEffect} from 'react'
import {FormControlLabel} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    check:{
        display: 'flex',
        width: '100%',
        textAlign: 'center',
        padding: '5px',
    },
    box:{
        display: 'flex',
    }
})
interface position {
    id: string,
    name: string,
}

interface Props {
    position: any;
    select: (e:any, setCheck:any) => void;
    mountCheck: position[];
}

const BoxLabel: React.FC<Props> = ({position, mountCheck, select}) => {
    const [check, setCheck] = useState(false)
    const classes = useStyles()
    useEffect(() => {
        if(mountCheck.length > 0){
            const checkItem = mountCheck.filter((item: any) => item.id === position.id)
            if(checkItem.length > 0){
                setCheck(true)
            }else(
                setCheck(false)
            )
        }
    },[mountCheck]) 

    return(
        <FormControlLabel 
            className={classes.check}
            label={position.name}
            control={<Checkbox 
                name={position.name} 
                id={position.id}
                color="default"
                className={classes.box}
                onChange={(event) => select(event, setCheck)} 
                checked={check}
            />}
        />
    )

}

export default BoxLabel