import useAnimationStore from "@/stores/useAnimationStore";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useControls, button, folder } from "leva";

import * as THREE from "three";

const Sidebar = () => {
  const morphFactor = useRef({ pyramid: 0, cube: 1, sphere: 0 });

  //#region leve ui controls
  const { nextShape } = useControls("Next Shape", {
    nextShape: {
      label: "",
      value: "Cube",
      options: {
        Pyramid: "Pyramid",
        Cube: "Cube",
        Sphere: "Sphere",
      },
    },
  });
  const { meshSegments } = useControls("Mesh Segments", {
    meshSegments: {
      label: "",
      value: 5,
      max: 64,
      min: 3,
      step: 1,
    },
  });
  const { speed } = useControls("Animation Speed", {
    speed: {
      label: "",
      value: 5,
      max: 10,
      min: 0.5,
      step: 0.001,
    },
  });
  const { wireframe } = useControls("Wireframe?", {
    wireframe: {
      label: "",
      value: false,
    },
  });

  //#endregion

  const [morphGeometry, setMorphGeometry] = useState(
    new THREE.BoxGeometry(2, 2, 2, meshSegments, meshSegments, meshSegments)
  );

  useEffect(() => {
    morphToNextShape();
  }, [meshSegments]);

  const morphToNextShape = () => {
    //create new box for reference coords
    const tempGeometry = new THREE.BoxGeometry(
      2,
      2,
      2,
      meshSegments,
      meshSegments,
      meshSegments
    );

    //loop through points
    const positionsArray = tempGeometry.attributes.position.array;

    for (let i = 0; i < positionsArray.length / 3; i++) {
      const i1 = 3 * i,
        i2 = 3 * i + 1,
        i3 = 3 * i + 2;

      //easy readable x,y,z
      const x = positionsArray[i1],
        y = positionsArray[i2],
        z = positionsArray[i3];

      //cube shape (default)
      const cubeVector = new THREE.Vector3(x, y, z);

      //pyramid shape
      const pyramidVector = new THREE.Vector3(
        0.65 * (2 / 2 - y) * x,
        y,
        0.65 * (2 / 2 - y) * z
      );

      //sphere shape
      const sphereVector = new THREE.Vector3()
        .copy(cubeVector)
        .normalize()
        .multiplyScalar(1);

      //blend shapes for intermediate morph points
      const finalVector = cubeVector
        .multiplyScalar(morphFactor.current.cube)
        .clone()
        .add(pyramidVector.multiplyScalar(morphFactor.current.pyramid))
        .add(sphereVector.multiplyScalar(morphFactor.current.sphere));

      //edit the original geometry to take in morphed shape
      positionsArray[i1] = finalVector.x;
      positionsArray[i2] = finalVector.y;
      positionsArray[i3] = finalVector.z;
    }
    tempGeometry.computeVertexNormals();
    tempGeometry.needsUpdate = true;

    // re-render geometry on screen
    setMorphGeometry(tempGeometry);
  };

  useEffect(() => {
    //convert speed to time for gsap
    const duration = 2 / speed;

    console.log("morphing to ", nextShape);
    switch (nextShape) {
      case "Pyramid":
        gsap.to(morphFactor.current, {
          pyramid: 1,
          cube: 0,
          sphere: 0,
          duration: duration,
          onUpdate: () => {
            morphToNextShape();
          },
        });
        break;

      case "Cube":
        gsap.to(morphFactor.current, {
          pyramid: 0,
          cube: 1,
          sphere: 0,
          duration: duration,
          onUpdate: () => {
            morphToNextShape();
          },
        });
        morphToNextShape();
        break;

      case "Sphere":
        gsap.to(morphFactor.current, {
          pyramid: 0,
          cube: 0,
          sphere: 1,
          duration: duration,
          onUpdate: () => {
            morphToNextShape();
          },
        });
        morphToNextShape();
        break;

      default:
        break;
    }
    //remake geo with gsap
  }, [nextShape]);

  return (
    <>
      <mesh>
        <primitive attach={"geometry"} object={morphGeometry} />
        <meshNormalMaterial wireframe={wireframe} />
      </mesh>
    </>
  );
};

export default Sidebar;
