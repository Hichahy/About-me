'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min';

export const VantaHalo = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect = null;

    if (vantaRef.current) {
      vantaEffect = HALO({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        baseColor: 0x000000,
        backgroundColor: 0x000000,
        amplitudeFactor: 0,
      });
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={vantaRef} style={{ width: '100vw', height: '100vh' }} />;
};
