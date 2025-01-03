import { Canvas, useFrame } from "@react-three/fiber";

import styles from "@/styles/canvas/BaseCanvas.module.scss";
import Sidebar from "./SidebarBeta";
import Lights from "./Lights";
import { OrbitControls, Environment } from "@react-three/drei";
const BaseCanvas = () => {
  return (
    <div className={styles.container}>
      <Canvas camera={{ position: [0, 5, 15] }}>
        <Sidebar />
        <Environment preset={"city"}></Environment>
        <OrbitControls />
        <Lights />
      </Canvas>
    </div>
  );
};

export default BaseCanvas;
