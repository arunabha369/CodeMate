import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { BrollClip } from "../components/BrollClip";
import { CaptionLayer } from "../components/CaptionLayer";
import { ChakraSpin } from "../components/ChakraSpin";
import { ChapterCard } from "../components/ChapterCard";
import { CountCards } from "../components/CountCards";
import { DialogueCard } from "../components/DialogueCard";
import { DiyaRow } from "../components/DiyaRow";
import { FamilyLinks } from "../components/FamilyLinks";
import { Headline } from "../components/Headline";
import { LowerThird } from "../components/LowerThird";
import { MahavidyaRing } from "../components/MahavidyaRing";
import { PaintingFrame } from "../components/PaintingFrame";
import { ParticleLayer } from "../components/ParticleLayer";
import { PeethGrid } from "../components/PeethGrid";
import { PeethMap } from "../components/PeethMap";
import { PhotoKenBurns } from "../components/PhotoKenBurns";
import { QuoteCard } from "../components/QuoteCard";
import { ShaktiBhairavaCard } from "../components/ShaktiBhairavaCard";
import { StatCounter } from "../components/StatCounter";
import { LOCATED } from "../lib/peeths";
import { LightLeak } from "../components/LightLeak";
import { layout } from "../theme";

export type ShowcaseProps = { demo: string };

const WB = LOCATED.filter((p) => p.regionBn === "পশ্চিমবঙ্গ").map((p) => p.id);
const BD = LOCATED.filter((p) => p.regionBn === "বাংলাদেশ").map((p) => p.id);
const Center: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>{children}</AbsoluteFill>
);

