import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Factory, Layers, MessageSquare, Send, Share2, User, Waves} from 'lucide-react';
import {Camera, SceneProps, Sfx} from '../kit';
import {C, FONT_BN} from '../theme';
import {clamp, enter, prog} from '../anim';
import {Headline} from '../ui/text';
import {CheckRow} from '../ui/cards';
import {Cursor} from '../ui/app';
import {Layer} from '../ui/svg';
import {PhotoCard} from '../ui/extra';
import {OrangeButton, SocialCard, typeText} from '../ui/outro';
import {bridgeSpace, HowrahBridge} from '../hero/HowrahBridge';
import {HOOK_BRIDGE} from './p0';

/** S62: recap checklist. */
export const S62: React.FC<SceneProps> = ({cue, world}) => {
  const r = [cue('নদীতে খুঁটি', -6), cue('মাটি নরম', -6), cue('যুদ্ধের মধ্যে', -6)];
  const k = [cue('তাই ক্যান্টিলিভার', -2), cue('তাই প্রায়', -2), cue('শূন্যে মেলানো', -2)];
  return (
    <>
      <Headline text="তাহলে [[এক কথায়]]" at={2} world={world} y={90} size={72} />
      <CheckRow at={r[0]} checkAt={k[0]} x={360} y={300} w={1200} icon={<Waves size={30} />} text="নদীতে খুঁটি চলবে না → " ok="ক্যান্টিলিভার" />
      <CheckRow at={r[1]} checkAt={k[1]} x={360} y={440} w={1200} icon={<Layers size={30} />} text="নরম মাটি → " ok="~30 মি গভীর কেসন" />
      <CheckRow at={r[2]} checkAt={k[2]} x={360} y={580} w={1200} icon={<Factory size={30} />} text="যুদ্ধের মধ্যে → " ok="দেশের ইস্পাতে মেলানো দুটো হাত" />
      {k.map((c, i) => (
        <Sfx key={i} name="pop" at={c} volume={0.35} />
      ))}
    </>
  );
};

/** S63: bookend: the hook shot, now finished and alive; push into the joint, then the real photo. */
export const S63: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const sp = bridgeSpace(HOOK_BRIDGE);
  const look = cue('মাঝখানটায়', -10);
  const ring = prog(f, look, 16);
  const photoAt = cue('দুটো হাত', -10);
  const cy = sp.top(0) + 10;
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 540, z: 1.0},
          {f: look, x: 960, y: 540, z: 1.0},
          {f: look + 60, x: 960, y: cy + 30, z: 1.8},
          {f: s.dur + 12, x: 960, y: cy + 30, z: 1.9},
        ]}
      >
        <Layer>
          <HowrahBridge {...HOOK_BRIDGE} theme="night" parts={{lights: 1}} traffic reflection />
          <circle cx={960} cy={cy + 10} r={40 + 10 * Math.sin(f / 8)} fill="none" stroke={C.amber} strokeWidth={5} opacity={ring} />
          <circle cx={960} cy={cy + 10} r={70 + 14 * Math.sin(f / 8)} fill="none" stroke={C.amber} strokeWidth={2} opacity={ring * 0.5} />
        </Layer>
      </Camera>
      <PhotoCard slot="P06" x={360} y={180} w={1200} h={660} at={photoAt} grade="none" dur={s.dur - photoAt} />
      <Headline text="ঠিক [[এইখানে]] মিলেছিল" at={look} world={world} y={90} size={74} />
      <Sfx name="ding" at={look + 10} volume={0.25} />
    </>
  );
};

