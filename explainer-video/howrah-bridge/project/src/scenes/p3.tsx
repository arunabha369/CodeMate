import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ArrowDown, Check, Moon, Sun} from 'lucide-react';
import {Camera, SceneProps, Sfx} from '../kit';
import {C, FONT_BN, FONT_NUM} from '../theme';
import {clamp, easeInOut, pop, prog, stepFrames, stepped} from '../anim';
import {Chip, Head} from '../ui/text';
import {Calendar} from '../ui/cards';
import {ChapterIntro, chapterReveal, Lens, SvgNum} from '../ui/story';
import {DimArrow} from '../ui/svg';
import {bridgeSpace, G, HowrahBridge} from '../hero/HowrahBridge';
import {Layer} from '../ui/svg';
import {CaissonSection, DepthRuler, STRATA} from '../ui/caisson';
import {Person} from '../ui/svg';

const GROUND = 380;
const BOTTOM = 1040;

/** S27: dig inside the shafts → the box settles under its own weight, one step per cycle. */
export const S27: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const start = cue('খুঁড়ে', -10);
  const every = 80;
  const steps = stepped(f, start, every, 18, 0, 4);
  const sink = steps * 34;
  const arrowsAt = cue('নিজের ভারেই', -8);
  const arrowsO = prog(f, arrowsAt, 12);
  const bob = (Math.sin(f / 6) * 0.5 + 0.5) * 8;
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 900, y: 600, z: 1.0},
          {f: s.dur + 12, x: 900, y: 640, z: 1.05},
        ]}
      >
        <Layer>
          <CaissonSection frame={f} groundY={GROUND} bottomY={BOTTOM} cx={880} w={640} h={260} sink={sink} />
          {/* tiny anonymous workers on the top deck */}
          {[0, 1, 2].map((i) => (
            <Person key={i} x={620 + i * 260} y={GROUND - 70 + sink} scale={0.2} pose={i === 1 ? 'point' : 'stand'} color={C.ink} />
          ))}
          <DepthRuler x={1640} groundY={GROUND} pxPerM={20} maxM={30} />
          {/* "settling under its own weight" arrows */}
          {[480, 1280].map((x, i) => (
            <g key={i} opacity={arrowsO} transform={`translate(${x} ${GROUND + 120 + sink + bob})`}>
              <line x1={0} y1={-60} x2={0} y2={40} stroke={C.orange} strokeWidth={8} strokeLinecap="round" />
              <path d="M -24 30 L 0 64 L 24 30 Z" fill={C.orange} />
            </g>
          ))}
        </Layer>
        {STRATA.map((st, i) => (
          <Chip key={i} text={st.name} at={6 + i * 6} x={250} y={GROUND + ((st.top + st.bottom) / 2) * (BOTTOM - GROUND)} world={world} size={26} tone={i === 2 ? 'orange' : 'neutral'} />
        ))}
        <div
          style={{
            position: 'absolute',
            left: 1010,
            top: GROUND + 470 + sink,
            transform: 'translateX(-50%)',
            opacity: arrowsO,
            fontFamily: FONT_BN,
            fontWeight: 700,
            fontSize: 30,
            color: C.ink,
            background: '#fff',
            padding: '8px 20px',
            borderRadius: 999,
            border: `2px solid ${C.orange}`,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <ArrowDown size={26} color={C.orange} strokeWidth={3} /> নিজের ভারে নামছে
        </div>
      </Camera>
      <Head text="খোঁড়ো, আর [[নামাও]]" at={4} world={world} y={50} size={70} />
      {stepFrames(start + every, every, 3).map((t) => (
        <Sfx key={t} name="thud" at={t} volume={0.3} />
      ))}
    </>
  );
};

/** Bridge on top + ground section below, used by S24 and S32. */
const SITE = {x: 960, y: 430, s: 2.3, vex: 1.4};

