import { TextField } from '@material-ui/core'
import React from 'react'

interface Props{
    fullWidth: boolean;
    label: string;
    multiline: boolean;
    required: boolean;
    rows: number;
    value: any;
    type: string;
    onChange: (event: any) => void
}

const TextInput:React.FC<Props> = ({fullWidth, label, multiline, required, rows, value, type, onChange}) => {
    return (
        <TextField
            fullWidth={fullWidth}
            label={label}
            margin="dense"
            multiline={multiline}
            required={required}
            rows={rows}
            value={value}
            type={type}
            onChange={onChange}
            onKeyDown={onChange}
        />
    )
}

export default TextInput
