import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getIsSignedIn} from './redux/selectors'
import { listenAuthState } from './redux/user/operations'
import {push} from 'connected-react-router'
interface Props{
    children: any,
}
const AuthWrapper:React.FC<Props> = ({children}) => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const isSignedIn = getIsSignedIn(selector)

    useEffect(() => {
        if(!isSignedIn){
            dispatch(listenAuthState())
        }
    },[])

    if(!isSignedIn){
        return <></>
    }else{
        return children
    }
}

export default AuthWrapper