/** S24: chapter 3: where will all that weight go? Load arrows stop at "?" in soft ground. */
export const S24: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const sp = bridgeSpace(SITE);
  const load = cue('ভার নামবে কোথায়', -10);
  const ground = SITE.y + G.ground * SITE.s * SITE.vex;
  const a = prog(f, load, 30);
  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: chapterReveal(f)}}>
        <Layer>
          {STRATA.map((st, i) => (
            <rect key={i} x={0} y={ground + st.top * (1080 - ground)} width={1920} height={(st.bottom - st.top) * (1080 - ground) + 1} fill={st.color} />
          ))}
          <rect x={sp.X(-G.tower) + 30} y={ground - 4} width={sp.X(G.tower) - sp.X(-G.tower) - 60} height={60} fill={C.waterLight} />
          <HowrahBridge {...SITE} theme="paper" depth={false} />
          {[-1, 1].map((side) => (
            <g key={side} opacity={a}>
              {[0, 1, 2].map((k) => {
                const y0 = ground + 20 + ((f * 2 + k * 60) % 180) * a;
                return (
                  <g key={k} transform={`translate(${sp.X(side * G.tower)} ${y0})`}>
                    <line x1={0} y1={-30} x2={0} y2={10} stroke={C.orange} strokeWidth={8} strokeLinecap="round" />
                    <path d="M -18 4 L 0 30 L 18 4 Z" fill={C.orange} />
                  </g>
                );
              })}
              <g transform={`translate(${sp.X(side * G.tower)} ${ground + 290})`}>
                <circle r={44} fill="#fff" stroke={C.orange} strokeWidth={5} />
                <text y={18} textAnchor="middle" fontFamily={FONT_NUM} fontWeight={600} fontSize={52} fill={C.orange}>
                  ?
                </text>
              </g>
            </g>
          ))}
        </Layer>
      </div>
      <Calendar month="কাজ শুরু" year="1936" at={cue('উনিশশো ছত্রিশে', 0)} x={1640} y={230} scale={0.55} />
      <ChapterIntro n="৩" title="মাটির নিচের [[লড়াই]]" world={world} />
      <Sfx name="whoosh" at={2} volume={0.2} />
      <Sfx name="rumble" at={load} volume={0.2} />
    </>
  );
};

/** S25: the soil draws in layer by layer; firm clay is found only deep down. */
export const S25: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const deep = cue('অনেক নিচে', -10);
  const groundY = 300;
  const bottom = 1080;
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 540, z: 1.0},
          {f: deep, x: 960, y: 560, z: 1.0},
          {f: s.dur + 12, x: 960, y: 760, z: 1.18},
        ]}
      >
        <Layer>
          {STRATA.map((st, i) => {
            const at = 6 + i * 26;
            const p = interpolate(f, [at, at + 20], [0, 1], {...clamp, easing: easeInOut});
            const y = groundY + st.top * (bottom - groundY);
            const h = (st.bottom - st.top) * (bottom - groundY);
            return <rect key={i} x={0} y={y} width={1920 * p} height={h + 1} fill={st.color} />;
          })}
          <line x1={0} y1={groundY} x2={1920} y2={groundY} stroke={C.mudDark} strokeWidth={3} />
          <rect x={0} y={groundY - 6} width={1920} height={6} fill="#8FA57A" />
          <g opacity={prog(f, deep, 16)}>
            <rect x={0} y={groundY + STRATA[2].top * (bottom - groundY)} width={1920} height={8} fill={C.orange} opacity={0.7} />
          </g>
          <DepthRuler x={1680} groundY={groundY} pxPerM={(bottom - groundY) / 36} maxM={35} />
        </Layer>
        {STRATA.map((st, i) => (
          <Chip key={i} text={st.name} at={14 + i * 26} x={420} y={groundY + ((st.top + st.bottom) / 2) * (bottom - groundY)} world={world} size={32} tone={i === 2 ? 'orange' : 'neutral'} />
        ))}
        <Chip text="ভরসা করার মতো শক্ত মাটি" at={deep + 10} x={1000} y={groundY + (STRATA[2].top + 0.06) * (bottom - groundY)} world={world} size={28} tone="green" />
      </Camera>
      <Head kicker="পাড়ের নিচে" text="শক্ত মাটি [[অনেক নিচে]]" at={4} world={world} y={60} size={70} />
      {STRATA.map((_, i) => (
        <Sfx key={i} name="swoosh-soft" at={6 + i * 26} volume={0.15} />
      ))}
    </>
  );
};