/** One demo per component (render with --props='{"demo":"…"}'). */
export const Showcase: React.FC<ShowcaseProps> = ({ demo }) => {
  switch (demo) {
    case "night":
      return (
        <AbsoluteFill>
          <Background variant="night" />
          <ParticleLayer kind="embers" count={70} />
          <Center>
            <Headline text="৫১ সতীপীঠ — পুরো কাহিনি" highlight="৫১" highlightColor="sindoor" kicker="পুরাণ, তন্ত্র ও প্রচলিত বিশ্বাস অবলম্বনে" />
          </Center>
        </AbsoluteFill>
      );
    case "parchment":
      return (
        <AbsoluteFill>
          <Background variant="parchment" />
          <PaintingFrame label="Court miniature (PD)" credit="সৌজন্য: The Met, Public Domain" durationInFrames={150} box={{ x: 140, y: 110, w: 900, h: 780 }} />
          <FamilyLinks nodes={[{ label: "ব্রহ্মা", at: 0 }, { label: "দক্ষ", sub: "প্রজাপতি", at: 10 }, { label: "সতী", sub: "দাক্ষায়ণী", at: 20 }]} partner={{ label: "শিব", at: 30 }} x={1580} top={200} />
        </AbsoluteFill>
      );
    case "gold":
      return (
        <AbsoluteFill>
          <Background variant="gold" />
          <ShaktiBhairavaCard leftAt={0} rightAt={10} example={{ place: "কালীঘাট", shakti: "কালিকা", bhairava: "নকুলেশ্বর", at: 20 }} />
        </AbsoluteFill>
      );
    case "chapter":
      return <ChapterCard number={6} title="শক্তি, ভৈরব আর সংখ্যার রহস্য" durationInFrames={90} />;
    case "chapter-red":
      return <ChapterCard number={4} title="বীরভদ্র" variant="red" durationInFrames={90} />;
    case "map-full":
      return (
        <AbsoluteFill>
          <Background variant="night" />
          <PeethMap showNote showTray highlight={["kalighat", "kamakhya", "hinglaj", "lanka", "manas"]} />
        </AbsoluteFill>
      );
    case "map-wb":
      return (
        <AbsoluteFill>
          <Background variant="gold" />
          <PeethMap variant="gold" camera={{ lon: 88.3, lat: 24.4, zoom: 4.6 }} highlight={WB} labelHighlights={false} labels={["kalighat", "trisrota", "kiriteswari", "vibhash"]} labelSize={28} showNote />
        </AbsoluteFill>
      );
    case "map-birbhum":
      return (
        <AbsoluteFill>
          <Background variant="gold" />
          <PeethMap
            variant="gold"
            camera={{ lon: 87.75, lat: 23.95, zoom: 16 }}
            highlight={["bakreshwar", "nalhati", "kankalitala", "nandipur", "attahas"]}
            labelSize={36}
          />
        </AbsoluteFill>
      );
    case "map-bd":
      return (
        <AbsoluteFill>
          <Background variant="night" />
          <PeethMap camera={{ lon: 90.4, lat: 23.6, zoom: 4.2 }} highlight={[...BD, "kanyashram"]} showNote />
        </AbsoluteFill>
      );
    case "map-rain":
      return (
        <AbsoluteFill>
          <Background variant="night" />
          <PeethMap rainIn={{ start: 0, perDot: 3 }} showNote />
        </AbsoluteFill>
      );
    case "map-thread":
      return (
        <AbsoluteFill>
          <Background variant="night" />
          <PeethMap thread={{ start: 0, duration: 120 }} showNote />
        </AbsoluteFill>
      );
    case "map-temples":
      return (
        <AbsoluteFill>
          <Background variant="night" />
          <PeethMap templesAt={0} box={{ x: 760, y: 0, w: 1160, h: 1080 }} />
          <AbsoluteFill style={{ justifyContent: "center", paddingLeft: layout.safe }}>
            <Headline text="সতীপীঠ = শক্তিপীঠ" highlight="শক্তিপীঠ" align="left" maxWidth={700} />
          </AbsoluteFill>
        </AbsoluteFill>
      );
    case "map-cracks":
      return (
        <AbsoluteFill>
          <Background variant="night" red />
          <PeethMap dots="none" cracksAt={0} shake={{ start: 0, amplitude: 8 }} />
        </AbsoluteFill>
      );
    case "photo-inset":
      return (
        <AbsoluteFill>
          <PhotoKenBurns label="Jwalamukhi temple, Kangra" durationInFrames={150} />
          <PeethMap box={{ x: 1360, y: 560, w: 480, h: 440 }} camera={{ lon: 79, lat: 24, zoom: 1.1 }} highlight={["jwalamukhi"]} labelSize={26} border />
          <LowerThird title="জ্বালামুখী · কাংড়া" subtitle="মূর্তি নেই · শিখাই মা" />
        </AbsoluteFill>
      );
    case "grid":
      return (
        <AbsoluteFill>
          <Background variant="gold" />
          <PeethGrid start={0} stagger={1} />
        </AbsoluteFill>
      );
    case "ring":
      return (
        <AbsoluteFill>
          <Background variant="night" />
          <MahavidyaRing start={0} gap={4} titleAt={30} />
        </AbsoluteFill>
      );
    case "ring-kali":
      return (
        <AbsoluteFill>
          <Background variant="night" />
          <MahavidyaRing start={0} gap={0} focusKaliAt={0} />
        </AbsoluteFill>
      );
    case "chakra":
      return (
        <AbsoluteFill>
          <Background variant="night" />
          <ChakraSpin start={0} />
        </AbsoluteFill>
      );
    case "counts":
      return (
        <AbsoluteFill>
          <Background variant="gold" />
          <CountCards
            start={0}
            gap={6}
            cards={[
              { value: "৫১", label: "পীঠনির্ণয় তন্ত্র" },
              { value: "৫২", label: "বাংলার প্রচলিত মত" },
              { value: "৬৪", label: "অন্য মত" },
              { value: "১০৮", label: "দেবীভাগবত পুরাণ" },
            ]}
          />
        </AbsoluteFill>
      );
    case "count-single":
      return (
        <AbsoluteFill>
          <Background variant="gold" />
          <CountCards big cards={[{ value: "১৮", label: "অষ্টাদশ মহাশক্তিপীঠ", note: "শঙ্করাচার্যের নামে প্রচলিত" }]} />
        </AbsoluteFill>
      );
    case "dialogue":
      return (
        <AbsoluteFill>
          <Background variant="night" />
          <DialogueCard
            left={{ name: "সতী", icon: "lotus" }}
            right={{ name: "শিব", icon: "trishul" }}
            lines={[
              { side: "left", text: "যেতে চাই", at: 0 },
              { side: "right", text: "বিনা নিমন্ত্রণে গেলে অপমানই জুটবে", at: 10 },
            ]}
          />
        </AbsoluteFill>
      );
    case "quote":
      return (
        <AbsoluteFill>
          <Background variant="night" />
          <Center>
            <QuoteCard text="যে দেহ তোমার থেকে পেয়েছি, সেই দেহ আমি আর রাখব না" attribution="সতী" />
          </Center>
        </AbsoluteFill>
      );
    case "lowerthird":
      return (
        <AbsoluteFill>
          <PhotoKenBurns label="Kalighat Kali temple" durationInFrames={150} />
          <LowerThird title="কালীঘাট · কলকাতা" subtitle="শক্তি কালিকা · ভৈরব নকুলেশ্বর" chip="আদিগঙ্গার তীর" />
        </AbsoluteFill>
      );
    case "stat":
      return (
        <AbsoluteFill>
          <Background variant="night" />
          <PeethMap dotOpacity={0.6} />
          <AbsoluteFill style={{ justifyContent: "center", paddingLeft: 200 }}>
            <StatCounter value={51} label="পবিত্র স্থান" />
          </AbsoluteFill>
        </AbsoluteFill>
      );
    case "diya-out":
      return (
        <AbsoluteFill>
          <Background variant="night" stars={false} />
          <DiyaRow count={1} y={640} size={1.6} outAt={10} />
        </AbsoluteFill>
      );
    case "broll-captions":
      return (
        <AbsoluteFill>
          <BrollClip label="rows of diyas being lit" vignette="red" />
          <ParticleLayer kind="petals" count={40} />
          <CaptionLayer
            text="শুরু করা যাক কলকাতা দিয়ে। আদিগঙ্গার তীরে কালীঘাট, যেখানে পড়েছিল মায়ের ডান পায়ের আঙুল। শক্তি কালিকা, ভৈরব নকুলেশ্বর।"
            durationInFrames={300}
          />
        </AbsoluteFill>
      );
    case "lightleak":
      return (
        <AbsoluteFill>
          <Background variant="night" />
          <Center>
            <Headline text="৫১ সতীপীঠ" highlight="৫১" highlightColor="sindoor" />
          </Center>
          <LightLeak seed={3} />
        </AbsoluteFill>
      );
    default:
      return (
        <AbsoluteFill style={{ backgroundColor: "red" }}>
          <Center>unknown demo: {demo}</Center>
        </AbsoluteFill>
      );
  }
};
