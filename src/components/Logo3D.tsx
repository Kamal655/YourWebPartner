
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const AnimatedSphere = () => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} scale={0.8}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#8B5CF6"
        roughness={0.1}
        metalness={0.2}
      />
    </mesh>
  );
};

const Logo3D = () => {
  return (
    <div className="w-16 h-16 relative cursor-pointer">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
};

export default Logo3D;
