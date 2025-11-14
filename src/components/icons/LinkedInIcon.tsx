import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

// LinkedIn official logo as a filled icon, matching brand guidelines
const LinkedInIcon = ({ color = 'currentColor', size = 24, ...props }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.354V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.601 0 4.266 2.368 4.266 5.455v6.285zM5.337 7.433c-1.144 0-2.07-.926-2.07-2.07 0-1.143.926-2.07 2.07-2.07 1.143 0 2.07.927 2.07 2.07 0 1.144-.927 2.07-2.07 2.07zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.222 0z" fill={color}/>
  </Svg>
);

export default LinkedInIcon;
