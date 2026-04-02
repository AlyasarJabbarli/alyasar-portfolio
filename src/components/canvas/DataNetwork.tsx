"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { Points as ThreePoints } from "three";
import * as random from "maath/random";

function ParticleField(props: any) {
  const ref = useRef<ThreePoints>(null);
  
  // FIX: 4500 is perfectly divisible by 3 (X, Y, Z for exactly 1500 particles).
  // This prevents the incomplete vertex array that causes the NaN crash.
  const [sphere] = useState(() => random.inSphere(new Float32Array(4500), { radius: 1.5 }));

  useFrame((state, delta) => {
    // Slowly rotate the entire data network
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00F0FF"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function DataNetworkCanvas() {
  return (
    <div className="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
      </Canvas>
    </div>
  );
}