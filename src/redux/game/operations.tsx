import {push} from 'connected-react-router'
import {db} from '../../firebase/config'

const gameRef = db.collection('game')
const playerRef = db.collection('player')

export const upGame = (team:any, type:any, opponent:string, date:any, score:number, opponentScore:number, comment:string, list:any) => {
    return async (dispatch:any) => {
        const ref = gameRef.doc()
        const gameId = ref.id
        gameRef.doc(gameId).set({
            id: gameId,
            team: team,
            type: type,
            opponent: opponent,
            date: date,
            score: score,
            opponentScore: opponentScore,
            comment: comment,
            list: list
        })
        list.map((item:any) => {
            playerRef.doc(item.id).collection('game').doc(gameId).set(item)
            db.collection('player').doc(item.playerId).collection('game').get()
            .then((snapshot:any) => {
                let total:any = 0; let hit:any = 0; let homerun:any = 0; let two:any = 0; let three:any = 0; let four:any = 0; let stolen:any = 0; let sacrifice:any = 0;
                snapshot.docs.map((doc:any) => {
                    const data = doc.data()
                    total = total + data.total;
                    hit = hit + data.hit;
                    two = two + data.two;
                    three = three + data.three;
                    homerun = homerun + data.homerun;
                    four = four + data.four;
                    stolen = stolen + data.stolen;
                    sacrifice = sacrifice + data.sacrifice;
                })
                const data = {
                    total: total,
                    hit: hit,
                    average: (hit/total).toFixed(3),
                    two: two,
                    three: three,
                    homerun: homerun,
                    slupping: (((hit - (two+three+homerun)) + (two*2) + (three*3) + (homerun*4)/total)/100).toFixed(3).slice(1),
                    stolen: stolen,
                    onBase: ((hit+four)/(total+four+sacrifice)).toFixed(3).slice(1),
                    ops: (((hit - (two+three+homerun)) + (two*2) + (three*3) + (homerun*4)/total)/100) + ((hit+four)/(total+four+sacrifice)),
                }
                db.collection('player').doc(item.playerId).set({'grade': data},{merge:true})
            })
        })
        dispatch(push('/'))
    }
}