import {push} from 'connected-react-router'
import {db} from '../../firebase/config'
import reportWebVitals from '../../reportWebVitals'

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
            db.collection('player').doc(item.id).collection('game').get()
            .then((snapshot:any) => {
                let total:number = 0; let hit:number = 0; let homerun:number = 0; let two:number = 0; let three:number = 0; let rbi:number = 0; let four:number = 0; let stolen:number = 0; let sacrifice:number = 0;
                snapshot.docs.map((doc:any) => {
                    const data = doc.data()
                    total = total + data.total;
                    hit = hit + data.hit;
                    two = two + data.two;
                    three = three + data.three;
                    homerun = homerun + data.homerun;
                    rbi = rbi + data.rbi;
                    four = four + data.four;
                    stolen = stolen + data.stolen;
                    sacrifice = sacrifice + data.sacrifice;
                })
                const data = {
                    total: total,
                    hit: hit,
                    average: hit/total,
                    two: two,
                    three: three,
                    homerun: homerun,
                    rbi: rbi,
                    slupping: ((hit - (two+three+homerun)) + (two*2) * (three*3) + (homerun*4))/(total + four + sacrifice),
                    stolen: stolen,
                    onBase: (hit+four)/(total+four+sacrifice)
                }
                db.collection('player').doc(item.id).set({'grade': data},{merge:true})
            })
        })
        dispatch(push('/'))
    }
}

export const deleteGrade = (players:any) => {
    return async (dispatch:any) => {
        players.map((player:any) => {
            db.collection('player').doc(player.id).set({grade: {}},{merge:true})
        })
    }
}