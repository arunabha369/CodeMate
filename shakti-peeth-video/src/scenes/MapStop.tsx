import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { LowerThird } from "../components/LowerThird";
import { PeethMap } from "../components/PeethMap";
import { PhotoKenBurns } from "../components/PhotoKenBurns";
import { asset } from "../lib/assets";
import { byId } from "../lib/peeths";
import { colors, fonts } from "../theme";
import { Chip } from "./shared";

/** Map px per degree at zoom 1 for the brief's frame (≈ 27); used to offset the camera. */
const PX_PER_DEG = 27;

/**
 * Pilgrimage stop: the map flies from the full view to one peeth, which
 * lights up; then a photo card opens on the left while the map stays on the
 * right; a lower-third names the place.
 */
export const MapStop: React.FC<{
  peeth: string;
  label: string;
  zoom: number;
  flyEnd: number;
  photoKey: string;
  photoAt: number;
  durationInFrames: number;
  title: string;
  subtitle?: string;
  chip?: { text: string; at: number };
}> = ({ peeth, label, zoom, flyEnd, photoKey, photoAt, durationInFrames, title, subtitle, chip }) => {
  const frame = useCurrentFrame();
  const p = byId(peeth);
  const lon = p.lon as number;
  const lat = p.lat as number;
  // Keep the target dot on the right third once the photo card is open.
  const shift = 470 / (PX_PER_DEG * zoom);
  const photo = asset(photoKey);
  const open = interpolate(frame, [photoAt, photoAt + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
  return (
    <AbsoluteFill>
      <Background variant="night" />
      <PeethMap
        camera={[
          { frame: 0, lon: 80, lat: 22.5, zoom: 1 },
          { frame: flyEnd, lon, lat, zoom },
          { frame: photoAt + 20, lon: lon - shift, lat, zoom },
          { frame: durationInFrames, lon: lon - shift, lat, zoom: zoom * 1.06 },
        ]}
        highlight={[peeth]}
        highlightAt={[flyEnd - 12]}
        labelText={{ [peeth]: label }}
        labelSize={38}
      />
      <div style={{ position: "absolute", inset: 0, opacity: open, translate: `${(1 - open) * -60}px 0px` }}>
        <PhotoKenBurns src={photo.src} label={photo.label} durationInFrames={durationInFrames - photoAt} start={photoAt} box={{ x: 80, y: 110, w: 1040, h: 660 }} radius={22} credit={photo.credit || undefined} />
      </div>
      {frame >= photoAt ? <LowerThird title={title} subtitle={subtitle} start={photoAt + 12} /> : null}
      {chip ? <Chip text={chip.text} at={chip.at} x={1280} y={130} font={fonts.body} color={colors.cream} border={colors.gold} bgColor="rgba(10,9,16,0.75)" /> : null}
    </AbsoluteFill>
  );
};
