import React from 'react';
import {AbsoluteFill} from 'remotion';
import './fonts';
import {C, FONT_BN, FONT_NUM} from './theme';
import {RiverTrainXS} from './scenes/p0';

/** 1280×720 YouTube thumbnail, drawn at 1920×1080 and scaled down. */
export const Thumbnail: React.FC = () => (
  <AbsoluteFill style={{background: C.skyTop, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: 'scale(0.6667)', transformOrigin: '0 0'}}>
      <RiverTrainXS trainX={980} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <defs>
          <radialGradient id="th-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={C.amber} stopOpacity={0.55} />
            <stop offset="1" stopColor={C.amber} stopOpacity={0} />
          </radialGradient>
        </defs>
        <ellipse cx={1260} cy={760} rx={420} ry={150} fill="url(#th-glow)" />
        <path d="M 760 560 C 860 600, 900 650, 960 700" stroke={C.red} strokeWidth={22} fill="none" strokeLinecap="round" />
        <path d="M 920 690 L 990 735 L 1000 655 Z" fill={C.red} />
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 70,
          top: 40,
          fontFamily: FONT_BN,
          fontWeight: 700,
          fontSize: 190,
          lineHeight: 1.08,
          color: '#fff',
          textShadow: '0 8px 30px rgba(0,0,0,0.6)',
        }}
      >
        গঙ্গার নিচে
        <br />
        <span style={{color: C.amber}}>মেট্রো!</span>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 80,
          top: 70,
          padding: '18px 36px',
          borderRadius: 24,
          background: C.red,
          color: '#fff',
          fontFamily: FONT_NUM,
          fontWeight: 600,
          fontSize: 92,
          transform: 'rotate(4deg)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
        }}
      >
        30m ↓
      </div>
    </div>
  </AbsoluteFill>
);
