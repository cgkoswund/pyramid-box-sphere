import { Canvas, useFrame } from "@react-three/fiber";

import styles from "@/styles/canvas/BaseCanvas.module.scss";
import MeshesMorph from "./MeshesMorph";
import Lights from "./Lights";
import { OrbitControls, Environment } from "@react-three/drei";
const BaseCanvas = () => {
  return (
    <div className={styles.container}>
      <Canvas camera={{ position: [0, 2, 6] }}>
        <MeshesMorph />
        <Environment preset={"city"}></Environment>
        <OrbitControls />
        <Lights />
      </Canvas>
    </div>
  );
};

export default BaseCanvas;
