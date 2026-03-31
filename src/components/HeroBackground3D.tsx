import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';

const AnimatedShape = () => {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere args={[1, 100, 200]} scale={2.5}>
                <MeshDistortMaterial
                    color="#4f46e5"
                    attach="material"
                    distort={0.5}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
};

const HeroBackground3D = () => {
    return (
        <div className="absolute inset-0 z-0 opacity-40">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} color="#ec4899" intensity={1} />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <AnimatedShape />
            </Canvas>
        </div>
    );
};

export default HeroBackground3D;
