import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Camera, SceneProps, Sfx} from '../kit';
import {C, FONT_BN, FONT_NUM} from '../theme';
import {clamp, pop, prog} from '../anim';
import {Chip, Head, Kicker} from '../ui/text';
import {DimArrow, Layer} from '../ui/svg';
import {ArchiveSkyline, BullockCart, HandCart, Ledger, PontoonSection, Steamer} from '../ui/archive';

/** S08: the pontoon bridge in section; the whole road rides up and down with the river. */
export const S08: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const level = 16 * Math.sin((f / 110) * Math.PI * 2);
  const lab1 = cue('পন্টুন', -4);
  const lab2 = cue('রাস্তা', -4);
  const tide = cue('বাড়লে-কমলে', -6);
  const arrowsO = prog(f, tide, 12);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 900, y: 620, z: 1.32},
          {f: s.dur + 12, x: 1000, y: 630, z: 1.42},
        ]}
      >
        <Layer>
          <ArchiveSkyline y={600} frame={f} />
          <Steamer x={1500 - ((f * 0.8) % 600)} y={655} scale={0.45} color={C.archInkSoft} t={f} />
          <PontoonSection y={720} level={level} frame={f} n={11} />
          <DimArrow x1={120} y1={455} x2={1800} y2={455} at={20} color={C.archInk} />
          {/* rise/fall arrows */}
          <g opacity={arrowsO} transform={`translate(1480 ${610 - level})`}>
            <path d="M 0 -60 l -16 26 h 32 Z" fill={C.archAccent} />
            <line x1={0} y1={-40} x2={0} y2={40} stroke={C.archAccent} strokeWidth={6} />
            <path d="M 0 60 l -16 -26 h 32 Z" fill={C.archAccent} />
          </g>
        </Layer>
        <Chip text={<span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}><span style={{fontFamily: FONT_NUM}}>~466</span> মিটার</span>} at={26} x={960} y={455} world={world} size={26} />
        <Chip text="পন্টুন" at={lab1} x={700} y={800 - level} world={world} tone="neutral" size={28} />
        <Chip text="রাস্তা" at={lab2} x={1150} y={590 - level} world={world} size={28} />
        <Chip text="জল বাড়ে-কমে" at={tide + 6} x={1480} y={520 - level} world={world} size={24} tone="orange" />
      </Camera>
      <Kicker text="ভাসমান সেতু · 1874" at={4} world={world} y={70} />
      <Head text="জলের সঙ্গে [[ওঠে-নামে]] রাস্তা" at={10} world={world} y={60} size={64} />
      <Sfx name="swoosh-soft" at={lab1} volume={0.2} />
    </>
  );
};

/** S10: the 1906 survey: vehicles are tallied one by one, then 8 of the 13 flip to bullock carts. */
export const S10: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const fill = cue('তেরো ভাগের আট ভাগই', -4);
  const tallyEvery = 9;
  const cells = Array.from({length: 13}, (_, i) => i);
  const cw = 132;
  const gap = 18;
  const gx = 270;
  const gy = 400;
  const fracS = pop(f, fill + 8 * 4 + 6);
  return (
    <>
      <Ledger x={170} y={250} w={1580} h={620} at={0} title="সমীক্ষা · 1906 · সবচেয়ে ভিড়ের দিন">
        {null}
      </Ledger>
      <Layer>
        {cells.map((i) => {
          const row = i < 7 ? 0 : 1;
          const col = row === 0 ? i : i - 7;
          const x = gx + col * (cw + gap) + (row === 1 ? (cw + gap) / 2 : 0);
          const y = gy + row * (cw + gap + 14);
          const tallyAt = 8 + i * tallyEvery;
          const flipAt = fill + i * 4;
          const tp = pop(f, tallyAt);
          const isCart = i < 8 && f >= flipAt;
          const fp = i < 8 ? pop(f, flipAt) : 1;
          const o = Math.min(1, prog(f, tallyAt, 6));
          const sc = 0.5 + 0.5 * tp * (isCart ? 0.85 + 0.15 * fp : 1);
          return (
            <g key={i}>
              <rect x={x} y={y} width={cw} height={cw} rx={16} fill="#FBF6EA" stroke={C.archLine} strokeWidth={2} strokeDasharray="6 6" />
              <g opacity={o} transform={`translate(${x + cw / 2} ${y + cw / 2}) scale(${sc}) translate(${-x - cw / 2} ${-y - cw / 2})`}>
                <rect x={x} y={y} width={cw} height={cw} rx={16} fill={isCart ? '#F3DDBF' : '#ECE5D6'} stroke={isCart ? C.archAccent : C.archLine} strokeWidth={isCart ? 3 : 2} />
                {isCart ? (
                  <BullockCart x={x + cw / 2 + 2} y={y + cw - 24} scale={0.98} color={C.archAccent} t={f} />
                ) : (
                  <HandCart x={x + cw / 2 - 2} y={y + cw - 30} scale={1.05} color={C.archInkSoft} />
                )}
              </g>
            </g>
          );
        })}
      </Layer>
      <div style={{position: 'absolute', left: 1390, top: 430, transform: `scale(${fracS})`, transformOrigin: '0 50%', opacity: Math.min(1, fracS * 1.5)}}>
        <div style={{fontFamily: FONT_NUM, fontWeight: 600, fontSize: 170, lineHeight: 1, color: C.archAccent}}>8/13</div>
        <div style={{fontFamily: FONT_BN, fontWeight: 700, fontSize: 36, color: C.archInk, marginTop: 12}}>গাড়িই গরুর গাড়ি</div>
      </div>
      <div style={{position: 'absolute', left: 1390, top: 470, fontFamily: FONT_BN, fontWeight: 600, fontSize: 32, color: C.archInkSoft, opacity: (1 - Math.min(1, fracS * 2)) * prog(f, 10, 10)}}>
        গাড়ি গোনা চলছে…
      </div>
      <Head kicker="1906-এর সমীক্ষা" text="ভিড়ের [[রাজা]] গরুর গাড়ি" at={fill - 16} world={world} y={56} size={68} />
      {cells.map((i) => (
        <Sfx key={'t' + i} name="tick" at={8 + i * tallyEvery} volume={0.1} />
      ))}
      {cells.slice(0, 8).map((i) => (
        <Sfx key={i} name="pop" at={fill + i * 4} volume={0.12} />
      ))}
      <Sfx name="ding" at={fill + 40} volume={0.2} />
    </>
  );
};

/** helper used by archive scenes */
export const archFade = (f: number, a: number, b: number) => interpolate(f, [a, a + 10, b - 10, b], [0, 1, 1, 0], clamp);
