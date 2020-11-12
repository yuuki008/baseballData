export const SIGN_IN = 'SIGN_IN'
export const signInAction = (user: {isSignedIn: boolean, username: string, uid: string, role: {id: number, name: string}}) => {
    return{
        type: 'SIGN_IN',
        payload: {
            isSignedIn: true,
            username: user.username,
            uid: user.uid,
            role: user.role
        }
    }
}

export const SIGN_OUT = 'SIGN_OUT'
export const signOutAction = () => {
    return{
        type: 'SIGN_OUT',
        palyload: {
            isSignedIn: false,
            username: "",
            uid: "",
            genres: [],
            favorite: [],
        }
    }
}
