import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={12.7734} cy={12.0305} r={11.5} stroke="#DEDEDE" />
    {/* <Path
      d="M10.9656 15.2139V8.21387H11.8756V14.6639H15.4856V15.2139H10.9656Z"
      fill="#000"
    /> */}
  </Svg>
);
export default SVGComponent;