/** S26: the caisson in plan: ~55 × 25 m with 21 shafts, like a honeycomb. */
export const S26: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const shafts = cue('কেসন', 0);
  const dims = cue('পঞ্চান্ন', -8);
  const count = cue('একুশটা খোপ', -6);
  const W0 = 1210;
  const H0 = 550;
  const x0 = 960 - W0 / 2;
  const y0 = 300;
  const cols = 7;
  const rows = 3;
  const wall = 26;
  const cw = (W0 - wall * (cols + 1)) / cols;
  const ch = (H0 - wall * (rows + 1)) / rows;
  const box = prog(f, 2, 20);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 590, z: 0.96},
          {f: s.dur + 12, x: 960, y: 590, z: 1.04},
        ]}
      >
        <Layer>
          <rect x={x0 + 18} y={y0 + 22} width={W0} height={H0} rx={10} fill="#000" opacity={0.08 * box} />
          <rect x={x0} y={y0} width={W0} height={H0} rx={10} fill={C.concrete} opacity={box} />
          {Array.from({length: cols * rows}, (_, i) => {
            const c = i % cols;
            const r = Math.floor(i / cols);
            const d = Math.abs(c - 3) + Math.abs(r - 1);
            const p = pop(f, shafts + d * 4);
            const x = x0 + wall + c * (cw + wall);
            const y = y0 + wall + r * (ch + wall);
            return (
              <g key={i} transform={`translate(${x + cw / 2} ${y + ch / 2}) scale(${Math.min(1, p)}) translate(${-x - cw / 2} ${-y - ch / 2})`} opacity={prog(f, shafts + d * 4, 6)}>
                <rect x={x} y={y} width={cw} height={ch} rx={6} fill="#5E5B57" />
                <rect x={x + 8} y={y + 8} width={cw - 16} height={ch - 16} rx={4} fill="#6E6B66" />
              </g>
            );
          })}
          <DimArrow x1={x0} y1={y0 - 40} x2={x0 + W0} y2={y0 - 40} at={dims} color={C.ink} />
          <DimArrow x1={x0 - 40} y1={y0} x2={x0 - 40} y2={y0 + H0} at={dims + 10} color={C.ink} />
          {/* one shaft callout */}
          <g opacity={prog(f, count, 10)}>
            <rect x={x0 + wall + 3 * (cw + wall) - 4} y={y0 + wall + ch + wall - 4} width={cw + 8} height={ch + 8} rx={8} fill="none" stroke={C.orange} strokeWidth={5} />
          </g>
        </Layer>
        <Chip text={<span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}><span style={{fontFamily: FONT_NUM}}>~55</span> মি</span>} at={dims + 8} x={960} y={y0 - 40} world={world} size={28} />
        <Chip text={<span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}><span style={{fontFamily: FONT_NUM}}>~25</span> মি</span>} at={dims + 18} x={x0 - 40} y={y0 + H0 / 2} world={world} size={28} />
        <Chip text={<span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}><span style={{fontFamily: FONT_NUM}}>21</span> টা খোপ · প্রতিটা <span style={{fontFamily: FONT_NUM}}>~6.25</span> মি</span>} at={count} x={960} y={y0 + H0 + 60} world={world} size={30} tone="orange" />
      </Camera>
      <Head kicker="কেসন · ওপর থেকে" text="এক বিশাল কংক্রিটের [[বাক্স]]" at={4} world={world} y={60} size={66} />
      {[0, 1, 2, 3, 4].map((d) => (
        <Sfx key={d} name="pop" at={shafts + d * 4} volume={0.12} />
      ))}
    </>
  );
};

