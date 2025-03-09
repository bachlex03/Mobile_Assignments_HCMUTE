import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg
    width={125}
    height={11}
    viewBox="0 0 125 11"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M62.5775 10.1081L67.1271 5.55845H124.979V5.35166H67.1271L62.5775 0.85376L58.0796 5.35166H0.0205078V5.55845H58.0796L62.5775 10.1081ZM62.5775 1.16396L66.9202 5.45505L62.5775 9.79785L58.2347 5.45505L62.5775 1.16396Z"
      fill="#555555"
    />
  </Svg>
);
export default SVGComponent;
