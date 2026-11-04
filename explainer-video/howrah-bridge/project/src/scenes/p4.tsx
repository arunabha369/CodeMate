import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Factory, Ship} from 'lucide-react';
import {Camera} from '../kit';
import {Chip} from '../ui/text';
import {ChapterIntro, chapterReveal, Gauge, Globe} from '../ui/story';
import {cardBg} from '../ui/cards';
import {bridgeSpace, G, PANELS} from '../hero/HowrahBridge';
import {prog, rng, stepFrames, stepped} from '../anim';
import {SceneProps, Sfx} from '../kit';
import {C, FONT_BN, FONT_NUM} from '../theme';
import {clamp, countUp, easeInOut, easeOut, fmtIN, pop} from '../anim';
import {Head, Kicker} from '../ui/text';
import {AppWindow, Cursor, ProgressBar} from '../ui/app';
import {HowrahBridge} from '../hero/HowrahBridge';
import {Layer} from '../ui/svg';

const TOTAL = 26500;

export const Row: React.FC<{icon: React.ReactNode; name: string; sub: string; value: number; frac: number; color: string; chip?: React.ReactNode; y: number; active?: number; shake?: number}> = ({
  icon,
  name,
  sub,
  value,
  frac,
  color,
  chip,
  y,
  active = 0,
  shake = 0,
}) => (
  <div
    style={{
      position: 'absolute',
      left: 34,
      right: 34,
      top: y,
      height: 112,
      borderRadius: 16,
      background: active > 0.5 ? '#F2FAF5' : '#FAF8F3',
      border: `2px solid ${active > 0.5 ? C.green : '#ECE7DC'}`,
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      padding: '0 26px',
      transform: `translateX(${shake}px)`,
    }}
  >
    <div style={{width: 60, height: 60, borderRadius: 14, background: '#F6E7D2', color: C.orange, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{icon}</div>
    <div style={{width: 290}}>
      <div style={{fontFamily: FONT_BN, fontWeight: 700, fontSize: 32, color: C.ink}}>{name}</div>
      <div style={{fontFamily: FONT_BN, fontWeight: 500, fontSize: 20, color: C.inkSoft}}>{sub}</div>
    </div>
    <ProgressBar value={frac} w={420} h={20} color={color} />
    <div style={{fontFamily: FONT_NUM, fontWeight: 600, fontSize: 44, color, width: 170, textAlign: 'right'}}>{fmtIN(value)}</div>
    <div style={{width: 130, display: 'flex', justifyContent: 'center'}}>{chip}</div>
  </div>
);

export const Pill: React.FC<{text: string; color: string; bg: string; s: number}> = ({text, color, bg, s}) => (
  <div style={{transform: `scale(${s})`, padding: '6px 16px', borderRadius: 999, background: bg, color, fontFamily: FONT_BN, fontWeight: 700, fontSize: 24, border: `1.5px solid ${color}55`}}>{text}</div>
);

/** S35: the cursor picks Tata Steel; its bar fills to ~23,000 t of Tiscrom and the order completes. */
export const S35: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const click = cue('টাটা স্টিল', 6);
  const fillAt = cue('জোগান দিল', -4);
  const tis = cue('টিসক্রম', -2);
  const tata = countUp(f, fillAt, 23000, 70);
  const tataFrac = tata / TOTAL;
  const done = fillAt + 74;
  const winX = 330;
  const winY = 230;
  return (
    <>
      <Layer>
        <g opacity={0.35}>
          <HowrahBridge x={960} y={640} s={2.6} vex={1.35} theme="night" parts={{suspended: 0, cantilever: 0.35}} depth={false} />
        </g>
      </Layer>
      <AppWindow x={winX} y={winY} w={1260} h={650} at={0} title="স্টিল অর্ডার · নিউ হাওড়া ব্রিজ">
        <div style={{display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20}}>
          <span style={{fontFamily: FONT_BN, fontWeight: 600, fontSize: 26, color: C.inkSoft}}>মোট দরকার</span>
          <span style={{fontFamily: FONT_NUM, fontWeight: 600, fontSize: 64, color: C.ink}}>26,500</span>
          <span style={{fontFamily: FONT_BN, fontWeight: 700, fontSize: 30, color: C.ink}}>টন</span>
        </div>
        <div style={{position: 'relative', height: 300}}>
          <Row icon={<Ship size={32} />} name="ইংল্যান্ড" sub="যুদ্ধের জন্য সরবরাহ বন্ধ" value={3000} frac={3000 / TOTAL} color={C.red} y={0} chip={<Pill text="যুদ্ধ" color={C.red} bg="#FBE3E0" s={1} />} />
          <Row
            icon={<Factory size={32} />}
            name="টাটা স্টিল"
            sub="জামশেদপুর"
            value={Math.round(tata)}
            frac={tataFrac}
            color={C.green}
            y={136}
            active={f >= click ? 1 : 0}
            chip={<Pill text="Tiscrom" color={C.green} bg="#E3F4EA" s={pop(f, tis)} />}
          />
        </div>
        {/* total stacked bar */}
        <div style={{position: 'absolute', left: 34, right: 34, bottom: 34, display: 'flex', alignItems: 'center', gap: 20}}>
          <div style={{flex: 1, height: 26, borderRadius: 13, background: '#E8E2D6', overflow: 'hidden', display: 'flex'}}>
            <div style={{width: `${(3000 / TOTAL) * 100}%`, background: C.red}} />
            <div style={{width: `${tataFrac * 100}%`, background: C.green}} />
          </div>
          <div style={{fontFamily: FONT_NUM, fontWeight: 600, fontSize: 36, color: f >= done ? C.green : C.inkSoft, opacity: interpolate(f, [done - 6, done + 6], [0.5, 1], clamp)}}>
            {f >= done ? '26,500 ✓' : `${fmtIN(3000 + Math.round(tata))}`}
          </div>
        </div>
      </AppWindow>
      <Cursor
        path={[
          [0, 1500, 900],
          [click - 14, winX + 64 + 300, winY + 50 + 26 + 100 + 136 + 56],
          [click + 30, winX + 64 + 330, winY + 50 + 26 + 100 + 136 + 60],
          [s.dur, winX + 900, winY + 560],
        ]}
        clicks={[click]}
        at={2}
      />
      <Head text="এগিয়ে এল [[টাটা]]" at={cue('এগিয়ে', -10)} world={world} y={70} size={72} />
      <Sfx name="click" at={click} volume={0.4} />
      <Sfx name="pop" at={tis} volume={0.25} />
      <Sfx name="ding" at={done} volume={0.3} />
    </>
  );
};


/** S33: chapter 4: the foundations are done, and war breaks out in Europe the next year. */
export const S33: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const war = cue('দ্বিতীয় বিশ্বযুদ্ধ', -12);
  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: chapterReveal(f)}}>
        <Layer>
          <Globe x={960} y={600} r={250} frame={f} pulseAt={war} />
        </Layer>
      </div>
      <Chip text={<span style={{fontFamily: FONT_NUM, fontSize: 40}}>1939</span>} at={war + 6} x={1330} y={430} world={world} tone="red" size={34} />
      <Chip text="ইউরোপে যুদ্ধ শুরু" at={war + 14} x={1360} y={510} world={world} size={30} />
      <ChapterIntro n="৪" title="লোহা আসবে {{কোথা}} থেকে?" world={world} />
      <Sfx name="whoosh" at={2} volume={0.2} />
      <Sfx name="rumble" at={war} volume={0.3} />
    </>
  );
};

