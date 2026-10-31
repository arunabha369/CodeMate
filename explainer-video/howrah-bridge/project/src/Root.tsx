import React from 'react';
import {Composition, Still} from 'remotion';
import {Main} from './Main';
import {TOTAL_FRAMES} from './timing';
import {FPS, H, W} from './theme';

export const Root: React.FC = () => (
  <>
    <Composition id="Main" component={Main} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
  </>
);