/** S28: dig, sink, add a new lift on top: round the clock. */
export const S28: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const every = 90;
  const steps = stepped(f, 0, every, 18, 4, 7);
  const sink = steps * 34;
  const lifts = Math.min(3, Math.floor((f + 30) / every));
  const liftP = prog(f, lifts * every - 30 + every * 0.4, 30);
  const day = cue('দিনরাত', -10);
  const phase = Math.floor(Math.max(0, f - day) / 26) % 2; // swap sun/moon three times
  const night = f >= day && f < day + 26 * 3 ? phase : 0;
  const loopK = Math.floor(f / 30) % 3;
  const labels = ['খোঁড়ো', 'নামাও', 'জোড়ো'];
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 900, y: 600, z: 1.0},
          {f: s.dur + 12, x: 900, y: 640, z: 1.04},
        ]}
      >
        <Layer>
          <CaissonSection frame={f} groundY={GROUND} bottomY={BOTTOM} cx={880} w={640} h={260} sink={sink} lifts={lifts} liftP={liftP < 1 ? liftP : 1} />
          <rect x={0} y={0} width={1920} height={GROUND} fill="#1E1B2E" opacity={night * 0.35} />
          <DepthRuler x={1640} groundY={GROUND} pxPerM={20} maxM={30} />
        </Layer>
      </Camera>
      <div style={{position: 'absolute', left: 1480, top: 200, width: 90, height: 90, borderRadius: 45, background: night ? '#2A2547' : '#FFF3D6', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', opacity: prog(f, day - 6, 8)}}>
        {night ? <Moon size={52} color="#F2D28A" /> : <Sun size={52} color={C.orange} />}
      </div>
      <div style={{position: 'absolute', left: 180, top: 210, display: 'flex', gap: 14}}>
        {labels.map((l, i) => (
          <div key={l} style={{padding: '10px 22px', borderRadius: 999, fontFamily: FONT_BN, fontWeight: 700, fontSize: 28, background: loopK === i ? C.orange : '#fff', color: loopK === i ? '#fff' : C.ink, border: `2px solid ${loopK === i ? C.orange : C.paperLine}`}}>
            {l} {i < 2 ? '→' : '↺'}
          </div>
        ))}
      </div>
      <Head text="খোঁড়ো, নামাও, [[জোড়ো]]" at={4} world={world} y={60} size={70} />
      {stepFrames(every, every, 3).map((t) => (
        <Sfx key={t} name="thud" at={t} volume={0.25} />
      ))}
    </>
  );
};

/** S29: the camera pushes into one shaft; keeping the box level is the hardest part. */
export const S29: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const tilt = cue('হেলে যাবে', -6);
  const ghost = interpolate(f, [tilt, tilt + 12, tilt + 50, tilt + 64], [0, 1, 1, 0], clamp);
  const shake = ghost > 0.5 ? Math.sin(f * 2) * 4 : 0;
  const sink = 7 * 34;
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 880, y: 560, z: 1.0},
          {f: Math.round(s.dur * 0.35), x: 880, y: 480, z: 1.2},
          {f: tilt + 4, x: 880, y: 660, z: 1.05},
          {f: s.dur + 12, x: 880, y: 660, z: 1.02},
        ]}
      >
        <Layer>
          <CaissonSection frame={f} groundY={GROUND} bottomY={BOTTOM} cx={880} w={640} h={260} sink={sink} lifts={2} />
          {[0, 1, 2, 3].map((i) => (
            <Person key={i} x={640 + i * 160} y={GROUND - 70 + sink - 2 * 60} scale={0.2} pose={i % 2 ? 'point' : 'stand'} color={C.ink} />
          ))}
          {ghost > 0 && (
            <g opacity={ghost * 0.55} transform={`translate(${shake} 0) rotate(4 880 ${GROUND + sink + 190})`}>
              <rect x={560} y={GROUND - 70 + sink - 180} width={640} height={440} fill="none" stroke={C.red} strokeWidth={8} strokeDasharray="20 12" />
            </g>
          )}
        </Layer>
      </Camera>
      <Chip text="হেলে গেলে সামলানো প্রায় অসম্ভব" at={tilt + 10} x={1380} y={300} world={world} tone="red" size={28} />
      <Head text="একচুল {{বাঁকা}} হলেই বিপদ" at={4} world={world} y={60} size={70} />
      <Sfx name="whoosh" at={4} volume={0.2} />
      <Sfx name="rumble" at={tilt} volume={0.25} />
    </>
  );
};

