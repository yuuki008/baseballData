import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: 16,
        minWidth: 120,
        width: "100%",
        height: 'auto',
    },
    table:{
        width: 'auto',
    }
}));

interface Props {
    options: any;
    label: string;
    required: boolean;
    select: any;
    value: any;
}

const SelectBox: React.FC<Props> = ({options, label, required, select, value}) => {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel >{label}</InputLabel>
            <Select
                className={classes.table}
                value={value} required={required}
                onChange={(e) => select(e.target.value)}
            >
                {options.map((value:any) => {
                    return <MenuItem key={value.id} value={value}>{value.name}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
};

export default SelectBox;