/** S64: comment box: which landmark next? */
export const S64: React.FC<SceneProps> = ({s, world}) => {
  const f = useCurrentFrame();
  const tStart = 20;
  const tEnd = Math.min(s.dur - 50, 90);
  const text = 'বিদ্যাসাগর সেতু…';
  const typed = typeText(text, interpolate(f, [tStart, tEnd], [0, 1], clamp));
  const click = tEnd + 14;
  const e = enter(f, 4, 18, 30, 10);
  const caret = Math.floor(f / 8) % 2 === 0 && f < click;
  return (
    <>
      <Headline text="পরের ভিডিও [[কী]] নিয়ে?" at={0} world={world} y={90} size={72} />
      <div style={{position: 'absolute', left: 460, top: 290, width: 1000, height: 380, borderRadius: 18, background: '#fff', border: '1.5px solid #E3DDD0', boxShadow: '0 24px 70px rgba(30,27,46,0.14)', opacity: e.opacity, transform: e.transform, filter: e.filter, fontFamily: FONT_BN}}>
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

/** S65: share with the friend who crosses the bridge every day, then follow, then the end-screen hold. */
export const S65: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const share = Math.max(24, cue('পাঠিয়ে দিন', 12));
  const cardsIn = share + 40;
  const end = Math.max(cardsIn + 90, s.dur - 90);
  const avail = Math.max(60, end - cardsIn - 30);
  const c = [0.2, 0.45, 0.7].map((k) => Math.round(cardsIn + 16 + avail * k));
  const X = [420, 820, 1220];
  const endO = prog(f, end, 20);
  const cardsO = prog(f, cardsIn, 12) * (1 - endO);
  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: 0.4 + 0.6 * endO}}>
        <Layer>
          <HowrahBridge {...HOOK_BRIDGE} theme="night" parts={{lights: 1}} traffic reflection />
        </Layer>
      </div>
      <div style={{position: 'absolute', inset: 0, opacity: 1 - prog(f, cardsIn - 10, 12)}}>
        <Headline text="রোজ হাওড়া ব্রিজ পার হয় যে [[বন্ধু]]" at={2} world={world} y={260} size={70} />
        <OrangeButton at={8} clickAt={share} x={960} y={560} size={38} text={<><Share2 size={34} /> শেয়ার করুন</>} doneText={<>✓ শেয়ার করা হলো</>} />
      </div>
      <div style={{position: 'absolute', inset: 0, opacity: cardsO}}>
        <SocialCard kind="fb" name="ফেসবুক" cta="+ ফলো করুন" done="ফলো করা হয়েছে" at={cardsIn} clickAt={c[0]} x={X[0]} y={300} />
        <SocialCard kind="ig" name="ইনস্টাগ্রাম" cta="+ ফলো করুন" done="ফলো করা হয়েছে" at={cardsIn + 6} clickAt={c[1]} x={X[1]} y={300} />
        <SocialCard kind="yt" name="ইউটিউব" cta="সাবস্ক্রাইব" done="সাবস্ক্রাইবড ✓" at={cardsIn + 12} clickAt={c[2]} x={X[2]} y={300} />
      </div>
      <Cursor
        path={[
          [0, 1500, 980],
          [share - 16, 975, 570],
          [share + 10, 985, 575],
          [c[0] - 10, X[0] + 140, 566],
          [c[0] + 6, X[0] + 140, 566],
          [c[1] - 10, X[1] + 140, 566],
          [c[1] + 6, X[1] + 140, 566],
          [c[2] - 10, X[2] + 140, 566],
          [c[2] + 30, X[2] + 170, 700],
        ]}
        clicks={[share, ...c]}
        out={end}
      />
      <div style={{position: 'absolute', left: 0, width: 1920, top: 150, textAlign: 'center', fontFamily: FONT_BN, fontWeight: 700, fontSize: 64, color: '#fff', opacity: endO}}>
        দেখার জন্য <span style={{color: C.amber}}>ধন্যবাদ</span>
      </div>
      {[share, ...c].map((k) => (
        <Sfx key={k} name="click" at={k} volume={0.45} />
      ))}
      <Sfx name="ding" at={share + 6} volume={0.25} />
    </>
  );
};
