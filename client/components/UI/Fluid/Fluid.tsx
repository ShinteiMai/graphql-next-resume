import React, { useRef, useMemo, useState } from 'react';
import { TComponent } from '@components/types';
import { Canvas, useFrame } from 'react-three-fiber';
import { EffectComposer, SSAO } from 'react-postprocessing';
import Swarm from './Swarm';

interface Props extends TComponent {}

const Fluid = ({}: Props) => {
  return (
    <Canvas
      shadowMap
      gl={{ alpha: false, antialias: false }}
      camera={{ fov: 75, position: [0, 0, 70], near: 10, far: 150 }}
      onCreated={(state) => state.gl.setClearColor('#f0f0f0')}
    >
      <ambientLight intensity={1.5} />
      <pointLight position={[100, 100, 100]} intensity={2} castShadow />
      <pointLight position={[-100, -100, -100]} intensity={5} color="red" />
      <Swarm count={150} />
      <EffectComposer multisampling={0}>
        <SSAO
          samples={31}
          radius={20}
          intensity={40}
          luminanceInfluence={0.1}
          color="black"
        />
      </EffectComposer>
    </Canvas>
  );
};

export default Fluid;
