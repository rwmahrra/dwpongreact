// // keep level and score count

// import React, {useEffect, useState} from 'react'
// import {Canvas, useFrame} from '@react-three/fiber'

// import Text from './3DComponents/Text';



// const mqtt = require('mqtt')
// const client = mqtt.connect("ws://127.0.0.1:9001");
// console.log("Creating UI connections");
// client.on('connect', function () {
 
//   client.subscribe('player1/score', function (err) {
//     if (!err) {
//       console.log("connection score")
//     }
//   })

//   client.subscribe('player2/score', function (err) {
//     if (!err) {
//       console.log("connection score2")
//     }
//   })

//   client.subscribe('game/level', function (err) {
//     if (!err) {
//       console.log("connection level")
//     }
//   })
// });


// export default function GameData(props) {

//     const [player1Score, setPlayer1Score] = useState(0);
//     const [player2Score, setPlayer2Score] = useState(0);
//     const [level, setLevel] = useState(0)

//     useEffect(() => {
        
//         client.on('message', function (topic, message) {
//             // message is Buffer
//             // console.log(topic)
//             // console.log(message.toString())
        
    
//             const data = JSON.parse(message.toString());
//             switch (topic) {
//             case "player1/score":
//                 let score1 = data.score;
//                 if (score1 != player1Score) {
//                     setPlayer1Score(score1)
//                 }
//                 break;
//             case "player2/score":
//                 let score2 = data.score;
//                 if (score2 != player2Score) {
//                     setPlayer2Score(score2)
//                 }
//                 break;
//             case "game/level":
//                 let levelNumber = data.level;
//                 if (levelNumber != level) {
//                     setLevel(levelNumber)
//                 }
//                 break;
//             }
//         })
//     },[])
    
  

//     return (
//         <group position={[0,0,-1]}>
//             <Text position={[-2,1,-6]} rotation={[-Math.PI/4, 0, 0]} text={"Level:" + level} color={"white"} />

//             {/* player score */}
//             {/* These are sized and rotated by best estimate, if we continue with this script, we should use lookat() or another method to create a billboard object */}
//             <Text position={[.5,.3,-4]} rotation={[-Math.PI/4, -Math.PI/16, 0]} text={"Score:" + player1Score} color={"deepskyblue"} />
//             {/* AI score */}
//             <Text position={[-4.8,1,-3.2]} rotation={[-Math.PI/4, Math.PI/16, 0]} text={"Score:" + player2Score} color={"red"} />
//         </group>
//     )
// }
