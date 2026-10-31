import React from "react";
import { cue, sceneTiming } from "../lib/timing";
import { MapStop } from "./MapStop";

const ID = "S45";

/** Kamakhya, Nilachal hill, Guwahati. */
export const S45: React.FC = () => (
  <MapStop
    peeth="kamakhya"
    label="কামাখ্যা"
    zoom={4.5}
    flyEnd={cue(ID, "গুয়াহাটি", 6)}
    photoKey="photo-kamakhya"
    photoAt={cue(ID, "নীলাচল", 0)}
    durationInFrames={sceneTiming(ID).frames}
    title="কামাখ্যা · নীলাচল, গুয়াহাটি"
    subtitle="অসম"
  />
);
