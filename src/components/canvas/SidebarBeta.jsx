import useAnimationStore from "@/stores/useAnimationStore";
import gsap from "gsap";
import { useEffect } from "react";
import { useControls, button, folder } from "leva";

import { BeveledCylinder, TaperedCylinder } from "roundedcylinder";
import * as RDX from "roundedcylinder";

const Sidebar = () => {
  const { bevelAmount } = useControls("Bevel Radius", {
    bevelAmount: {
      label: "",
      value: 0.03,
      max: 1,
      min: 0.0001,
      step: 0.0001,
    },
  });
  const { cornerType } = useControls("Quarter Bevel?", {
    cornerType: {
      label: "",
      value: true,
    },
  });
  const { bevelSegments } = useControls("Bevel Segments", {
    bevelSegments: {
      label: "",
      value: 5,
      max: 64,
      min: 3,
      step: 1,
    },
  });
  const { topRadius } = useControls("Cylinder Top Radius", {
    topRadius: {
      label: "",
      value: 5,
      max: 10,
      min: 0.1,
      step: 0.001,
    },
  });
  const { bottomRadius } = useControls("Cylinder Base Radius", {
    bottomRadius: {
      label: "",
      value: 5,
      max: 10,
      min: 0.1,
      step: 0.001,
    },
  });
  const { height } = useControls("Height", {
    height: {
      label: "",
      value: 5,
      max: 10,
      min: 0.1,
      step: 0.001,
    },
  });
  const { radialSegments } = useControls("Radial Segments", {
    radialSegments: {
      label: "",
      value: 16,
      max: 64,
      min: 3,
      step: 1,
    },
  });
  const { isWireframe } = useControls("Wireframe?", {
    isWireframe: {
      label: "",
      value: true,
    },
  });

  console.log(
    "side values: ",
    cornerType,
    TaperedCylinder,
    BeveledCylinder,
    topRadius,
    bottomRadius,
    radialSegments,
    height,
    RDX
  );

  return (
    <>
      {cornerType ? (
        <BeveledCylinder
          radiusTop={topRadius}
          radiusBottom={bottomRadius}
          height={height}
          bevelSegments={bevelSegments}
          bevelAmount={bevelAmount}
          segments={radialSegments}
        >
          <meshNormalMaterial wireframe={isWireframe} />
        </BeveledCylinder>
      ) : (
        <TaperedCylinder
          radiusTop={topRadius}
          radiusBottom={bottomRadius}
          height={height}
          bevelSegments={bevelSegments}
          bevelAmount={bevelAmount}
          segments={radialSegments}
        >
          <meshNormalMaterial wireframe={isWireframe} />
        </TaperedCylinder>
      )}
    </>
  );
};

export default Sidebar;
