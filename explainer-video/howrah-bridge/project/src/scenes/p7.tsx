import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {BgFx, SceneProps, Sfx} from '../kit';

import {clamp} from '../anim';
import {Chip, Head} from '../ui/text';
import {ShieldCheck} from 'lucide-react';
import {C, FONT_BN} from '../theme';
import {pop, prog} from '../anim';
import {PhotoCard} from '../ui/extra';
import {Portal, Stamp, Tram} from '../ui/story';
import {BullockCart, HandCart, Walker} from '../ui/archive';
import {bridgeSpace} from '../hero/HowrahBridge';
import {Calendar} from '../ui/cards';
import {Layer} from '../ui/svg';
import {HowrahBridge} from '../hero/HowrahBridge';
import {HOOK_BRIDGE} from './p0';

/** S54 background: the city blacks out block by block, then searchlights rise. */
export const S54_bg: BgFx = (lf, s) => ({
  blackout: interpolate(lf, [10, Math.min(150, s.dur * 0.45)], [0, 1], clamp),
  beams: interpolate(lf, [60, 120], [0, 1], clamp),
});

/** Generic twin-engine aircraft silhouette (not any specific type). */
const Plane: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#5A5880">
    <path d="M -40 0 Q 0 -6 44 0 Q 0 6 -40 0 Z" />
    <path d="M -6 -2 L -18 -34 L -8 -34 L 10 -2 Z M -6 2 L -18 34 L -8 34 L 10 2 Z" />
    <path d="M -36 -1 L -44 -12 L -38 -12 L -30 -1 Z M -36 1 L -44 12 L -38 12 L -30 1 Z" />
  </g>
);

/** S54: chapter 7: blackout, searchlights, the 20 Dec 1942 raid. */
export const S54: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const cal = cue('উনিশশো বিয়াল্লিশের', -8);
  const planeX = interpolate(f, [cal, s.dur], [-120, 2100], clamp);
  // distant glows: slow pulses (< 1 Hz), never flashing
  const glow = (ph: number) => 0.5 - 0.5 * Math.cos(((f - cal - ph) / 50) * Math.PI * 2);
  const glowsOn = f > cal + 40 ? 1 : 0;
  return (
    <>
      <Layer>
        <defs>
          <radialGradient id="s54-g" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FF9A4A" stopOpacity={0.55} />
            <stop offset="1" stopColor="#FF9A4A" stopOpacity={0} />
          </radialGradient>
        </defs>
        {glowsOn > 0 && (
          <>
            <ellipse cx={1500} cy={610} rx={180} ry={60} fill="url(#s54-g)" opacity={0.6 * glow(0)} />
            <ellipse cx={420} cy={620} rx={140} ry={50} fill="url(#s54-g)" opacity={0.5 * glow(22)} />
          </>
        )}
        <Plane x={planeX} y={210} s={0.9} />
        <Plane x={planeX - 140} y={240} s={0.75} />
        <HowrahBridge {...HOOK_BRIDGE} theme="night" color="#4A4D7E" reflection depth={false} />
      </Layer>
      <Calendar month="ডিসেম্বর" day="20" year="1942" at={cal} x={960} y={345} scale={0.78} world={world} />
      <Head kicker="অধ্যায় ৭" text="{{অন্ধকার}} শহর" at={4} world={world} y={60} size={76} />
      <Sfx name="siren" at={cal - 10} volume={0.18} />
      <Sfx name="rumble" at={cal + 50} volume={0.2} />
    </>
  );
};


export const S55_bg: BgFx = () => ({blackout: 1, beams: 1});

/** S55: panic in the city, but the new bridge is undamaged. */
export const S55: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const ok = cue('কোনো ক্ষতি হয়নি', -10);
  const s = pop(f, ok);
  return (
    <>
      <Layer>
        <HowrahBridge {...HOOK_BRIDGE} theme="night" color="#4A4D7E" reflection depth={false} />
      </Layer>
      <div style={{position: 'absolute', left: 960, top: 360, transform: `translate(-50%, -50%) scale(${s})`, opacity: prog(f, ok, 8), display: 'flex', alignItems: 'center', gap: 16, padding: '18px 34px', borderRadius: 999, background: 'rgba(20,40,30,0.85)', border: `3px solid ${C.green}`, color: '#fff', fontFamily: FONT_BN, fontWeight: 700, fontSize: 44}}>
        <ShieldCheck size={48} color={C.green} /> সেতু অক্ষত
      </div>
      <Head text="সেতু [[অক্ষত]]" at={4} world={world} y={70} size={76} />
      <Sfx name="ding" at={ok} volume={0.3} />
    </>
  );
};

