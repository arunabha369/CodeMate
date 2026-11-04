import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Medal} from 'lucide-react';
import {Camera, SceneProps, Sfx} from '../kit';
import {C, FONT_BN, FONT_NUM} from '../theme';
import {clamp, easeInOut, pop, prog} from '../anim';
import {Chip, Head} from '../ui/text';
import {YearCounter} from '../ui/cards';
import {Layer} from '../ui/svg';
import {PhotoCard} from '../ui/extra';
import {HowrahBridge} from '../hero/HowrahBridge';
import {HOOK_BRIDGE} from './p0';

/** S59: 1965: the nameplate flips from New Howrah Bridge to Rabindra Setu. */
export const S59: React.FC<SceneProps> = ({s, cue, world}) => {
  const f = useCurrentFrame();
  const flip = cue('রবীন্দ্র সেতু', -14);
  const a = interpolate(f, [flip, flip + 20], [0, 180], {...clamp, easing: easeInOut});
  const front = a < 90;
  const still = cue('আজও', -8);
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 540, z: 1.0},
          {f: s.dur + 12, x: 960, y: 530, z: 1.05},
        ]}
      >
        <Layer>
          <HowrahBridge {...HOOK_BRIDGE} theme="night" parts={{lights: 1}} traffic reflection />
        </Layer>
      </Camera>
      <PhotoCard slot="P04" x={1360} y={560} w={460} h={300} at={10} grade="night" dur={s.dur} rot={2} />
      <div style={{position: 'absolute', left: 960, top: 360, transform: `translate(-50%, -50%) perspective(1200px) rotateX(${front ? a : a - 180}deg)`}}>
        <div style={{padding: '26px 60px', borderRadius: 16, background: front ? '#1E5A3A' : '#1B3D6E', border: '6px solid #E9E2C8', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', fontFamily: FONT_BN, fontWeight: 700, fontSize: 82, color: '#F4EED8', whiteSpace: 'nowrap'}}>
          {front ? 'নিউ হাওড়া ব্রিজ' : 'রবীন্দ্র সেতু'}
        </div>
      </div>
      <Chip text={<span style={{fontFamily: FONT_NUM}}>14 জুন 1965</span>} at={flip + 22} x={960} y={500} world={world} tone="orange" size={32} />
      <Chip text="আমাদের কাছে আজও — হাওড়া ব্রিজ" at={still} x={960} y={880} world={world} size={30} />
      <Head kicker="নতুন নাম" text="[[রবীন্দ্র সেতু]]" at={flip + 10} world={world} y={60} size={72} />
      <Sfx name="whoosh" at={flip} volume={0.25} />
      <Sfx name="ding" at={flip + 20} volume={0.25} />
    </>
  );
};

/** S60: the world's 3rd-longest cantilever bridge in 1943; 6th today. */
export const S60: React.FC<SceneProps> = ({cue, world}) => {
  const f = useCurrentFrame();
  const third = cue('তৃতীয়', -10);
  const sixth = cue('আজও', -6);
  const slide = interpolate(f, [sixth, sixth + 20], [0, 1], {...clamp, easing: easeInOut});
  const card = (x: number, year: string, rank: string, label: string, at: number, hi: boolean) => {
    const p = pop(f, at);
    return (
      <div style={{position: 'absolute', left: x, top: 320, width: 560, height: 480, borderRadius: 26, background: 'rgba(36,32,61,0.94)', border: `2px solid ${hi ? C.amber : C.cardNightBorder}`, boxShadow: '0 24px 60px rgba(0,0,0,0.45)', transform: `scale(${0.7 + 0.3 * p})`, opacity: prog(f, at, 8), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: FONT_BN, color: '#fff'}}>
        <Medal size={70} color={hi ? C.amber : '#B9BCD6'} />
        <div style={{fontFamily: FONT_NUM, fontWeight: 600, fontSize: 40, color: '#B9BCD6'}}>{year}</div>
        <div style={{fontFamily: FONT_NUM, fontWeight: 600, fontSize: 170, lineHeight: 1, color: hi ? C.amber : '#fff'}}>{rank}</div>
        <div style={{fontWeight: 700, fontSize: 30, textAlign: 'center', padding: '0 30px'}}>{label}</div>
      </div>
    );
  };
  return (
    <>
      <div style={{position: 'absolute', inset: 0, opacity: 0.35}}>
        <Layer>
          <HowrahBridge {...HOOK_BRIDGE} theme="night" parts={{lights: 0.8}} depth={false} />
        </Layer>
      </div>
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${-300 * slide}px)`}}>{card(680, '1943', '#3', 'বিশ্বের দীর্ঘতম ক্যান্টিলিভার সেতুর তালিকায়', third, true)}</div>
      {f >= sixth && card(1120, 'আজ', '#6', 'এই ধরনের সেতুর মধ্যে বিশ্বে', sixth + 4, false)}
      <Head text="বিশ্বের [[সেরাদের]] তালিকায়" at={4} world={world} y={70} size={70} />
      <Sfx name="pop" at={third} volume={0.3} />
      <Sfx name="pop" at={sixth + 4} volume={0.3} />
    </>
  );
};

/** S61: 1943 → today: more than 80 years of holding two cities together. */
export const S61: React.FC<SceneProps> = ({s, world}) => {
  const f = useCurrentFrame();
  return (
    <>
      <Camera
        keys={[
          {f: 0, x: 960, y: 540, z: 1.06},
          {f: s.dur + 12, x: 960, y: 540, z: 1.0},
        ]}
      >
        <Layer>
          <HowrahBridge {...HOOK_BRIDGE} theme="night" parts={{lights: 1}} traffic reflection />
        </Layer>
      </Camera>
      <PhotoCard slot="P05" x={1300} y={150} w={520} h={340} at={20} grade="night" dur={s.dur} rot={-2} />
      <div style={{position: 'absolute', left: 140, top: 140, padding: '30px 40px', borderRadius: 24, background: 'rgba(14,12,28,0.7)'}}>
        <YearCounter from={1943} to={2026} at={8} x={0} y={0} label="আশি বছরেরও বেশি" world={world} />
        <div style={{width: 560, height: 300}} />
      </div>
      <Chip text={<span style={{fontFamily: FONT_NUM, fontSize: 36}}>80+ বছর</span>} at={60} x={1000} y={300} world={world} tone="orange" size={34} />
      <Sfx name="tick" at={8} volume={0.2} />
      <Sfx name="ding" at={56} volume={0.25} />
    </>
  );
};
