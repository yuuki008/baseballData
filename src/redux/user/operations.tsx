import {db, auth, FirebaseTimestamp} from '../../firebase/config'
import {push} from 'connected-react-router';
import {signInAction, signOutAction,} from './actions';

const usersRef = db.collection('user')

export const signUp = (username:string, email:string, password:string, confirmPassword:string, type: any) => {
    return async (dispatch:any) => {
        console.log("yeyeyhv")
        if(username === "" || email === "" || password === ""){
            alert('必須項目が未入力です')
            return false
        }
        if(password !== confirmPassword){
            alert('パスワードが一致しません')
            return false
        }
        if(Object.keys(type).length === 0){
            alert('役職を設定してください')
            return false
        }
        return auth.createUserWithEmailAndPassword(email, password)
        .then((result:any) => {
            const user = result.user
            if(user){
                const uid = user.uid
                const timestamp = FirebaseTimestamp.now()
                const userData = {
                    uid: uid,
                    email: email,
                    username: username,
                    created_at: timestamp,
                    role: type,
                    admit: false,
                }
                usersRef.doc(uid).set(userData)
                .then(() => {
                    dispatch(push('/signin'))
                })
                .catch((error:any) => alert('通信環境を整えて再度試して下さい。'))
            }
        })
    }
}

export const signIn = (email: string, password: string) => {
    return async (dispatch: any) => {
        if(email === "" || password === ""){
            alert('必須項目が未入力です')
            return false
        }
        auth.signInWithEmailAndPassword(email, password)
        .then((result:any) => {
            const user = result.user
            if(user){
                const uid = user.uid
                db.collection('user').doc(uid).get()
                .then((snapshot:any) => {
                    const data:any = snapshot.data()
                    if(data.admit === false){
                        alert("ユーザー登録がまだ認められていません。")
                        dispatch(signOut())
                        return false
                    }
                    dispatch(signInAction({
                        isSignedIn: true,
                        username: data.username,
                        uid: data.uid,
                        role: data.role,
                    }))
                    dispatch(push('/'))
                })
            }
        })
    }
}

export const listenAuthState = () => {
    return async (dispatch:any) => {
        return auth.onAuthStateChanged((user:any) => {
            if(user){
                const uid = user.uid
                usersRef.doc(uid).get()
                .then((snapshot:any) => {
                    const data = snapshot.data()
                    if(!data){
                        throw new Error('ユーザーデータが存在しません')
                    }
                    if(data.admit === false){
                        dispatch(push('/signin'))
                        return false
                    }
                    dispatch(signInAction({
                        isSignedIn: true,
                        username: data.username,
                        uid: uid,
                        role: data.role,
                    }))
                })     
            }else{
                dispatch(push('/signin'))
            }
        })
    }
}

export const signOut = () => {
    return async (dispatch: any) => { 
        auth.signOut()
        .then(() => {
            dispatch(signOutAction())
            dispatch(push('/signin'));
        })
        .catch((error:any) => {
            console.log(error)
        })
    }
}


export const resetPassword = (email:string) => {
    return async (dispatch: any) =>  {
        if(email === ""){
            alert('必須項目が未入力です')
            return false
        }else{
            auth.sendPasswordResetEmail(email)
            .then(() => {
                alert('入力されたアドレスにパスワードリセット用のメールを送信しました。')
                dispatch(push('/signin'))
            })
            .catch(() => {
                alert('メールの送信に失敗しました。通信環境を整えて再度試してください。')
            })
        }
    }
}
