import React from 'react';
import {AbsoluteFill} from 'remotion';
import './fonts';
import {NightSky} from './bg/NightSky';
import {C, FONT_BN} from './theme';
import {bridgeSpace, G, HowrahBridge} from './hero/HowrahBridge';

/** 1280×720 thumbnail: dusk, two arms almost touching, a glowing gap, one big Bengali line, a red ring. */
export const Thumbnail: React.FC = () => {
  const B = {x: 960, y: 700, s: 4.6, vex: 1.45};
  const sp = bridgeSpace(B);
  const susp = 0.9;
  const tipM = G.tip * (1 - susp);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: 'scale(0.6667)', transformOrigin: '0 0'}}>
        <NightSky frame={40} />
        <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
          <HowrahBridge {...B} theme="night" parts={{suspended: susp, lights: 0.8}} cranes reflection />
          <ellipse cx={960} cy={sp.top(tipM) + 20} rx={60} ry={70} fill="url(#thumb-glow)" />
          <defs>
            <radialGradient id="thumb-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#FFF0C8" stopOpacity={0.95} />
              <stop offset="0.5" stopColor={C.amber} stopOpacity={0.5} />
              <stop offset="1" stopColor={C.amber} stopOpacity={0} />
            </radialGradient>
          </defs>
          <ellipse cx={960} cy={sp.top(tipM) + 20} rx={120} ry={110} fill="none" stroke={C.red} strokeWidth={14} />
          <path d={`M 1240 ${sp.top(tipM) - 230} Q 1180 ${sp.top(tipM) - 120} 1100 ${sp.top(tipM) - 60}`} stroke={C.red} strokeWidth={16} fill="none" strokeLinecap="round" />
          <path d={`M 1080 ${sp.top(tipM) - 40} l 48 -10 l -22 -40 Z`} fill={C.red} />
        </svg>
        <div style={{position: 'absolute', left: 0, top: 40, width: 1920, textAlign: 'center', fontFamily: FONT_BN, fontWeight: 700, fontSize: 150, lineHeight: 1.15, color: '#fff', textShadow: '0 8px 30px rgba(0,0,0,0.6)'}}>
          নদীতে একটাও <span style={{color: C.amber}}>খুঁটি নেই!</span>
        </div>
        <div style={{position: 'absolute', left: 0, bottom: 70, width: 1920, textAlign: 'center', fontFamily: FONT_BN, fontWeight: 700, fontSize: 68, color: '#fff', textShadow: '0 6px 24px rgba(0,0,0,0.7)'}}>
          হাওড়া ব্রিজ কীভাবে <span style={{color: C.amber}}>তৈরি</span> হলো
        </div>
      </div>
    </AbsoluteFill>
  );
};
