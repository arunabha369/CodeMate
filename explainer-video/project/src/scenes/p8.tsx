import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Droplets, MessageSquare, Send, Share2, ShieldCheck, TriangleAlert, User} from 'lucide-react';
import {SceneProps, Sfx} from '../kit';
import {C, FONT_BN} from '../theme';
import {clamp, enter, pop, prog} from '../anim';
import {Chip, Head, Headline, Num} from '../ui/text';
import {Calendar, CheckRow} from '../ui/cards';
import {Cursor} from '../ui/app';
import {Layer} from '../ui/svg';
import {OrangeButton, SocialCard, typeText} from '../ui/outro';
import {RiverTrainXS} from './p0';
import {RouteWindow} from './p1';

const Sparkles: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => {
  const f = useCurrentFrame();
  const p = prog(f, at, 24);
  if (p <= 0 || p >= 1) return null;
  return (
    <Layer>
      {new Array(14).fill(0).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const r1 = 170 + p * 90;
        const r2 = r1 + 40 * (1 - p);
        return <line key={i} x1={x + Math.cos(a) * r1} y1={y + Math.sin(a) * r1} x2={x + Math.cos(a) * r2} y2={y + Math.sin(a) * r2} stroke={i % 2 ? C.orange : C.amber} strokeWidth={6} strokeLinecap="round" opacity={1 - p} />;
      })}
    </Layer>
  );
};

export const S49: React.FC<SceneProps> = ({cue}) => (
  <>
    <Calendar month="মার্চ" day="6" year="2024" at={2} x={640} y={540} scale={1.3} />
    <Sparkles x={640} y={540} at={cue('খুলে গেল', -4)} />
    <Chip at={cue('খুলে গেল', -2)} x={1330} y={460} text="খুলে গেল নদীর নিচের অংশ" tone="orange" size={34} />
    <Chip at={cue('ভারতের প্রথম', -2)} x={1330} y={580} text="ভারতের প্রথম নদীর নিচের মেট্রো" size={32} />
    <Sfx name="ding" at={cue('খুলে গেল', -4)} volume={0.35} />
  </>
);

export const S50: React.FC<SceneProps> = ({s, cue}) => {
  const f = useCurrentFrame();
  const trainX = interpolate(f, [0, s.dur], [-300, 1700]);
  const t0 = cue('পার হয়', -20);
  const sec = Math.round(interpolate(f, [t0, s.dur - 10], [0, 45], clamp));
  return (
    <>
      <RiverTrainXS trainX={trainX} />
      <div style={{position: 'absolute', left: 1420, top: 60, padding: '18px 34px', borderRadius: 20, background: 'rgba(14,12,28,0.85)', border: `1.5px solid ${C.cardNightBorder}`, display: 'flex', alignItems: 'baseline', gap: 14, fontFamily: FONT_BN, color: '#fff', opacity: prog(f, t0 - 10, 10)}}>
        <Num size={110} color={C.amber}>
          {String(sec).padStart(2, '0')}
        </Num>
        <span style={{fontSize: 36, fontWeight: 700}}>সেকেন্ড</span>
      </div>
    </>
  );
};

export const S51: React.FC<SceneProps> = ({cue}) => {
  const f = useCurrentFrame();
  const join = cue('জুড়ে গেল', -6);
  const gapFill = prog(f, join, 24);
  return (
    <>
      <RouteWindow at={-40} draw={1} split={1} gapFill={gapFill} title="ইস্ট-ওয়েস্ট মেট্রো" />
      <Calendar month="আগস্ট" day="22" year="2025" at={4} x={1620} y={250} scale={0.6} />
      <Chip at={join + 10} x={991} y={770} text="✓ ফাঁক জুড়ে গেল" tone="green" size={28} />
      <Chip at={cue('একটানা', -4)} x={960} y={130} text="হাওড়া ময়দান ⟷ সেক্টর ফাইভ · একটানা" tone="orange" size={32} />
      <Sfx name="ding" at={join + 10} volume={0.3} />
    </>
  );
};

export const S52: React.FC<SceneProps> = ({cue, world}) => {
  const r = [cue('মাথার ওপর', -4), cue('প্রতি বর্গমিটারে', -4), cue('আর শহরের', -4)];
  const k = [cue('তবু ভেতরে', -2), cue('তবু দেয়াল', -2), cue('কাজ শেষ', -2)];
  return (
    <>
      <Head text="তাহলে [[এক কথায়]]?" at={2} world={world} y={70} />
      <CheckRow at={r[0]} checkAt={k[0]} x={410} y={300} w={1100} icon={<Droplets size={30} />} text="মাথার ওপর নদী, " ok="তবু শুকনো" />
      <CheckRow at={r[1]} checkAt={k[1]} x={410} y={440} w={1100} icon={<ShieldCheck size={30} />} text="প্রতি বর্গমিটারে 30 টন, " ok="তবু অটুট" />
      <CheckRow at={r[2]} checkAt={k[2]} x={410} y={580} w={1100} icon={<TriangleAlert size={30} />} text="শহরের মাটির ধাক্কা, " ok="তবু শেষ হলো" />
      {k.map((c, i) => (
        <Sfx key={i} name="pop" at={c} volume={0.35} />
      ))}
    </>
  );
};

export const S53: React.FC<SceneProps> = ({s}) => {
  const f = useCurrentFrame();
  const trainX = interpolate(f, [0, s.dur], [500, 1000]);
  return <RiverTrainXS trainX={trainX} />;
};

