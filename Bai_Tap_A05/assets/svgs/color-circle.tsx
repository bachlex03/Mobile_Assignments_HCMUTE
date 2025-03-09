import * as React from "react";
import Svg, { Circle, SvgProps } from "react-native-svg";

type Props = SvgProps & {
  innerCircleColor?: string;
  outerCircleColor?: string;
};

const SVGComponent = (props: Props) => (
  <Svg
    width={23}
    height={24}
    viewBox="0 0 23 24"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={11.4121} cy={12.0305} r={8} fill={props.innerCircleColor} />
    <Circle
      opacity={0.5}
      cx={11.4119}
      cy={12.0306}
      r={10.6199}
      stroke={props.outerCircleColor}
    />
  </Svg>
);
export default SVGComponent;
