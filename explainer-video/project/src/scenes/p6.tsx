import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {SceneProps} from '../kit';
import {C, FONT_BN} from '../theme';
import {clamp, prog} from '../anim';
import {Chip, Head} from '../ui/text';
import {Building, DimArrow, Layer, Person, Specks, Train} from '../ui/svg';

export const S40: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const G = 300;
  const depth = cue('তেত্রিশ', -10);
  const flip = cue('এগারো তলা', -10);
  const grow = prog(f, flip, 40);
  const floors = 11;
  const fh = 50;
  return (
    <>
      <Layer>
        <rect x={0} y={G} width={1920} height={780} fill={C.ground} />
        <rect x={0} y={G + 330} width={1920} height={450} fill={C.groundDeep} />
        <Specks x={0} y={G} w={1920} h={780} n={150} frame={f} color={C.mudDark} opacity={0.18} />
        <rect x={0} y={G - 4} width={1920} height={8} fill="#B9A281" />
        {[180, 260, 640, 730, 1650, 1740].map((x, i) => (
          <Building key={x} x={x} y={G} w={70} floors={2 + (i % 3)} floorH={34} color="#8A8597" seed={i + 3} />
        ))}
        <rect x={560} y={G} width={90} height={480} fill="#CDBB9A" stroke="#A68E6A" strokeWidth={2} />
        {new Array(7).fill(0).map((_, i) => (
          <line key={i} x1={570} y1={G + 20 + i * 64} x2={640} y2={G + 60 + i * 64} stroke="#8E909A" strokeWidth={4} />
        ))}
        <rect x={460} y={G + 470} width={720} height={160} rx={10} fill="#3B3950" />
        <rect x={480} y={G + 575} width={680} height={14} fill={C.amber} opacity={0.6} />
        <Train x={520} y={G + 535} len={600} h={60} cars={4} streak={false} />
        <DimArrow x1={400} y1={G} x2={400} y2={G + 630} at={depth} />
        <clipPath id="s40-grow">
          <rect x={1250} y={G} width={400} height={floors * fh * grow + 2} />
        </clipPath>
        <g opacity={grow > 0 ? 1 : 0} clipPath="url(#s40-grow)">
          <g transform={`translate(0 ${2 * G}) scale(1 -1)`}>
            <Building x={1300} y={G} w={240} floors={floors} floorH={fh} color="#6E6A7E" lit={0.5} seed={21} />
          </g>
        </g>
      </Layer>
      <Head text="দেশের সবচেয়ে [[গভীর]] স্টেশন" at={4} world={world} y={60} />
      <Chip at={depth + 10} x={400} y={G + 315} text={<span style={{fontFamily: 'Oswald'}}>~33 মিটার</span>} tone="orange" size={32} />
      <Chip at={flip + 30} x={1420} y={G + floors * fh + 60} text="~11 তলা বাড়ি" size={30} />
      <Chip at={cue('হাওড়ায়')} x={1000} y={G + 430} text="হাওড়া স্টেশন" tone="dark" world="night" size={26} />
    </>
  );
};

export const S41: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const segs: [number, number, number, number][] = [
    [180, 230, 760, 470],
    [840, 470, 1320, 690],
    [1400, 690, 1760, 860],
  ];
  const ppl = [0, 0.18, 0.36, 0.54, 0.72, 0.9];
  return (
    <>
      <Layer>
        <rect width={1920} height={1080} fill="#0E0D1C" opacity={prog(f, 0, 12) * 0.86} />
        {new Array(12).fill(0).map((_, i) => (
          <line key={i} x1={i * 180} y1={0} x2={i * 180 - 300} y2={1080} stroke="#1E1B36" strokeWidth={30} opacity={0.6} />
        ))}
        {segs.map(([x1, y1, x2, y2], i) => (
          <g key={i}>
            <line x1={x1} y1={y1 + 30} x2={x2} y2={y2 + 30} stroke="#3A3658" strokeWidth={46} strokeLinecap="round" />
            <line x1={x1} y1={y1 + 30} x2={x2} y2={y2 + 30} stroke="#5A5680" strokeWidth={36} strokeDasharray="8 10" strokeDashoffset={f * 2} />
            <line x1={x1} y1={y1 - 20} x2={x2} y2={y2 - 20} stroke={C.amber} strokeWidth={4} opacity={0.6} />
          </g>
        ))}
        {ppl.map((p0, i) => {
          const t = (p0 + f / 260) % 1;
          const seg = Math.min(2, Math.floor(t * 3));
          const lt = t * 3 - seg;
          const [x1, y1, x2, y2] = segs[seg];
          return <Person key={i} x={x1 + (x2 - x1) * lt} y={y1 + (y2 - y1) * lt + 22} scale={0.28} color="#C9C4EA" />;
        })}
        <ellipse cx={1700} cy={960} rx={420} ry={90} fill={C.amber} opacity={0.18 + 0.05 * Math.sin(f / 10)} />
      </Layer>
      <div
        style={{
          position: 'absolute',
          left: 1520,
          top: 900,
          padding: '8px 26px',
          borderRadius: 8,
          background: '#2B4C9B',
          border: '3px solid #F0D24A',
          color: '#fff',
          fontFamily: FONT_BN,
          fontWeight: 700,
          fontSize: 34,
          opacity: prog(f, 20, 12),
        }}
      >
        হাওড়া
      </div>
      <Chip at={cue('যত নামবেন', -4)} x={560} y={760} text="↓ পাতালপুরীর দিকে" world="night" tone="dark" size={30} />
    </>
  );
};
