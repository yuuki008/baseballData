import { push } from "connected-react-router";
import { db } from "../../firebase/config";

const playerRef = db.collection('player')

export const settingPlayer = (name:string, number: any, position: Array<{id: number, name: string}>, team: any, school:string, selling:string, target:string, weight:number, image: string, hit:any, pitch:any) => {
    return async (dispatch:any) => {
        if(name === "" || Object.keys(number).length  === 0 || position.length === 0  || Object.keys(team).length === 0 || selling === "" || target === "" || weight === 0){
            alert('必須項目が未入力です!')
            return false
        } 
        const ref = db.collection('player').doc()
        const playerId = ref.id
        const data = {
            id: playerId,
            name: name,
            schoolYear: number,
            position: position,
            team: team,
            school: school,
            selling: selling,
            target: target,
            weight: weight,
            image: image,
            hit: hit,
            pitch: pitch,
        }
        db.collection('player').doc(playerId).set(data)
        db.collection('team').doc(team.id).collection("member").doc(playerId).set(data)
        .then(() => {
            dispatch(push('/players'))
        })
    }
}
 