import React from "react";
import { colors } from "../theme";

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

/** Ash: a shallow bowl with three curls of smoke. */
export const AshIcon: React.FC<IconProps> = ({ size = 160, color, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="-60 -60 120 120" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M -40 20 Q 0 50 40 20 Z" />
    <path d="M -46 20 L 46 20" />
    <path d="M -18 10 C -26 -6 -10 -14 -18 -30 C -24 -42 -14 -48 -16 -54" />
    <path d="M 0 8 C -8 -10 8 -18 0 -36" />
    <path d="M 18 10 C 26 -6 10 -14 18 -30" />
  </svg>
);

/** Snake: a coiled serpent with raised hood (simple line drawing). */
export const SnakeIcon: React.FC<IconProps> = ({ size = 160, color, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="-60 -60 120 120" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx={0} cy={30} rx={40} ry={12} />
    <path d="M -30 26 C -40 10 30 6 26 -6 C 22 -18 -18 -14 -10 -30" />
    <path d="M -10 -30 C -20 -40 -16 -54 0 -54 C 16 -54 20 -40 10 -30 C 6 -26 -6 -26 -10 -30 Z" />
    <circle cx={-4} cy={-44} r={1.5} fill={color} />
    <circle cx={4} cy={-44} r={1.5} fill={color} />
  </svg>
);

/** Cremation ground: crossed logs with a flame. */
export const PyreIcon: React.FC<IconProps> = ({ size = 160, color, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="-60 -60 120 120" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M -46 42 L 40 18" />
    <path d="M -40 18 L 46 42" />
    <path d="M -44 30 L 44 30" />
    <path d="M 0 22 C -22 6 -16 -20 -2 -44 C 0 -26 18 -22 16 -4 C 22 -14 22 -22 20 -26 C 30 -8 22 14 0 22 Z" />
  </svg>
);

/** Invitation: folded letter with a wax seal. */
export const InviteIcon: React.FC<IconProps & { seal?: string }> = ({ size = 60, color, strokeWidth = 3, seal }) => (
  <svg width={size} height={size * 0.72} viewBox="-50 -36 100 72" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round">
    <rect x={-46} y={-32} width={92} height={64} rx={6} fill={colors.ivory} />
    <path d="M -46 -32 L 0 6 L 46 -32" />
    <circle cx={0} cy={8} r={9} fill={seal ?? color} stroke="none" />
  </svg>
);
