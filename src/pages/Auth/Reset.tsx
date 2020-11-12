import React, { useState, useCallback } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import {TextInput} from '../../components'
import { resetPassword } from '../../redux/user/operations'
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    button:{
        fontWeight: 600,
        fontSize: "20",
        color: 'rgb(0,0,0,0.7)'
    }
})

const Reset = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    
    const [email, setEmail] = useState('');

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail])


    return (
        <div className="c-section-container">
            <h2 className="u-text-center u-text__headline">パスワードリセット</h2>

            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"text"} onChange={inputEmail}
            />
            <div className="module-spacer--medium"/>
            <div className="center">
                <Button
                    className={classes.button}
                    onClick={() => dispatch(resetPassword(email))}
                >リセットメール送信</Button>
                <div className="module-spacer--medium"/>
                <p onClick={() => dispatch(push('/signup'))}>ユーザー登録がお済み出ない方はこちら</p>
                <div className="module-spacer--medium"/>
                <p onClick={() => dispatch(push('/signin'))}>サインインはこちら</p>
            </div>
        </div>
    )
}

export default Reset
