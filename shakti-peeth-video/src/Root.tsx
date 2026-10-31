import React from "react";
import { Composition } from "remotion";
import "./fonts";
import { Film, filmDuration } from "./Film";
import { Showcase } from "./showcase/Showcase";
import { Teaser, teaserDuration } from "./Teaser";

const VIDEO = { width: 1920, height: 1080, fps: 30 } as const;

export const RemotionRoot: React.FC = () => (
  <>
    {/* Main film (S01–S67). Unbuilt scenes show as labelled placeholders. */}
    <Composition
      id="ShaktiPeeth"
      component={Film}
      {...VIDEO}
      durationInFrames={filmDuration({ from: 1, to: 67 })}
      defaultProps={{ from: 1, to: 67, captions: false }}
      calculateMetadata={({ props }) => ({ durationInFrames: filmDuration(props) })}
    />
    {/* Same film with burned-in captions (FB version). */}
    <Composition
      id="ShaktiPeethCaptions"
      component={Film}
      {...VIDEO}
      durationInFrames={filmDuration({ from: 1, to: 67 })}
      defaultProps={{ from: 1, to: 67, captions: true }}
      calculateMetadata={({ props }) => ({ durationInFrames: filmDuration(props) })}
    />
    {/* Phase 6 checkpoint: chapters 0–2 (S01–S20), with voice, music and finish. */}
    <Composition
      id="PreviewCh0to2"
      component={Film}
      {...VIDEO}
      durationInFrames={filmDuration({ from: 1, to: 20 })}
      defaultProps={{ from: 1, to: 20, captions: false }}
      calculateMetadata={({ props }) => ({ durationInFrames: filmDuration(props) })}
    />
    {/* Phase 8: vertical teaser for Shorts / Reels. */}
    <Composition id="TeaserVertical" component={Teaser} width={1080} height={1920} fps={30} durationInFrames={teaserDuration()} />
    {/* Phase 5: component showcase. */}
    <Composition id="Showcase" component={Showcase} {...VIDEO} durationInFrames={300} defaultProps={{ demo: "map-full" }} />
  </>
);
