import * as React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";
const MailIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Rect x={4} y={6} width={16} height={12} rx={2} stroke="#222222" />
    <Path
      d="M4 9L11.1056 12.5528C11.6686 12.8343 12.3314 12.8343 12.8944 12.5528L20 9"
      stroke="#222222"
    />
  </Svg>
);
export default MailIcon;

