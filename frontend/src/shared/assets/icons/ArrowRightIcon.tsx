import React from 'react';

type RightArrowIconProps = React.SVGProps<SVGSVGElement>

export const ArrowRightIcon: React.FC<RightArrowIconProps> = (props) => (
  <svg
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // Это позволяет передавать стандартные SVG-пропсы, такие как className, style, onClick и т.д.
  >
    <path
      d="M1 1L6 6L1 11"
      stroke="#007AFF" // По умолчанию цвет синий, как в вашем SVG
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);