/** S34: the order window: 26,500 t needed; England's row stops at ~3,000 t (war). */
export const S34: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const eng = cue('ইংল্যান্ড', -8);
  const stop = cue('যুদ্ধের কাজে', -6);
  const engV = countUp(f, eng, 3000, 40);
  const shake = f > stop && f < stop + 16 ? Math.sin(f * 2.5) * 8 * (1 - (f - stop) / 16) : 0;
  const red = f >= stop;
  const total = countUp(f, 6, 26500, 50);
  const winX = 330;
  const winY = 230;
  const blink = f > stop + 10 ? 0.55 + 0.45 * Math.sin(f / 7) : 0;
  return (
    <>
      <AppWindow x={winX} y={winY} w={1260} h={650} at={0} title="স্টিল অর্ডার · নিউ হাওড়া ব্রিজ">
        <div style={{display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20}}>
          <span style={{fontFamily: FONT_BN, fontWeight: 600, fontSize: 26, color: C.inkSoft}}>মোট দরকার</span>
          <span style={{fontFamily: FONT_NUM, fontWeight: 600, fontSize: 64, color: C.ink}}>{fmtIN(Math.round(total))}</span>
          <span style={{fontFamily: FONT_BN, fontWeight: 700, fontSize: 30, color: C.ink}}>টন</span>
        </div>
        <div style={{position: 'relative', height: 300}}>
          <Row
            icon={<Ship size={32} />}
            name="ইংল্যান্ড"
            sub={red ? 'যুদ্ধের জন্য সরবরাহ বন্ধ' : 'সরবরাহ চলছে…'}
            value={Math.round(engV)}
            frac={engV / TOTAL}
            color={red ? C.red : C.blue}
            y={0}
            shake={shake}
            chip={red ? <Pill text="যুদ্ধ" color={C.red} bg="#FBE3E0" s={pop(f, stop)} /> : null}
          />
          <Row icon={<Factory size={32} />} name="টাটা স্টিল" sub="জামশেদপুর" value={0} frac={0} color={C.green} y={136} />
        </div>
        <div style={{position: 'absolute', left: 34, bottom: 40, fontFamily: FONT_BN, fontWeight: 700, fontSize: 34, color: C.red, opacity: blink}}>
          বাকি <span style={{fontFamily: FONT_NUM}}>~23,500</span> টন — আসবে কোথা থেকে?
        </div>
      </AppWindow>
      <Head text="যুদ্ধে আটকে গেল [[ইস্পাত]]" at={stop - 20} world={world} y={70} size={70} />
      <Sfx name="type" at={8} volume={0.25} />
      <Sfx name="thud" at={stop} volume={0.45} />
    </>
  );
};

