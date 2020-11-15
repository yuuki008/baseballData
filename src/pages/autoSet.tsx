import {db} from '../firebase/config'
import React from 'react'

const autoSet = () => {
    return (
        <div>
            
        </div>
    )
}

export default autoSet

// const result = [
//     {name: "単打",en: 'ヒット'}, 
//     {name: '内野安打', en: '内野安打'},
//     {name: "2塁打", en: 'ツーベースヒット'}, 
//     {name:"3塁打", en: 'スリーベースヒット'}, 
//     {name: '本塁打',en:'ホームラン'}, 
//     {name: '犠打',en: '犠打'},
//     {name: '内野ゴロ',en: '内野ゴロ'} ,
//     {name: '内野フライ', en: '内野フライ'},
//     {name: '外野フライ', en: '外野フライ'},
//     {name: '三振', en: 'ストライクアウト'},
//     {name: '四死球', en: '四死球'}
// ]

// const dataSet = () => {
//     result.map((item:any, index:number) => {
//         const resultRef = db.collection('batterResult').doc()
//         const resultId = resultRef.id
//         db.collection('batterResult').doc(resultId).set({
//             id: resultId, 
//             name: item.name, 
//             en: item.en, 
//             index: index + 1
//         })
//     }) 
// }

// const detailResult = [
//     {name: "左前安", id: "JvmtB9zZOInBBSMJkNZz", en: "レフト前ヒット", direction: 7},
//     {name: "中前安", id: "JvmtB9zZOInBBSMJkNZz", en: "センター前ヒット", direction: 8},
//     {name: "右前安", id: "JvmtB9zZOInBBSMJkNZz", en: "ライト前ヒット", direction: 9},
//     {name: "バントヒット", id: "Kr1Dn48K0HYk0eh45tDu", en: "バントヒット", direction: 0},
//     {name: "投安", id: "Kr1Dn48K0HYk0eh45tDu", en: "投手安打", direction: 1},
//     {name: "捕手", id: "Kr1Dn48K0HYk0eh45tDu", en: "捕手安打", direction: 2},
//     {name: "一安", id: "Kr1Dn48K0HYk0eh45tDu", en: "1安", direction: 3},
//     {name: "二安", id: "Kr1Dn48K0HYk0eh45tDu", en: "2安", direction: 4},
//     {name: "三安", id: "Kr1Dn48K0HYk0eh45tDu", en: "3安", direction: 5},
//     {name: "遊安", id: "Kr1Dn48K0HYk0eh45tDu", en: "遊安", direction: 6},
//     {name: "左二", id: "A5KwqLmbUBdQnrYKkyy3", en: "左2", direction: 7},
//     {name: "中二", id: "A5KwqLmbUBdQnrYKkyy3", en: "中2", direction: 8},
//     {name: "右二", id: "A5KwqLmbUBdQnrYKkyy3", en: "右2", direction: 9},
//     {name: "左中二", id: "A5KwqLmbUBdQnrYKkyy3", en: "左中2", direction: 7.5},
//     {name: "右中二", id: "A5KwqLmbUBdQnrYKkyy3", en: "右中2", direction: 8.5},
//     {name: "左三", id: "H3JdkiGlf1umY4VajGAM", en: "左3", direction: 7},
//     {name: "中三", id: "H3JdkiGlf1umY4VajGAM", en: "中3", direction: 8},
//     {name: "右三", id: "H3JdkiGlf1umY4VajGAM", en: "右3", direction: 9},
//     {name: "左中三", id: "H3JdkiGlf1umY4VajGAM", en: "左中3", direction: 7.5},
//     {name: "右中三", id: "H3JdkiGlf1umY4VajGAM", en: "右中3", direction: 8.5},
//     {name: "左本", id: "tkuAX6LcfitMaDtFFqN1", en: "レフトホームラン", direction: 7},
//     {name: "中本", id: "tkuAX6LcfitMaDtFFqN1", en: "センターホームラン", direction: 8},
//     {name: "右本", id: "tkuAX6LcfitMaDtFFqN1", en: "ライトホームラン", direction: 9},
//     {name: "左中本", id: "tkuAX6LcfitMaDtFFqN1", en: "左中間ホームラン", direction: 7.5},
//     {name: "右中本", id: "tkuAX6LcfitMaDtFFqN1", en: "右中間ホームラン", direction: 8.5},
//     {name: "送りバント", id: "6myXQTW71QwYi9Z4nnVZ", en: "送りバント", direction: 9.5},
//     {name: "犠飛", id: "6myXQTW71QwYi9Z4nnVZ", en: "犠牲フライ", direction: 0},
//     {name: "投ゴロ", id: "3iuuNOuIPabxa6gj0u4Y", en: "ピッチャーゴロ", direction: 1},
//     {name: "捕ゴロ", id: "3iuuNOuIPabxa6gj0u4Y", en: "キャッチャーゴロ", direction: 2},
//     {name: "一ゴロ", id: "3iuuNOuIPabxa6gj0u4Y", en: "ファーストゴロ", direction: 3},
//     {name: "二ゴロ", id: "3iuuNOuIPabxa6gj0u4Y", en: "セカンドゴロ", direction: 4},
//     {name: "三ゴロ", id: "3iuuNOuIPabxa6gj0u4Y", en: "サードゴロ", direction: 5},
//     {name: "遊ゴロ", id: "3iuuNOuIPabxa6gj0u4Y", en: "ショートゴロ", direction: 6},
//     {name: "投飛", id: "jXSXqicBk16G82oV5gZ9", en: "ピッチャーフライ", direction: 1},
//     {name: "捕飛", id: "jXSXqicBk16G82oV5gZ9", en: "キャッチャーフライ", direction: 2},
//     {name: "一飛", id: "jXSXqicBk16G82oV5gZ9", en: "ファーストフライ", direction: 3},
//     {name: "二飛", id: "jXSXqicBk16G82oV5gZ9", en: "セカンドフライ", direction: 4},
//     {name: "三飛", id: "jXSXqicBk16G82oV5gZ9", en: "サードフライ", direction: 5},
//     {name: "遊フライ", id: "jXSXqicBk16G82oV5gZ9", en: "ショートフライ", direction: 6},
//     {name: "左飛", id: "B4aHpCx33YMWa1s0LD1i", en: "レフトフライ", direction: 7},
//     {name: "中飛", id: "B4aHpCx33YMWa1s0LD1i", en: "センターフライ", direction: 8},
//     {name: "右飛", id: "B4aHpCx33YMWa1s0LD1i", en: "ライトフライ", direction: 9},
//     {name: "見逃し", id: "mVckFBuaXTliAG7flOZ1", en: "見逃し三振", direction: -1},
//     {name: "空振り", id: "mVckFBuaXTliAG7flOZ1", en: "空振り三振", direction: -1},
//     {name: "死球", id: "8TRKRJY2jCxyWhD6UUdr", en: "デッドボール", direction: 0},
//     {name: "四球", id: "8TRKRJY2jCxyWhD6UUdr", en: "フォアボール", direction: 0},
// ]

// const detailSet = () => {
//     detailResult.map((result:any, index:number) => {
//         const data:any = {
//             index: index + 1,
//             name: result.name,
//             en: result.en,
//             resultId: result.id,
//             direction: result.direction,
//         }
//         const ref = db.collection('resultDetailBat').doc()
//         const batId = ref.id 
//         data.id = batId
//         db.collection('resultDetailBat').doc(batId).set(data)
//     })
// }

