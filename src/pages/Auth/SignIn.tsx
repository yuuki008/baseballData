import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {TextInput} from '../../components'
import { signIn } from '../../redux/user/operations';
import {push} from 'connected-react-router';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import { getIsSignedIn } from '../../redux/selectors';

const useStyles = makeStyles({
    button:{
        fontWeight: 600,
        fontSize: "20",
        color: 'rgb(0,0,0,0.7)'
    }
})

const SignIn = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const isSignedIn = getIsSignedIn(selector)
    
    const [email, setEmail] = useState(''),
          [password, setPassword] = useState('');

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail])

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    },[setPassword])

    useEffect(() => {
        if(isSignedIn){
            dispatch(push('/'))
        }
    },[])
    
    return (
        <div className="c-section-container">
            <h2 className="u-text-center u-text__headline">サインイン</h2>
            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"text"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"パスワード"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <div className="module-spacer--medium"/>
            <div className="center">
                <Button
                    className={classes.button}
                    onClick={() => dispatch(signIn(email, password))}
                >
                    サインイン
                </Button>
                <div className="module-spacer--medium"/>
                <p onClick={() => dispatch(push('/signup'))}>ユーザー登録がお済みでない方はこちら</p>
                <div className="module-spacer--medium"/>
                <p onClick={() => dispatch(push('/reset'))}>パスワードを忘れた方はこちら</p>
            </div>
        </div>
    )
}

export default SignIn