/** S36: high-tensile steel: in a truss every member is always in tension or compression. */
export const S36: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const B = {x: 260, y: 820, s: 3.6, vex: 1.4};
  const sp = bridgeSpace(B);
  const wave = cue('টান সইতে', -10);
  const show = prog(f, wave, 20);
  const xs = Array.from({length: 40}, (_, i) => G.tip + ((G.tower - G.tip) * i) / 39);
  const top = xs.map((m, i) => `${i ? 'L' : 'M'} ${sp.X(m)} ${sp.top(m)}`).join(' ');
  const gauge = interpolate(f, [wave, wave + 60], [0.1, 0.85], clamp);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 980, y: 560, z: 1.0},
          {f: s.dur + 12, x: 1020, y: 560, z: 1.05},
        ]}
      >
        <Layer>
          <HowrahBridge {...B} theme="paper" site only={1} />
          <g opacity={show}>
            <path d={top} stroke={C.red} strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.85} />
            <line x1={sp.X(G.tip)} y1={B.y} x2={sp.X(G.tower)} y2={B.y} stroke={C.blue} strokeWidth={10} strokeLinecap="round" opacity={0.85} />
            {[0.25, 0.5, 0.75].map((t, i) => {
              const m = G.tip + (G.tower - G.tip) * t;
              const pulse = Math.sin(f / 8 + i) * 6;
              return (
                <g key={i}>
                  <g transform={`translate(${sp.X(m)} ${sp.top(m) - 34})`} fill={C.red}>
                    <path d={`M ${-30 - pulse} 0 l 14 -10 v 20 Z`} />
                    <path d={`M ${30 + pulse} 0 l -14 -10 v 20 Z`} />
                  </g>
                  <g transform={`translate(${sp.X(m)} ${B.y + 34})`} fill={C.blue}>
                    <path d={`M ${-40 + pulse} 0 l -14 -10 v 20 Z`} />
                    <path d={`M ${40 - pulse} 0 l 14 -10 v 20 Z`} />
                  </g>
                </g>
              );
            })}
          </g>
          <Gauge x={1600} y={420} r={130} value={gauge} label="সইবার ক্ষমতা" />
        </Layer>
        <Chip text="টান" at={wave + 10} x={sp.X(G.tip + 50)} y={sp.top(G.tip + 50) - 90} world={world} tone="red" size={30} />
        <Chip text="চাপ" at={wave + 20} x={sp.X(G.tip + 50)} y={B.y + 90} world={world} tone="blue" size={30} />
      </Camera>
      <Head kicker="টিসক্রম" text="প্রচণ্ড টান সইতে পারে এমন [[ইস্পাত]]" at={4} world={world} y={60} size={62} />
      <Sfx name="swoosh-soft" at={wave} volume={0.2} />
    </>
  );
};

