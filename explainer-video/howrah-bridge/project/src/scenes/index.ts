import React from 'react';
import {BgFx, SceneProps} from '../kit';
import {SCRIPT} from '../script.generated';
import * as p0 from './p0';
import * as p1 from './p1';
import * as p2 from './p2';
import * as p3 from './p3';
import * as p4 from './p4';
import * as p5 from './p5';
import * as p6 from './p6';
import * as p7 from './p7';
import * as p8 from './p8';
import * as p9 from './p9';

const all: Record<string, unknown> = {...p0, ...p1, ...p2, ...p3, ...p4, ...p5, ...p6, ...p7, ...p8, ...p9};
export const SCENES: Record<string, React.FC<SceneProps>> = Object.fromEntries(
  Object.entries(all).filter(([k]) => /^S\d\d$/.test(k)),
) as Record<string, React.FC<SceneProps>>;

/** Optional per-scene background effects, exported from a scene file as `S54_bg`. */
export const BGFX: Record<string, BgFx> = Object.fromEntries(
  Object.entries(all)
    .filter(([k]) => /^S\d\d_bg$/.test(k))
    .map(([k, v]) => [k.slice(0, 3), v as BgFx]),
);

const missing = SCRIPT.map((s) => s.id).filter((id) => !SCENES[id]);
if (missing.length) console.warn('Scenes without a component:', missing.join(', '));
