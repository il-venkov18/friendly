// src/shared/assets/icons/CloseIcon.tsx
import React from 'react';

type CloseIconProps = React.SVGProps<SVGSVGElement>

export const CloseIcon: React.FC<CloseIconProps> = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.875 3.125L3.125 12.875M3.125 3.125L12.875 12.875"
      stroke="currentColor" // Use currentColor to inherit fill from parent
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);