/** S37: about nine in every ten tonnes were made in India. */
export const S37: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const split = cue('ইস্পাতের', -10);
  const nine = cue('নয় ভাগই', -10);
  const p = interpolate(f, [split, split + 30], [0, 1], {...clamp, easing: easeOut});
  const bw = 1400;
  const engW = (3000 / TOTAL) * bw;
  return (
    <>
      <div style={{position: 'absolute', left: 260, top: 380, width: bw, opacity: prog(f, 2, 12)}}>
        <div style={{fontFamily: FONT_BN, fontWeight: 700, fontSize: 34, color: C.ink, marginBottom: 14, display: 'flex', gap: 10, alignItems: 'baseline'}}>
          মোট ইস্পাত <span style={{fontFamily: FONT_NUM, fontSize: 48}}>26,500</span> টন
        </div>
        <div style={{position: 'relative', height: 90, borderRadius: 18, overflow: 'hidden', background: '#E8E2D6', display: 'flex'}}>
          <div style={{width: engW, background: '#8A8E9E'}} />
          <div style={{width: (bw - engW) * p, background: `linear-gradient(90deg, ${C.orange}, ${C.amber})`}} />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 14, fontFamily: FONT_BN, fontWeight: 700, fontSize: 28}}>
          <span style={{color: C.inkSoft}}>
            ইংল্যান্ড <span style={{fontFamily: FONT_NUM}}>~3,000</span>
          </span>
          <span style={{color: C.orange, opacity: p}}>
            ভারত · টাটা <span style={{fontFamily: FONT_NUM}}>~23,000+</span>
          </span>
        </div>
      </div>
      <Layer>
        {Array.from({length: 10}, (_, i) => {
          const at = nine + i * 4;
          const pp = pop(f, at);
          const india = i < 9;
          return <circle key={i} cx={510 + i * 100} cy={760} r={34 * pp} fill={india ? C.orange : '#8A8E9E'} />;
        })}
      </Layer>
      <Head text="ইস্পাতের প্রায় [[নয় ভাগই]] এই দেশের" at={4} world={world} y={90} size={70} />
      {Array.from({length: 10}, (_, i) => (
        <Sfx key={i} name="pop" at={nine + i * 4} volume={0.1} />
      ))}
    </>
  );
};

