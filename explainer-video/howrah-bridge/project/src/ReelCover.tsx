import React from 'react';
import {AbsoluteFill} from 'remotion';
import './fonts';
import {NightSky} from './bg/NightSky';
import {C, FONT_BN} from './theme';
import {bridgeSpace, G, HowrahBridge} from './hero/HowrahBridge';

/**
 * 1080×1920 cover for Facebook/Instagram Reels. Everything important sits inside the centre 1080×1350
 * (4:5) area, because feeds crop the top and bottom of tall covers.
 */
export const ReelCover: React.FC = () => {
  const B = {x: 540, y: 1180, s: 5.2, vex: 1.5};
  const sp = bridgeSpace(B);
  const susp = 0.9;
  const tipM = G.tip * (1 - susp);
  const gy = sp.top(tipM) + 22;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {/* night sky, stretched to the tall frame */}
      <div style={{position: 'absolute', left: -420, top: 0, width: 1920, height: 1080, transform: 'scale(1.0, 1.25)', transformOrigin: '0 0'}}>
        <NightSky frame={40} />
      </div>
      <div style={{position: 'absolute', left: 0, top: 1350, width: 1080, height: 570, background: 'linear-gradient(180deg, #14132A 0%, #0C0C1C 100%)'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <defs>
          <radialGradient id="rc-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FFF0C8" stopOpacity={0.95} />
            <stop offset="0.5" stopColor={C.amber} stopOpacity={0.5} />
            <stop offset="1" stopColor={C.amber} stopOpacity={0} />
          </radialGradient>
        </defs>
        <HowrahBridge {...B} theme="night" parts={{suspended: susp, lights: 0.9}} cranes reflection />
        <ellipse cx={540} cy={gy} rx={70} ry={80} fill="url(#rc-glow)" />
        <ellipse cx={540} cy={gy} rx={135} ry={125} fill="none" stroke={C.red} strokeWidth={14} />
        <path d={`M 860 ${gy - 260} Q 800 ${gy - 150} 690 ${gy - 80}`} stroke={C.red} strokeWidth={16} fill="none" strokeLinecap="round" />
        <path d={`M 668 ${gy - 64} l 52 -6 l -20 -44 Z`} fill={C.red} />
      </svg>
      <div style={{position: 'absolute', left: 0, top: 330, width: 1080, textAlign: 'center', fontFamily: FONT_BN, fontWeight: 700, lineHeight: 1.12, textShadow: '0 8px 30px rgba(0,0,0,0.7)'}}>
        <div style={{fontSize: 132, color: '#fff'}}>নদীতে একটাও</div>
        <div style={{fontSize: 150, color: C.amber}}>খুঁটি নেই!</div>
      </div>
      <div style={{position: 'absolute', left: 0, top: 1460, width: 1080, textAlign: 'center', fontFamily: FONT_BN, fontWeight: 700, fontSize: 70, lineHeight: 1.25, color: '#fff', textShadow: '0 6px 24px rgba(0,0,0,0.8)'}}>
        হাওড়া ব্রিজ কীভাবে
        <br />
        <span style={{color: C.amber}}>তৈরি</span> হলো
      </div>
    </AbsoluteFill>
  );
};
