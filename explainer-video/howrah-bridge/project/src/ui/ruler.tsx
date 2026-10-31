import React from 'react';
import {C} from '../theme';

/**
 * Table-edge experiment. The ruler lies on a table and sticks out by `overhang` (0..1 of its length).
 * `tip` (0..1) rotates it off the edge and lets it fall; `book` (0..1) drops a book onto the inner end.
 * Draw inside a full-frame <svg>. The table edge (fulcrum) is at (edgeX, topY).
 */
export const RulerExperiment: React.FC<{edgeX?: number; topY?: number; len?: number; overhang: number; tip?: number; book?: number; frame: number; showFulcrum?: number}> = ({
  edgeX = 980,
  topY = 560,
  len = 760,
  overhang,
  tip = 0,
  book = 0,
  frame,
  showFulcrum = 1,
}) => {
  const rulerH = 26;
  const left = edgeX - len * (1 - overhang);
  // falling: rotate about the table edge, then drop
  const ang = Math.min(1, tip * 1.6) * 38;
  const drop = Math.max(0, tip - 0.55) * 900;
  const tableL = 160;
  const wood = '#C99B6A';
  const woodDark = '#A87B4F';
  const bookW = 290;
  const bookH = 96;
  const bookX = left + 30;
  const bookY = topY - rulerH - bookH - (1 - book) * 520;
  const squash = book > 0.95 ? 1 - Math.sin(Math.min(1, (book - 0.95) * 20) * Math.PI) * 0.06 : 1;
  return (
    <g>
      {/* table */}
      <ellipse cx={(tableL + edgeX) / 2} cy={topY + 330} rx={(edgeX - tableL) / 2 + 60} ry={18} fill="#000" opacity={0.06} />
      <rect x={tableL} y={topY} width={edgeX - tableL} height={42} fill={wood} />
      <rect x={tableL} y={topY + 42} width={edgeX - tableL} height={12} fill={woodDark} />
      <rect x={tableL + 40} y={topY + 54} width={30} height={280} fill={woodDark} />
      <rect x={edgeX - 70} y={topY + 54} width={30} height={280} fill={woodDark} />
      <line x1={tableL} y1={topY + 14} x2={edgeX} y2={topY + 14} stroke={woodDark} strokeWidth={2} opacity={0.5} />
      {/* fulcrum marker */}
      <path d={`M ${edgeX} ${topY + 2} L ${edgeX - 16} ${topY + 30} L ${edgeX + 16} ${topY + 30} Z`} fill={C.orange} opacity={showFulcrum} />
      {/* ruler */}
      <g transform={`translate(0 ${drop}) rotate(${ang} ${edgeX} ${topY})`}>
        <rect x={left} y={topY - rulerH} width={len} height={rulerH} rx={3} fill="#F2C94C" stroke="#C9A12E" strokeWidth={2} />
        {Array.from({length: Math.floor(len / 19)}, (_, i) => (
          <line key={i} x1={left + 10 + i * 19} y1={topY - rulerH} x2={left + 10 + i * 19} y2={topY - rulerH + (i % 5 === 0 ? 13 : 7)} stroke="#7A5E12" strokeWidth={1.6} />
        ))}
      </g>
      {/* book: side view of a closed hardcover (covers, page block, rounded spine) */}
      {book > 0 && (
        <g transform={`translate(${bookX} ${bookY + bookH * (1 - squash)}) scale(1 ${squash})`}>
          <rect x={0} y={0} width={bookW} height={bookH} rx={10} fill="#1F4F86" />
          <rect x={14} y={12} width={bookW - 14} height={bookH - 24} fill="#F4EEDD" />
          {Array.from({length: 9}, (_, i) => (
            <line key={i} x1={16} y1={18 + i * 7} x2={bookW - 2} y2={18 + i * 7} stroke="#D9CFB8" strokeWidth={1.6} />
          ))}
          <rect x={0} y={0} width={bookW} height={12} rx={5} fill="#2F6FB5" />
          <rect x={0} y={bookH - 12} width={bookW} height={12} rx={5} fill="#2F6FB5" />
          <path d={`M 0 6 Q -14 ${bookH / 2} 0 ${bookH - 6} L 16 ${bookH - 6} L 16 6 Z`} fill="#245A96" />
          <rect x={60} y={-20} width={120} height={8} rx={4} fill="#000" opacity={0} />
        </g>
      )}
      {/* motion lines while the ruler slides out */}
      {tip === 0 && (
        <g stroke={C.inkSoft} strokeWidth={3} strokeLinecap="round" opacity={0.25 + 0.2 * Math.sin(frame / 4)}>
          <line x1={left - 70} y1={topY - 30} x2={left - 30} y2={topY - 30} />
          <line x1={left - 90} y1={topY - 14} x2={left - 40} y2={topY - 14} />
        </g>
      )}
    </g>
  );
};