/** S30: placed within a few centimetres of the design position. */
export const S30: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const lens = cue('পাঁচ থেকে', -12);
  const x0 = 520;
  const y0 = 330;
  const w = 880;
  const h = 400;
  const settle = interpolate(f, [4, 60], [40, 6], {...clamp, easing: easeInOut});
  return (
    <>
      <Layer>
        {/* crosshair */}
        <g stroke={C.blue} strokeWidth={2} opacity={0.6}>
          <line x1={x0 - 120} y1={y0 + h / 2} x2={x0 + w + 120} y2={y0 + h / 2} strokeDasharray="12 10" />
          <line x1={x0 + w / 2} y1={y0 - 80} x2={x0 + w / 2} y2={y0 + h + 80} strokeDasharray="12 10" />
          <circle cx={x0 + w / 2} cy={y0 + h / 2} r={60} fill="none" />
        </g>
        {/* design outline */}
        <rect x={x0} y={y0} width={w} height={h} rx={8} fill="none" stroke={C.blue} strokeWidth={4} strokeDasharray="16 10" />
        {/* actual caisson, settling into place */}
        <rect x={x0 + settle} y={y0 + settle * 0.6} width={w} height={h} rx={8} fill={C.concrete} opacity={0.85} />
        {Array.from({length: 21}, (_, i) => {
          const c = i % 7;
          const r = Math.floor(i / 7);
          return <rect key={i} x={x0 + settle + 20 + c * 122} y={y0 + settle * 0.6 + 20 + r * 124} width={100} height={110} rx={5} fill="#6E6B66" />;
        })}
        <Lens x={x0 + w + 40} y={y0 + h + 60} r={150} at={lens} id="s30">
          <rect x={-200} y={-200} width={400} height={400} fill="#FBF8F1" />
          <rect x={-120} y={-120} width={400} height={400} fill="none" stroke={C.blue} strokeWidth={8} strokeDasharray="22 14" />
          <rect x={-120 + 34} y={-120 + 22} width={400} height={400} fill={C.concrete} opacity={0.9} />
          <line x1={-120} y1={-150} x2={-86} y2={-150} stroke={C.orange} strokeWidth={6} />
          <text x={-60} y={-160} fontFamily={FONT_NUM} fontWeight={600} fontSize={40} fill={C.orange}>
            5–7.5 সেমি
          </text>
        </Lens>
      </Layer>
      <Chip text="নকশার জায়গা" at={10} x={x0 + 150} y={y0 - 34} world={world} tone="blue" size={26} />
      <Head text="ভুল মাত্র [[কয়েক সেন্টিমিটার]]" at={4} world={world} y={60} size={70} />
      <Sfx name="pop" at={lens} volume={0.3} />
    </>
  );
};

/** S31: depth comparison and the iceberg reveal: a hidden bridge below the visible one. */
export const S31: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const hidden = cue('অদৃশ্য সেতু', -16);
  const pxm = 13;
  const groundY = 500;
  const cols = [
    {x: 380, depth: 26.5, label: 'হাওড়ার দিক'},
    {x: 1540, depth: 31.4, label: 'কলকাতার দিক'},
  ];
  const towerH = 82 * pxm;
  const glow = prog(f, hidden, 16);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 760, z: 1.0},
          {f: hidden - 30, x: 960, y: 760, z: 1.0},
          {f: hidden + 20, x: 960, y: 300, z: 0.44},
          {f: s.dur + 12, x: 960, y: 300, z: 0.43},
        ]}
      >
        <Layer>
          <rect x={-1200} y={groundY - towerH - 400} width={4320} height={towerH + 400} fill="#F0EBE0" opacity={0.0} />
          <rect x={-1200} y={groundY} width={4320} height={1000} fill={C.ground} />
          <rect x={-1200} y={groundY + 18 * pxm} width={4320} height={1000} fill={C.groundDeep} />
          <rect x={-1200} y={groundY + 26 * pxm} width={4320} height={1000} fill="#C99A45" opacity={0.6} />
          {cols.map((c, i) => {
            const d = c.depth * pxm;
            const p = prog(f, 6 + i * 14, 30);
            return (
              <g key={i}>
                {glow > 0 && <rect x={c.x - 170} y={groundY - 10} width={340} height={d * p + 20} fill={C.amber} opacity={0.35 * glow} />}
                <rect x={c.x - 160} y={groundY} width={320} height={d * p} fill={C.concrete} />
                {[1, 2, 3, 4, 5, 6].map((k) => (
                  <rect key={k} x={c.x - 160 + k * 45 - 6} y={groundY + 6} width={12} height={Math.max(0, d * p - 12)} fill={C.concreteLight} />
                ))}
                <DimArrow x1={c.x + 220} y1={groundY} x2={c.x + 220} y2={groundY + d} at={30 + i * 14} color={C.ink} />
                {/* the visible tower above: a half-bridge silhouette with its two arms */}
                <path
                  d={`M ${c.x - 420} ${groundY - 40} L ${c.x - 420} ${groundY - 230} Q ${c.x - 260} ${groundY - 360} ${c.x} ${groundY - towerH} Q ${c.x + 260} ${groundY - 360} ${c.x + 420} ${groundY - 260} L ${c.x + 420} ${groundY - 40} Z`}
                  fill={C.steel}
                  opacity={0.16}
                />
                <path
                  d={`M ${c.x - 420} ${groundY - 230} Q ${c.x - 260} ${groundY - 360} ${c.x} ${groundY - towerH} Q ${c.x + 260} ${groundY - 360} ${c.x + 420} ${groundY - 260}`}
                  stroke={C.steel}
                  strokeWidth={16}
                  fill="none"
                />
                <line x1={c.x} y1={groundY} x2={c.x} y2={groundY - towerH} stroke={C.steel} strokeWidth={26} />
                <line x1={c.x - 460} y1={groundY - 40} x2={c.x + 460} y2={groundY - 40} stroke={C.ink} strokeWidth={18} />
              </g>
            );
          })}
          <rect x={-1200} y={groundY - 30} width={4320} height={30} fill={C.ink} opacity={0.85} />
        </Layer>
        {cols.map((c, i) => (
          <Chip key={i} text={<span style={{display: 'flex', gap: 8, alignItems: 'baseline'}}>{c.label} · <span style={{fontFamily: FONT_NUM}}>~{c.depth}</span> মি</span>} at={36 + i * 14} x={c.x} y={groundY + c.depth * pxm + 50} world={world} size={64} tone={i === 1 ? 'orange' : 'neutral'} />
        ))}
      </Camera>
      <Head text="চোখের আড়ালে আরেকটা [[সেতু]]" at={hidden - 10} world={world} y={60} size={70} />
      <Sfx name="whoosh" at={hidden - 30} volume={0.25} />
    </>
  );
};

