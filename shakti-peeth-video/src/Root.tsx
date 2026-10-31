import React from "react";
import { Composition } from "remotion";
import "./fonts";
import { Showcase } from "./showcase/Showcase";

export const RemotionRoot: React.FC = () => (
  <>
    {/* Phase 5: component showcase. The main "ShaktiPeeth" composition is added in Phase 6. */}
    <Composition
      id="Showcase"
      component={Showcase}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={300}
      defaultProps={{ demo: "map-full" }}
    />
  </>
);
