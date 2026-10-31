import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Factory, Ship} from 'lucide-react';
import {SceneProps, Sfx} from '../kit';
import {C, FONT_BN, FONT_NUM} from '../theme';
import {clamp, countUp, fmtIN, pop} from '../anim';
import {Head} from '../ui/text';
import {AppWindow, Cursor, ProgressBar} from '../ui/app';
import {HowrahBridge} from '../hero/HowrahBridge';
import {Layer} from '../ui/svg';

const TOTAL = 26500;

const Row: React.FC<{icon: React.ReactNode; name: string; sub: string; value: number; frac: number; color: string; chip?: React.ReactNode; y: number; active?: number; shake?: number}> = ({
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

const Pill: React.FC<{text: string; color: string; bg: string; s: number}> = ({text, color, bg, s}) => (
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