/** S32: November 1938: foundations finished. */
export const S32: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const sp = bridgeSpace(SITE);
  const done = cue('ভিতের কাজ', -6);
  const load = cue('মূল ভার', -8);
  const ground = SITE.y + G.ground * SITE.s * SITE.vex;
  const a = prog(f, load, 20);
  return (
    <>
      <Layer>
        {STRATA.map((st, i) => (
          <rect key={i} x={0} y={ground + st.top * (1080 - ground)} width={1920} height={(st.bottom - st.top) * (1080 - ground) + 1} fill={st.color} />
        ))}
        <rect x={sp.X(-G.tower) + 30} y={ground - 4} width={sp.X(G.tower) - sp.X(-G.tower) - 60} height={60} fill={C.waterLight} />
        <HowrahBridge {...SITE} theme="paper" depth={false} caissons={1} caissonGlow={a} opacity={0.95} />
        {[-1, 1].map((side) => (
          <g key={side} opacity={a}>
            {[0, 1, 2].map((k) => {
              const y0 = SITE.y - 160 + ((f * 2.4 + k * 70) % 220);
              return (
                <g key={k} transform={`translate(${sp.X(side * G.tower)} ${y0})`}>
                  <line x1={0} y1={-24} x2={0} y2={8} stroke={C.orange} strokeWidth={7} strokeLinecap="round" />
                  <path d="M -15 4 L 0 26 L 15 4 Z" fill={C.orange} />
                </g>
              );
            })}
          </g>
        ))}
      </Layer>
      <Calendar month="নভেম্বর" year="1938" at={2} x={300} y={300} scale={0.8} />
      <div style={{position: 'absolute', left: 1380, top: 250, display: 'flex', alignItems: 'center', gap: 14, padding: '16px 28px', borderRadius: 999, background: '#fff', border: `2px solid ${C.green}`, fontFamily: FONT_BN, fontWeight: 700, fontSize: 36, color: C.ink, transform: `scale(${pop(f, done)})`}}>
        <span style={{width: 46, height: 46, borderRadius: 23, background: C.green, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Check size={30} strokeWidth={3.4} />
        </span>
        ভিত তৈরি
      </div>
      <Head text="মূল ভার নামবে এই [[দুটো বাক্সে]]" at={load - 12} world={world} y={60} size={66} />
      <Sfx name="ding" at={done} volume={0.3} />
    </>
  );
};
