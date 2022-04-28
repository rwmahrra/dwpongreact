import './App.css';

import React, {useState, Suspense, useEffect} from 'react'
import { Canvas } from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei"; // can be commented in for debugging

import PongGame from './PongGame';
import GameData from './GameData';
import Stage from "./3DModels/Stage.js"
import PlayArea from "./3DModels/PlayArea.js"

import TransparentPlane from './3DComponents/TransparentPlane'



function App() {

  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAIScore] = useState(0);
  const [level, setLevel] = useState(1)

  const [playerPosition, setPlayerPosition] = useState(0);
  const [aiPosition, setAIPosition] = useState(0);
  const [puckPosition, setPuckPosition] = useState({x:0,y:0});






  return (
    <Canvas className='App' mode="concurrent" camera={{position: [0,7,3.5]}}>
      {/* Add this line back into enable camera controls */}
      <OrbitControls></OrbitControls>

      <ambientLight intensity={0.3}></ambientLight>
      <spotLight position={[0,15,0]} angle={0.4} intensity={0.3} />
      <spotLight position={[0,15,0]} angle={0.3} intensity={0.2} />

      <TransparentPlane position={[0,-1,0]} size={[100,100,100]} color={"black"} opacity={0.3} />
      <TransparentPlane position={[0,-0.6,0]} size={[100,100,100]} color={"black"} opacity={0.3} />
      <GameData />
      {/* Load our 3d files here */}
      <Suspense fallback={null} >
        <PlayArea position={[0,.6,0]} />
       <TransparentPlane position={[0,-0.4,0]} size={[9.2,8,1]} color={"blue"} opacity={0.5} />
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

        <PongGame />
      
      </Suspense>
    </Canvas>
  );
}

export default App;
