import { Vector2 } from "three";
import * as React from "react";

export const TaperedCylinder = ({
  radiusTop,
  radiusBottom,
  height,
  bevelSegments,
  bevelAmount,
  segments = 32,
  children,
  ...props
}) => {
  const points = React.useMemo(() => {
    const pts = [];

    const bevelRadius = bevelAmount; // easier for me to think with :-)

    //acute angle specs
    const acuteBevelAngle = Math.atan2(
      height,
      Math.abs(radiusTop - radiusBottom)
    );
    const acuteCapBevelOffset = bevelRadius / Math.tan(acuteBevelAngle / 2);

    //obtuse angle specs
    const obtuseBevelAngle = Math.PI - acuteBevelAngle;
    const obtuseCapBevelOffset = bevelRadius / Math.tan(obtuseBevelAngle / 2);

    //share angle specs between top and bottom
    const topAngle =
      radiusTop > radiusBottom ? acuteBevelAngle : obtuseBevelAngle;
    const bottomAngle =
      radiusTop < radiusBottom ? acuteBevelAngle : obtuseBevelAngle;

    const adjustedRadiusTop =
      radiusTop > radiusBottom
        ? radiusTop - acuteCapBevelOffset
        : radiusTop - obtuseCapBevelOffset;
    const adjustedRadiusBottom =
      radiusTop < radiusBottom
        ? radiusBottom - acuteCapBevelOffset
        : radiusBottom - obtuseCapBevelOffset;

    console.log(
      "angles:",
      (topAngle * 180) / Math.PI,
      (bottomAngle * 180) / Math.PI,
      acuteCapBevelOffset
    );
    // Calculate the height of the bevel <>  ? why not just A = B
    const bevelHeight = bevelAmount * Math.sin(Math.PI / 2);

    // Bottom inside point
    pts.push(new Vector2(0, height * -0.5));

    // Bottom bevel
    for (let i = 0; i <= bevelSegments; i++) {
      const angle = 1.5 * Math.PI + topAngle * (i / bevelSegments); //1.5PI for 4th quadrant, anticlockwise
      pts.push(
        new Vector2(
          adjustedRadiusBottom + bevelRadius * Math.cos(angle),
          height * -0.5 + bevelHeight + bevelRadius * Math.sin(angle)
        )
        // new Vector2(
        //   radiusBottom - bevelAmount * (1 - Math.cos(angle)),
        //   height * -0.5 + bevelHeight - bevelAmount * Math.sin(angle)
        // )
      );
    }

    // Top bevel
    for (let i = 0; i <= bevelSegments; i++) {
      const angle =
        1.5 * Math.PI + topAngle + bottomAngle * (i / bevelSegments); //1.5PI for 4th quadrant, anticlockwise
      pts.push(
        new Vector2(
          adjustedRadiusTop + bevelRadius * Math.cos(angle),
          height * 0.5 - bevelHeight + bevelRadius * Math.sin(angle)
        )
        // new Vector2(
        //   radiusTop - bevelAmount * (1 - Math.cos(angle)),
        //   height * 0.5 - bevelHeight + bevelAmount * Math.sin(angle)
        // )
      );
    }

    // Top inside point
    pts.push(new Vector2(0, height * 0.5));

    return pts;
  }, [radiusTop, radiusBottom, height, bevelSegments, bevelAmount]);

  return (
    <mesh {...props}>
      <latheGeometry args={[points, segments]} />
      {children}
    </mesh>
  );
};

export { TaperedCylinder as default };