/** S38: generic map card: steel travels from the Jamshedpur works to the Howrah workshops. */
export const S38: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const go = cue('পৌঁছতে', -16);
  const draw = interpolate(f, [go, go + 50], [0, 1], clamp);
  const lit = prog(f, cue('আরেকটা কারখানা', -6), 12);
  const A = {x: 470, y: 640};
  const B = {x: 1440, y: 470};
  const path = `M ${A.x} ${A.y} C 760 640, 980 380, ${B.x} ${B.y}`;
  const pt = (t: number) => {
    const mt = 1 - t;
    const x = mt * mt * mt * A.x + 3 * mt * mt * t * 760 + 3 * mt * t * t * 980 + t * t * t * B.x;
    const y = mt * mt * mt * A.y + 3 * mt * mt * t * 640 + 3 * mt * t * t * 380 + t * t * t * B.y;
    return {x, y};
  };
  return (
    <>
      <div style={{position: 'absolute', left: 210, top: 230, width: 1500, height: 700, borderRadius: 26, ...cardBg(world), opacity: prog(f, 0, 12)}} />
      <Layer>
        {/* stylised land, river and the sea: no real map data */}
        <path d="M 260 300 Q 700 250 1100 320 Q 1500 280 1660 360 L 1660 880 Q 1200 900 800 860 Q 500 880 260 840 Z" fill="#2E2A4E" />
        <path d="M 1500 260 Q 1470 420 1500 520 Q 1530 650 1480 900" stroke="#3E5A8A" strokeWidth={26} fill="none" opacity={0.9} />
        <path d="M 1500 260 Q 1470 420 1500 520 Q 1530 650 1480 900" stroke="#5AA9E6" strokeWidth={4} fill="none" opacity={0.5} strokeDasharray="10 14" strokeDashoffset={-f} />
        <path d={path} stroke="#4A4670" strokeWidth={10} fill="none" />
        <path d={path} stroke={C.amber} strokeWidth={5} fill="none" strokeDasharray="16 12" pathLength={1000} strokeDashoffset={0} opacity={draw > 0 ? 1 : 0} style={{strokeDasharray: `${draw * 1000} 1000`}} />
        {[0, 1, 2].map((i) => {
          const t = ((f - go) / 90 + i / 3) % 1;
          if (f < go + 20) return null;
          const q = pt(Math.max(0, t));
          return (
            <g key={i} transform={`translate(${q.x} ${q.y})`}>
              <rect x={-26} y={-12} width={52} height={24} rx={4} fill={C.steelLight} stroke="#fff" strokeWidth={2} />
              <line x1={-20} y1={-4} x2={20} y2={-4} stroke="#fff" strokeWidth={2} opacity={0.6} />
              <line x1={-20} y1={4} x2={20} y2={4} stroke="#fff" strokeWidth={2} opacity={0.6} />
            </g>
          );
        })}
        {/* factories */}
        {[A, B].map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y})`}>
            <circle r={58} fill={i === 1 ? C.amber : C.orange} opacity={i === 1 ? 0.25 + 0.5 * lit : 0.35} />
            <path d="M -34 26 L -34 -6 L -14 -18 L -14 -6 L 6 -18 L 6 -6 L 26 -18 L 26 26 Z" fill="#fff" />
            <rect x={14} y={-40} width={10} height={24} fill="#fff" />
          </g>
        ))}
      </Layer>
      <Chip text="জামশেদপুর" at={6} x={A.x} y={A.y + 100} world={world} size={32} />
      <Chip text="হাওড়া" at={12} x={B.x} y={B.y + 100} world={world} size={32} tone="orange" />
      <Kicker text="কারখানা থেকে কারখানায়" at={4} world={world} y={120} />
      <Sfx name="whoosh" at={go} volume={0.2} />
      <Sfx name="ding" at={cue('আরেকটা কারখানা', -6)} volume={0.25} />
    </>
  );
};

/** S39: three firms become one; the workshop cuts, measures and punches the steel. */
export const S39: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const merge = interpolate(f, [10, 50], [0, 1], {...clamp, easing: easeInOut});
  const lineAt = cue('পাত কাটা', -20);
  const lineO = 0.35 + 0.65 * prog(f, lineAt, 16);
  const names = ['Braithwaite', 'Burn', 'Jessop'];
  const r = rng(3);
  const sparks = Array.from({length: 14}, () => ({a: -Math.PI / 2 + (r() - 0.5) * 2.2, l: 20 + r() * 40}));
  return (
    <>
      {/* name plates merging into one company */}
      <div style={{position: 'absolute', left: 0, top: 230, width: 1920, display: 'flex', justifyContent: 'center', gap: 30 - 30 * merge}}>
        {merge < 0.98 ? (
          names.map((n, i) => (
            <div
              key={n}
              style={{
                padding: '16px 30px',
                borderRadius: 14,
                background: '#fff',
                color: C.ink,
                border: `2px solid ${C.paperLine}`,
                fontFamily: FONT_NUM,
                fontWeight: 600,
                fontSize: 40,
                transform: `translateX(${(1 - i) * 60 * merge}px)`,
                opacity: prog(f, i * 4, 10),
              }}
            >
              {n}
            </div>
          ))
        ) : (
          <div style={{padding: '16px 36px', borderRadius: 14, background: C.orange, color: '#fff', fontFamily: FONT_NUM, fontWeight: 600, fontSize: 44, transform: `scale(${0.9 + 0.1 * pop(f, 50)})`}}>
            Braithwaite, Burn & Jessop
          </div>
        )}
      </div>
      <Chip text={<span style={{fontFamily: FONT_NUM}}>1935</span>} at={52} x={1600} y={265} world={world} tone="orange" size={30} />
      {/* workshop line */}
      <Layer>
        <g opacity={lineO}>
          <rect x={160} y={720} width={1600} height={26} rx={8} fill={C.steel} />
          {Array.from({length: 20}, (_, i) => (
            <circle key={i} cx={180 + ((i * 82 + f * 3) % 1600)} cy={760} r={10} fill={C.steelLight} />
          ))}
          {/* moving plates */}
          {[0, 1, 2, 3, 4].map((i) => {
            const x = ((f * 3 + i * 340) % 1700) + 120;
            const stage = x < 620 ? 0 : x < 1100 ? 1 : 2;
            return (
              <g key={i} transform={`translate(${x} 680)`}>
                <rect x={-110} y={0} width={stage === 0 ? 220 : 170} height={40} rx={4} fill={C.concrete} stroke={C.steel} strokeWidth={3} />
                {stage === 2 && Array.from({length: 6}, (_, k) => <circle key={k} cx={-90 + k * 28} cy={20} r={5} fill={C.ink} />)}
              </g>
            );
          })}
          {/* saw */}
          <g transform="translate(620 620)">
            <rect x={-12} y={-80} width={24} height={80} fill={C.ink} />
            <circle cx={0} cy={40} r={46} fill="none" stroke={C.ink} strokeWidth={6} strokeDasharray="10 6" transform={`rotate(${f * 12} 0 40)`} />
            {sparks.map((sp, i) => {
              const k = ((f / 6 + i / 14) % 1);
              return <line key={i} x1={0} y1={86} x2={Math.cos(sp.a) * sp.l * k} y2={86 + Math.sin(sp.a) * sp.l * k} stroke={C.amber} strokeWidth={3} opacity={1 - k} />;
            })}
          </g>
          {/* punch */}
          <g transform={`translate(1100 ${560 + Math.max(0, Math.sin(f / 5)) * 60})`}>
            <rect x={-40} y={-60} width={80} height={60} rx={6} fill={C.ink} />
            <rect x={-8} y={0} width={16} height={50} fill={C.steel} />
          </g>
          {/* stack */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={1560} y={690 - i * 24} width={170} height={20} rx={3} fill={C.concrete} stroke={C.steel} strokeWidth={2} />
          ))}
        </g>
      </Layer>
      <Chip text="কাটা" at={lineAt + 10} x={620} y={500} world={world} size={28} />
      <Chip text="রিভেটের ছিদ্র" at={lineAt + 20} x={1100} y={460} world={world} size={28} />
      <Chip text="তৈরি টুকরো" at={lineAt + 30} x={1645} y={600} world={world} size={28} tone="orange" />
      <Head text="কাটা, মাপা, [[ছিদ্র]] করা" at={4} world={world} y={70} size={70} />
      {stepFrames(lineAt + 10, 20, Math.max(0, Math.floor((s.dur - lineAt - 10) / 20))).map((t) => (
        <Sfx key={t} name="hammer" at={t} volume={0.08} />
      ))}
    </>
  );
};

/** S40: an exploded K-panel assembles itself, then repeats into a row of panels. */
export const S40: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const asm = interpolate(f, [8, 70], [0, 1], {...clamp, easing: easeInOut});
  const dup = interpolate(f, [cue('ধাঁধা', -30), cue('ধাঁধা', 30)], [0, 1], clamp);
  const cx = 960;
  const cy = 600;
  const w = 300;
  const h = 300;
  const members: [number, number, number, number, number, number][] = [
    // x1,y1,x2,y2, fromDx, fromDy
    [-w / 2, -h / 2, w / 2, -h / 2, 0, -400],
    [-w / 2, h / 2, w / 2, h / 2, 0, 400],
    [-w / 2, -h / 2, -w / 2, h / 2, -500, 0],
    [w / 2, -h / 2, w / 2, h / 2, 500, 0],
    [w / 2, 0, -w / 2, -h / 2, 400, -300],
    [w / 2, 0, -w / 2, h / 2, 400, 300],
  ];
  const panel = (ox: number, op: number, k: number) => (
    <g key={k} transform={`translate(${ox} 0)`} opacity={op}>
      {members.map((m, i) => {
        const t = Math.min(1, Math.max(0, asm * 1.4 - i * 0.08));
        const dx = (1 - t) * m[4];
        const dy = (1 - t) * m[5];
        return <line key={i} x1={cx + m[0] + dx} y1={cy + m[1] + dy} x2={cx + m[2] + dx} y2={cy + m[3] + dy} stroke={i < 2 ? C.steel : C.steelLight} strokeWidth={i < 2 ? 18 : 12} strokeLinecap="round" />;
      })}
      {asm > 0.95 &&
        [
          [-w / 2, -h / 2],
          [w / 2, -h / 2],
          [-w / 2, h / 2],
          [w / 2, h / 2],
          [w / 2, 0],
        ].map((p, i) => <circle key={i} cx={cx + p[0]} cy={cy + p[1]} r={12} fill={C.ink} />)}
    </g>
  );
  return (
    <>
      <Layer>
        <g transform={`translate(${-dup * 412} 0) translate(960 600) scale(${1 - dup * 0.45}) translate(-960 -600)`}>
          {panel(0, 1, 0)}
          {[1, 2, 3, 4, 5].map((k) => panel(k * w, Math.min(1, Math.max(0, dup * 6 - k + 1)), k))}
        </g>
      </Layer>
      {[0, 1, 2, 3].map((i) => (
        <Chip key={i} text={['ওপরের কর্ড', 'নিচের কর্ড', 'খাড়া দণ্ড', 'K-আকারের কোনাকুনি'][i]} at={70 + i * 6} out={cue('ধাঁধা', -36)} x={[960, 960, 690, 1300][i]} y={[380, 820, 600, 600][i]} world={world} size={26} />
      ))}
      <Head text="এক বিশাল লোহার [[ধাঁধা]]" at={4} world={world} y={70} size={72} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Sfx key={i} name="clank" at={14 + i * 9} volume={0.12} />
      ))}
    </>
  );
};
