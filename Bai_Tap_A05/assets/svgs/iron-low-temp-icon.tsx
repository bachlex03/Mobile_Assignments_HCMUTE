import * as React from "react";
import Svg, { G, Path, Circle, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G opacity={0.5}>
      <Path
        d="M7.66501 6.05865H14.9541C16.4445 6.05865 19.597 6.94068 20.283 10.4688M20.283 10.4688C20.969 13.997 20.9772 17.0433 20.8955 18.1254H3.00977C3.13228 15.614 4.68812 10.5913 9.93134 10.5913C15.1746 10.5913 19.0171 10.5097 20.283 10.4688Z"
        stroke="black"
      />
      <Circle cx={12.7492} cy={14.2665} r={0.735026} fill="black" />
    </G>
  </Svg>
);
export default SVGComponent;