export const S54: React.FC<SceneProps> = ({world, s}) => {
  const f = useCurrentFrame();
  const tStart = 16;
  const tEnd = Math.min(s.dur - 40, 70);
  const text = 'পরের ভিডিও কী নিয়ে?';
  const typed = typeText(text, interpolate(f, [tStart, tEnd], [0, 1], clamp));
  const click = tEnd + 14;
  const e = enter(f, 4, 18, 30, 10);
  const caret = Math.floor(f / 8) % 2 === 0 && f < click;
  return (
    <>
      <Headline text="এরপর কোন জিনিসের [[রহস্য]] জানতে চান?" at={0} world={world} y={90} size={64} />
      <div
        style={{
          position: 'absolute',
          left: 460,
          top: 290,
          width: 1000,
          height: 380,
          borderRadius: 18,
          background: '#fff',
          border: '1.5px solid #E3DDD0',
          boxShadow: '0 24px 70px rgba(30,27,46,0.14)',
          opacity: e.opacity,
          transform: e.transform,
          filter: e.filter,
          fontFamily: FONT_BN,
        }}
      >
        <div style={{height: 50, borderBottom: '1.5px solid #ECE7DC', display: 'flex', alignItems: 'center', gap: 9, padding: '0 18px'}}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
            <div key={c} style={{width: 13, height: 13, borderRadius: 7, background: c}} />
          ))}
        </div>
        <div style={{padding: '26px 40px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 30, fontWeight: 700, color: C.ink}}>
            <MessageSquare size={30} color={C.orange} /> কমেন্ট
          </div>
          <div style={{marginTop: 22, display: 'flex', alignItems: 'center', gap: 16, padding: '18px 22px', borderRadius: 14, background: '#F6EFE3', border: `2px solid ${C.orange}55`, fontSize: 34, fontWeight: 600, color: C.ink, minHeight: 50}}>
            <div style={{width: 46, height: 46, borderRadius: 23, background: '#E8D9C2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.orange}}>
              <User size={26} />
            </div>
            <span>
              {typed}
              {caret && <span style={{color: C.orange}}>|</span>}
            </span>
          </div>
        </div>
      </div>
      <OrangeButton at={tEnd - 6} clickAt={click} x={1300} y={600} text={<><Send size={26} /> পাঠান</>} doneText={<>✓ পাঠানো হয়েছে</>} />
      <Cursor path={[[0, 1600, 960], [click - 16, 1310, 610], [click + 40, 1310, 610]]} clicks={[click]} />
      {new Array(10).fill(0).map((_, i) => (
        <Sfx key={i} name="type" at={tStart + i * ((tEnd - tStart) / 10)} volume={0.35} />
      ))}
      <Sfx name="click" at={click} volume={0.45} />
    </>
  );
};

export const S55: React.FC<SceneProps> = ({s}) => {
  const span = Math.max(60, s.dur - 30);
  const c = [Math.round(span * 0.35), Math.round(span * 0.6), Math.round(span * 0.85)];
  const X = [420, 820, 1220];
  return (
    <>
      <SocialCard kind="fb" name="ফেসবুক" cta="+ ফলো করুন" done="ফলো করা হয়েছে" at={2} clickAt={c[0]} x={X[0]} y={360} />
      <SocialCard kind="ig" name="ইনস্টাগ্রাম" cta="+ ফলো করুন" done="ফলো করা হয়েছে" at={8} clickAt={c[1]} x={X[1]} y={360} />
      <SocialCard kind="yt" name="ইউটিউব" cta="সাবস্ক্রাইব" done="সাবস্ক্রাইবড ✓" at={14} clickAt={c[2]} x={X[2]} y={360} />
      <Cursor
        path={[
          [0, 300, 900],
          [c[0] - 8, X[0] + 140, 626],
          [c[0] + 6, X[0] + 140, 626],
          [c[1] - 8, X[1] + 140, 626],
          [c[1] + 6, X[1] + 140, 626],
          [c[2] - 8, X[2] + 140, 626],
          [c[2] + 40, X[2] + 160, 700],
        ]}
        clicks={c}
      />
      {c.map((k) => (
        <Sfx key={k} name="click" at={k} volume={0.45} />
      ))}
    </>
  );
};

export const S56: React.FC<SceneProps> = ({cue, world, s}) => {
  const f = useCurrentFrame();
  const click = Math.min(s.dur - 100, cue('পাঠিয়ে দিন', 6));
  const trainX = interpolate(f, [0, s.dur], [200, 1300]);
  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: 0.55}}>
        <RiverTrainXS trainX={trainX} variant="paper" />
      </div>
      <div style={{position: 'absolute', inset: 0, background: 'rgba(237,232,221,0.35)'}} />
      <Headline text="রোজ মেট্রোয় গঙ্গা পার হয় যে [[বন্ধু]]" at={4} world={world} y={90} size={70} />
      <OrangeButton at={cue('ভিডিওটা', -6)} clickAt={click} x={960} y={880} size={36} text={<><Share2 size={32} /> শেয়ার করুন</>} doneText={<>✓ শেয়ার করা হলো</>} />
      <Cursor path={[[0, 1500, 980], [click - 16, 975, 890], [click + 60, 1040, 960]]} clicks={[click]} at={cue('ভিডিওটা', -10)} />
      <Sfx name="click" at={click} volume={0.45} />
      <Sfx name="ding" at={click + 6} volume={0.3} />
    </>
  );
};
