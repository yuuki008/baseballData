import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import BoxLabel from './BoxLabel'

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: 16,
        minWidth: 120,
        maxWidth: "1200px",
        width: '100%',
    },
    chips: {
        display: 'flex',
        overflowX: 'scroll',
    },
    chip: {
        margin: 2,
    },
}));

interface position {
    id: string,
    name: string,
}

interface Props {
    label: string;
    positions: position[];
    select: (e:any, setCheck:any) => void;
    required: boolean;
    selected: position[];
}

const SelectBox2: React.FC<Props> = ({label, positions, select, required, selected}) => {
    const classes = useStyles()
    const name = selected.map((g: any) => g.name).join(' | ')
    return (
        <FormControl className={classes.formControl}>
            <InputLabel >{label}</InputLabel>
            <Select 
            required={required}
            value={name}
            renderValue={() => (
                <div className={classes.chips}>
                    <Chip label={name} className={classes.chip} />
                </div>
                )}
            >
                {positions.map((position:position) => 
                    <BoxLabel key={position.id} position={position} mountCheck={selected} select={select} />
                )}
            </Select>
        </FormControl>
    );
};

export default SelectBox2;

