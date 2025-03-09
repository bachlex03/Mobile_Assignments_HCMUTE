import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
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
        d="M2.69629 5.23628L4.81603 19.2713H19.108L21.3883 4.78662"
        stroke="black"
      />
      <Path
        d="M8.25876 6.65004C8.29167 7.72475 9.06153 9.87416 11.8777 9.87416C14.6939 9.87416 15.6611 7.68087 15.7927 6.58423C16.0011 7.69183 17.4048 9.8873 20.4315 9.80834M3.37646 10.0942C4.015 10.1514 5.46934 9.8998 6.1784 8.43593"
        stroke="black"
      />
      <Path d="M3.19238 2.74634L20.4395 20.3468" stroke="black" />
    </G>
  </Svg>
);
export default SVGComponent;
