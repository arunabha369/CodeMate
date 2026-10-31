import React from "react";

/** Simple line icons (original drawings). Size is the bounding box in px. */
type IconProps = { size?: number; color: string; strokeWidth?: number };

export const LotusIcon: React.FC<IconProps> = ({ size = 120, color, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="-60 -60 120 120" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round">
    <path d="M 0 30 C -14 6 -12 -22 0 -44 C 12 -22 14 6 0 30 Z" />
    <path d="M 0 30 C -26 18 -38 -6 -34 -28 C -14 -18 -4 4 0 30 Z" />
    <path d="M 0 30 C 26 18 38 -6 34 -28 C 14 -18 4 4 0 30 Z" />
    <path d="M 0 30 C -34 30 -54 14 -56 -4 C -36 -4 -14 10 0 30 Z" />
    <path d="M 0 30 C 34 30 54 14 56 -4 C 36 -4 14 10 0 30 Z" />
    <path d="M -40 40 Q 0 30 40 40" />
  </svg>
);

export const TrishulIcon: React.FC<IconProps> = ({ size = 120, color, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="-60 -60 120 120" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <line x1={0} y1={-50} x2={0} y2={56} />
    <path d="M 0 -50 L -6 -38 M 0 -50 L 6 -38" />
    <path d="M -30 -40 C -32 -14 -20 -2 0 -2 C 20 -2 32 -14 30 -40" />
    <path d="M -30 -40 L -36 -30 M 30 -40 L 36 -30" />
    <rect x={-7} y={8} width={14} height={10} rx={3} />
    <path d="M -10 22 Q 0 30 10 22" />
  </svg>
);

export const ConchIcon: React.FC<IconProps> = ({ size = 120, color, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="-60 -60 120 120" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M -40 10 C -44 -20 -16 -42 12 -38 C 36 -34 48 -12 40 8 C 34 24 14 36 -6 38 L -30 44 L -24 28 C -34 24 -38 18 -40 10 Z" />
    <path d="M -14 -24 C 4 -28 22 -18 24 -2 C 26 12 10 22 -6 20" />
    <path d="M -2 -12 C 8 -12 12 -2 6 6" />
  </svg>
);

export const TempleIcon: React.FC<IconProps> = ({ size = 60, color, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="-30 -36 60 66" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round">
    <path d="M -18 26 L -18 0 C -18 -14 -8 -24 0 -30 C 8 -24 18 -14 18 0 L 18 26 Z" />
    <line x1={0} y1={-30} x2={0} y2={-36} />
    <path d="M -24 26 L 24 26" />
    <path d="M -6 26 L -6 12 Q 0 6 6 12 L 6 26" />
  </svg>
);
