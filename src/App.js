import './App.css';

import React, {useState, Suspense} from 'react'
import { Canvas } from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei"; // can be commented in for debugging

import PlayerPuck from "./3DModels/PlayerPuck.js";
import AIPuck from './3DModels/AIPuck'
import Ball from './3DModels/Ball'
import Stage from "./3DModels/Stage.js"
import PlayArea from "./3DModels/PlayArea.js"

import TransparentPlane from './3DComponents/TransparentPlane'
import Text from './3DComponents/Text';

const mqtt = require('mqtt')



function App() {

  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAIScore] = useState(0);
  const [level, setLevel] = useState(1)

  const [playerPosition, setPlayerPosition] = useState(0);
  const [aiPosition, setAIPosition] = useState(0);
  const [puckPosition, setPuckPosition] = useState({x:0,y:0});

  const client = mqtt.connect("wss://test.mosquitto.org:8081");

  client.on('connect', function () {
    client.subscribe('presence', function (err) {
      if (!err) {
        client.publish('presence', 'Hello mqtt')
      }
    })
  })

  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    client.end()
  })

  // we need to update paddle and puck position
  // topic - example
  // position/puck - {x: 95, y: 56} - setPuckPosition(data)
  // position/paddles - {positions: [76, 88]} - setPlayerPosition(data.positions[0]); setAIPosition(data.positions[1])
  // score - {scores: [2,3]} - setPlayerScore(data.scores[0]); setAIScore(data.scores[1])
  // game/level - {level: 5} - setLevel(data.level)


  return (
    <Canvas className='App' camera={{position: [0,7,3]}}>
      {/* Add this line back into enable camera controls */}
      <OrbitControls></OrbitControls>

      <ambientLight intensity={0.3}></ambientLight>
      <spotLight position={[0,15,0]} angle={0.4} intensity={0.3} />
      <spotLight position={[0,15,0]} angle={0.3} intensity={0.2} />

      <TransparentPlane position={[0,-1,0]} size={[100,100,100]} color={"black"} opacity={0.3} />
      <TransparentPlane position={[0,-0.6,0]} size={[100,100,100]} color={"black"} opacity={0.3} />

      <Text position={[-2,1,-6]} rotation={[-Math.PI/4, 0, 0]} text={"Level:" + level} color={"white"} />

      {/* player score */}
      {/* These are sized and rotated by best estimate, if we continue with this script, we should use lookat() or another method to create a billboard object */}
      <Text position={[.5,.3,-4]} rotation={[-Math.PI/4, -Math.PI/16, 0]} text={"Score:" + playerScore} color={"deepskyblue"} />
      {/* AI score */}
      <Text position={[-4.8,1,-3.2]} rotation={[-Math.PI/4, Math.PI/16, 0]} text={"Score:" + aiScore} color={"red"} />
      
      {/* Load our 3d files here */}
      <Suspense fallback={null} >
        <PlayArea />
        <TransparentPlane position={[0,-0.95,0]} size={[9.2,8,1]} color={"blue"} opacity={0.5} />
        <Stage position={[-11.25, 0, 0]}/> 
        <Stage position={[0, 0, 0]}/> 
        <Stage position={[11.25, 0, 0]}/> 
        <Stage position={[-11.25, 0, -27]}/> 
        <Stage position={[0, 0, -27]}/> 
        <Stage position={[11.25, 0, -27]}/> 
        <Stage position={[-11.25, 0, -13.5]}/> 
        <Stage position={[0, 0, -13.5]}/> 
        <Stage position={[11.25, 0, -13.5]}/> 
        <Stage position={[-11.25, 0, 13.5]}/> 
        <Stage position={[0, 0, 13.5]}/> 
        <Stage position={[11.25, 0, 13.5]}/> 

        <Ball position={[puckPosition.x,0,puckPosition.y]} />
        <PlayerPuck position={[playerPosition,0,0]} />
        <AIPuck position={[aiPosition, 0,0]} />
      
      </Suspense>
    </Canvas>
  );
}

export default App;
