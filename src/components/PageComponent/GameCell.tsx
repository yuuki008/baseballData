import React, { useCallback, useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { TextInput } from '../';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';



const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    name:{
        width: '100px',
    },
    cell:{
        width: "54px",
    }
  });

interface Props {
    user: any,
    upload: boolean,
    setList: any;
}
const GameCell:React.FC<Props> = ({user, upload, setList}) => {
    const classes = useStyles()
    
    const [total, setTotal] = useState<number>(0)
    const [hit, setHit] = useState<number>(0)
    const [twobase, setTwobase] = useState<number>(0)
    const [threebase, setThreebase] = useState<number>(0)
    const [homerun, setHomerun] = useState<number>(0)
    const [rbi, setRbi] = useState<number>(0)
    const [error, setError] = useState<number>(0)
    const [insideHit, setInsideHit] = useState<number>(0)
    const [stolenBase, setStolenBase] = useState<number>(0)
    const [stolenOutBase, setStolenOutBase] = useState<number>(0)
    const [sacrifice, setSacrifice] = useState<number>(0)
    const [strikeOut, setStrikeOut] = useState<number>(0)
    const [missedStrikeOut, setMissStrikeOut] = useState<number>(0)
    const [four, setfour] = useState<number>(0) 


    useEffect(() => {
        if(upload === true){
            const data = {
                id: user.id,
                total: Number(total),
                hit: Number(hit),
                two: Number(twobase),
                three: Number(threebase),
                homerun: Number(homerun),
                rbi: Number(rbi),
                error: Number(error),
                inside: Number(insideHit),
                stolen: Number(stolenBase),
                stolenOut: Number(stolenOutBase),
                sacrifice: Number(sacrifice),
                four: Number(four),
                strikeOut: Number(strikeOut),
                missedStrikeOut: Number(missedStrikeOut),
            }
            setList((prevState:any) => [...prevState, data])
        }
    },[upload])

    const inputHit = useCallback((event) => {
        setHit(event.target.value)
    },[setHit])

    const inputTotal = useCallback((event) => {
        setTotal(event.target.value)
    },[setTotal])

    const inputTwobase = useCallback((event) => {
        setTwobase(event.target.value)
    },[setTwobase])

    const inputThreebase = useCallback((event) => {
        setThreebase(event.target.value)
    },[setThreebase])

    const inputHomerun = useCallback((event) => {
        setHomerun(event.target.value)
    },[setHomerun])

    const inputRbi = useCallback((event) => {
        setRbi(event.target.value)
    },[setRbi])

    const inputError = useCallback((event) => {
        setError(event.target.value)
    },[setError])

    const inputInsideHit = useCallback((event) => {
        setInsideHit(event.target.value)
    },[setInsideHit])

    const inputSacrifice = useCallback((event) => {
        setSacrifice(event.target.value)
    },[setSacrifice])


    const inputFour = useCallback((event) => {
        setfour(event.target.value)
    },[setfour])

    const inputStolenBase = useCallback((event) => {
        setStolenBase(event.target.value)
    },[setStolenBase])

    const inputStolenOutBase = useCallback((event) => {
        setStolenOutBase(event.target.value)
    },[setStolenOutBase])

    const inputStrikeOut = useCallback((event) => {
        setStrikeOut(event.target.value)
    },[setStrikeOut])

    const inputMissedStrikeOut = useCallback((event) => {
        setMissStrikeOut(event.target.value)
    },[setMissStrikeOut])


    return(
        <TableRow key={user.name}>
        <TableCell component="th" scope="user" className={classes.name}>
          {user.name}
        </TableCell>
        <TableCell component="th" scope="user"className={classes.cell}>
            <TextInput
            fullWidth={false} label={""} multiline={false} required={true}
            rows={1} value={total} type="number" onChange={inputTotal}
            />
        </TableCell>
        <TableCell component="th" scope="user"className={classes.cell}>
            <TextInput
            fullWidth={false} label={""} multiline={false} required={true}
            rows={1} value={hit} type="number" onChange={inputHit}
            />
        </TableCell>
        <TableCell component="th" scope="user"className={classes.cell}>
            <TextInput
            fullWidth={false} label={""} multiline={false} required={true}
            rows={1} value={insideHit} type="number" onChange={inputInsideHit}
            />
        </TableCell>
        <TableCell component="th" scope="user"className={classes.cell}>
            <TextInput
            fullWidth={false} label={""} multiline={false} required={true}
            rows={1} value={twobase} type="number" onChange={inputTwobase}
            />
        </TableCell>
        <TableCell component="th" scope="user"className={classes.cell}>
            <TextInput
            fullWidth={false} label={""} multiline={false} required={true}
            rows={1} value={threebase} type="number" onChange={inputThreebase}
            />
        </TableCell>
        <TableCell component="th" scope="user"className={classes.cell}>
            <TextInput
            fullWidth={false} label={""} multiline={false} required={true}
            rows={1} value={homerun} type="number" onChange={inputHomerun}
            />
        </TableCell>
        <TableCell component="th" scope="user"className={classes.cell}>
            <TextInput
            fullWidth={false} label={""} multiline={false} required={true}
            rows={1} value={rbi} type="number" onChange={inputRbi}
            />
        </TableCell>
        <TableCell component="th" scope="user"className={classes.cell}>
            <TextInput
            fullWidth={false} label={""} multiline={false} required={true}
            rows={1} value={error} type="number" onChange={inputError}
            />
        </TableCell>
        <TableCell component="th" scope="user"className={classes.cell}>
            <TextInput
            fullWidth={false} label={""} multiline={false} required={true}
            rows={1} value={stolenBase} type="number" onChange={inputStolenBase}
            />
        </TableCell>
        <TableCell component="th" scope="user"className={classes.cell}>
            <TextInput
            fullWidth={false} label={""} multiline={false} required={true}
            rows={1} value={stolenOutBase} type="number" onChange={inputStolenOutBase}
            />
        </TableCell>
        <TableCell component="th" scope="user"className={classes.cell}>
            <TextInput
            fullWidth={false} label={""} multiline={false} required={true}
            rows={1} value={sacrifice} type="number" onChange={inputSacrifice}
            />
        </TableCell>
        <TableCell component="th" scope="user"className={classes.cell}>
            <TextInput
            fullWidth={false} label={""} multiline={false} required={true}
            rows={1} value={four} type="number" onChange={inputFour}
            />
        </TableCell>
        <TableCell component="th" scope="user"className={classes.cell}>
            <TextInput
            fullWidth={false} label={""} multiline={false} required={true}
            rows={1} value={strikeOut} type="number" onChange={inputStrikeOut}
            />
        </TableCell>
        <TableCell component="th" scope="user"className={classes.cell}>
            <TextInput
            fullWidth={false} label={""} multiline={false} required={true}
            rows={1} value={missedStrikeOut} type="number" onChange={inputMissedStrikeOut}
            />
        </TableCell>
      </TableRow>
    )
}

export default GameCell