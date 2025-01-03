import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import BaseCanvasBeta from "@/components/canvas/BaseCanvasBeta";

export default function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <div>
      <style global jsx>
        {
          "html,body,body>div:first-child,div#__next,div#__next > div {height: 100%}"
        }
      </style>
      <BaseCanvasBeta />
    </div>
  );
}
