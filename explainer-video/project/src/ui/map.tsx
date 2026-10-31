import React from 'react';
import {C, FONT_BN} from '../theme';

/** Top-down mini map: river ribbon + East-West route. Coordinates local to w×h. */
export const RouteMap: React.FC<{
  w: number;
  h: number;
  draw?: number; // 0..1 route drawing from east (right) to west (left)
  split?: number; // 0..1 shows the Bowbazar gap in red
  gapFill?: number; // 0..1 closes the gap in green
  labels?: number; // opacity of station labels
  northSouth?: number; // 0..1 draws the 1984 north-south line
  pulse?: number;
}> = ({w, h, draw = 0, split = 0, gapFill = 0, labels = 1, northSouth = 0, pulse = 0}) => {
  const rx = w * 0.3;
  const river = `M ${rx - 40} -10 C ${rx + 60} ${h * 0.25}, ${rx - 70} ${h * 0.55}, ${rx + 20} ${h + 10}`;
  const y = h * 0.52;
  const xW = w * 0.1; // Howrah Maidan
  const xE = w * 0.92; // Sector V
  const xEsp = w * 0.42; // Esplanade
  const xSeal = w * 0.58; // Sealdah
  const L = xE - xW;
  const drawnFrom = xE - L * draw;
  const st = (x: number, name: string, below = false) => (
    <g opacity={labels}>
      <circle cx={x} cy={y} r={11} fill="#fff" stroke={C.ink} strokeWidth={4} />
      <text x={x} y={below ? y + 50 : y - 28} textAnchor="middle" fontFamily={FONT_BN} fontWeight={600} fontSize={26} fill={C.ink}>
        {name}
      </text>
    </g>
  );
  return (
    <svg width={w} height={h} style={{overflow: 'visible'}}>
      <rect width={w} height={h} rx={12} fill="#F4F1EA" />
      {new Array(18).fill(0).map((_, i) => (
        <rect key={i} x={(i * 97) % (w - 60) + 20} y={((i * 53) % (h - 60)) + 20} width={40 + (i % 3) * 14} height={26 + (i % 4) * 8} rx={4} fill="#E8E2D6" />
      ))}
      <path d={river} stroke="#BCD0E2" strokeWidth={70} fill="none" strokeLinecap="round" />
      <text x={rx - 150} y={50} fontFamily={FONT_BN} fontWeight={700} fontSize={28} fill={C.inkSoft}>
        হাওড়া
      </text>
      <text x={rx + 90} y={50} fontFamily={FONT_BN} fontWeight={700} fontSize={28} fill={C.inkSoft}>
        কলকাতা
      </text>
      <text x={rx - 18} y={h - 30} fontFamily={FONT_BN} fontWeight={600} fontSize={22} fill={C.blue} opacity={0.8}>
        গঙ্গা
      </text>
      {northSouth > 0 && (
        <line x1={w * 0.5} y1={20} x2={w * 0.5} y2={20 + (h - 40) * northSouth} stroke={C.blue} strokeWidth={12} strokeLinecap="round" />
      )}
      {draw > 0 && (
        <>
          <line x1={xE} y1={y} x2={drawnFrom} y2={y} stroke={C.green} strokeWidth={14} strokeLinecap="round" />
          {split > 0 && <line x1={xEsp + 14} y1={y} x2={xSeal - 14} y2={y} stroke="#F4F1EA" strokeWidth={18} opacity={split} />}
          {split > 0 && <line x1={xEsp + 14} y1={y} x2={xSeal - 14} y2={y} stroke={C.red} strokeWidth={6} strokeDasharray="8 8" opacity={split * (0.5 + 0.5 * pulse)} />}
          {gapFill > 0 && <line x1={xEsp} y1={y} x2={xEsp + (xSeal - xEsp) * gapFill} y2={y} stroke={C.green} strokeWidth={14} strokeLinecap="round" />}
          {draw > 0.98 && (
            <>
              {st(xW, 'হাওড়া ময়দান', true)}
              {st(xEsp, 'এসপ্ল্যানেড')}
              {st(xSeal, 'শিয়ালদা', true)}
              {st(xE, 'সেক্টর ফাইভ')}
            </>
          )}
        </>
      )}
    </svg>
  );
};