/** S56: 3 February 1943: the barrier lifts and the bridge opens to the public. */
export const S56: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const open = cue('খুলে দেওয়া', -10);
  const barrier = interpolate(f, [open, open + 30], [0, 1], {...clamp, easing: (t) => t * t * (3 - 2 * t)});
  return (
    <>
      <Layer>
        <g transform="translate(96 210) scale(0.9)">
          <Portal frame={f} barrier={barrier} walkers={prog(f, open + 20, 40)} />
        </g>
      </Layer>
      <Calendar month="ফেব্রুয়ারি" day="3" year="1943" at={4} x={1600} y={380} scale={1.05} world={world} />
      <Head text="খুলে গেল [[সেতু]]" at={open - 10} world={world} y={50} size={74} />
      <Sfx name="pop" at={4} volume={0.3} />
      <Sfx name="swoosh-soft" at={open} volume={0.25} />
    </>
  );
};

/** S57: the open-loop payoff: no ceremony, because of the war. */
export const S57: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const why = cue('কারণ যুদ্ধ', -6);
  const drop = interpolate(f, [cue('চুপচাপ', -10), cue('চুপচাপ', 30)], [0, 1], clamp);
  const scissors = 1 - prog(f, why, 20);
  return (
    <>
      <Layer>
        <g transform="translate(96 210) scale(0.9)">
          <Portal frame={f} ribbon={1 - drop * 0.2} ribbonDrop={drop} scissors={scissors} walkers={drop} />
        </g>
      </Layer>
      {f < why + 4 && <Stamp text="?" x={960} y={560} at={-20} size={150} rot={-8} />}
      <Stamp text="যুদ্ধ" x={960} y={560} at={why + 4} size={110} rot={-8} />
      <Head kicker="শুরুর প্রশ্নের উত্তর" text="কোনো উৎসব {{নেই}}" at={4} world={world} y={40} size={72} />
      <Sfx name="thud" at={why + 4} volume={0.45} />
    </>
  );
};

/** S58: a real 1945 photo (when cleared), then the deck with walkers, carts and a tram. */
export const S58: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const tramAt = cue('ট্রামও', -40);
  const photoEnd = Math.round(s.dur * 0.4);
  const photoO = interpolate(f, [photoEnd - 10, photoEnd + 10], [1, 0], clamp);
  const B = {x: 960, y: 760, s: 8.5, vex: 1.3};
  const sp = bridgeSpace(B);
  const deck = B.y;
  const tramX = interpolate(f, [tramAt, tramAt + 200], [-200, 2200], clamp);
  return (
    <>
      <Layer>
        <HowrahBridge {...B} theme="night" parts={{lights: 0.6}} depth={false} detail="hi" />
        {/* overhead tram wire */}
        <line x1={0} y1={deck - 150} x2={1920} y2={deck - 150} stroke="#8E92C8" strokeWidth={2} opacity={0.6} />
        {[0, 1, 2, 3, 4].map((i) => {
          const x = ((f * (1.2 + i * 0.15) + i * 420) % 2300) - 200;
          return <Walker key={i} x={x} y={deck - 2} scale={1.3} color="#C9CCF0" t={f + i * 7} />;
        })}
        <BullockCart x={2000 - ((f * 1.1 + 300) % 2400)} y={deck - 2} scale={1.2} color="#C9CCF0" t={f} flip />
        <HandCart x={((f * 1.5 + 900) % 2300) - 200} y={deck - 2} scale={1.2} color="#A9ACD6" />
        <Tram x={tramX} y={deck - 2} scale={1.25} color="#2A2A48" />
        <line x1={0} y1={deck} x2={1920} y2={deck} stroke="#8E92C8" strokeWidth={3} opacity={0.6} />
      </Layer>
      <div style={{position: 'absolute', inset: 0, opacity: photoO}}>
        <PhotoCard slot="P07" x={330} y={180} w={1260} h={680} at={0} grade="sepia" dur={photoEnd}>
          <div style={{position: 'absolute', right: 16, top: 14, padding: '6px 16px', borderRadius: 999, background: 'rgba(0,0,0,0.6)', color: '#fff', fontFamily: FONT_BN, fontWeight: 700, fontSize: 24}}>1945 · আসল ছবি</div>
        </PhotoCard>
      </div>
      <Chip text="ট্রাম · 1993 পর্যন্ত" at={tramAt + 30} x={960} y={330} world={world} tone="orange" size={32} />
      <Head text="মানুষ, গাড়ি, [[ট্রাম]]" at={4} world={world} y={70} size={72} />
      <Sfx name="ding" at={tramAt + 40} volume={0.2} />
    </>
  );
};

