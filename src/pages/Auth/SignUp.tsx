import React, { useState, useCallback, useEffect } from 'react'
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux'
import { SelectBox, TextInput } from '../../components';
import { signUp } from '../../redux/user/operations';
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {db} from '../../firebase/config'

const useStyles = makeStyles({
    button:{
        fontWeight: 600,
        fontSize: "20",
        color: 'rgb(0,0,0,0.7)'
    }
})

const SignUp = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    
    const [username, setUsername] = useState(''),
          [email, setEmail] = useState(''),
          [password, setPassword] = useState(''),
          [confirmPassword, setConfirmPassword] = useState(""),
          [types, setTypes] = useState([]),
          [type, setType] = useState({});
    
    const inputUsername = useCallback((event) => {
        setUsername(event.target.value)
    },[setUsername])

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail])

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    },[setPassword])

    const inputConfirmPassword = useCallback((event) => {
        setConfirmPassword(event.target.value)
    },[setConfirmPassword])

    useEffect(() => {
        db.collection('role').get()
        .then((snapshot:any) => {
            setTypes(snapshot.docs.map((doc:any) => doc.data()))
        })
    },[])

    return (
        <div className="c-section-container">
            <h2 className="u-text-center u-text__headline">西南データ班登録</h2>
            <TextInput
                fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
                rows={1} value={username} type={"text"} onChange={inputUsername}
            />
            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"text"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"パスワード"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <TextInput
                fullWidth={true} label={"再確認パスワード"} multiline={false} required={true}
                rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
            />
            <SelectBox 
                label="役職" options={types} required={true} select={setType} value={type}
            />
            <div className="module-spacer--medium"/>
            <div className="center">
                <Button
                    className={classes.button}
                    onClick={() => dispatch(signUp(username, email, password, confirmPassword, type))}
                >
                    ユーザー登録
                </Button>
                <div className="module-spacer--medium"/>
                <p onClick={() => dispatch(push('/signin'))}>アカウントをお持ちの方はこちら</p>
            </div>
        </div>
    )
}

export default SignUp
