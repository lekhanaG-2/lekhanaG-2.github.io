'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group, Mesh, Points } from 'three';
import * as THREE from 'three';

const coreColours = ['#2563EB', '#06B6D4', '#7C3AED', '#2A9D6F'];

function createParticlePositions() {
  const positions = new Float32Array(330 * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let index = 0; index < 330; index += 1) {
    const ratio = (index + 0.5) / 330;
    const radius = 0.42 + (((index * 37) % 101) / 101) * 1.28;
    const y = 1 - 2 * ratio;
    const horizontalRadius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * index;
    positions[index * 3] = radius * horizontalRadius * Math.cos(theta);
    positions[index * 3 + 1] = radius * y;
    positions[index * 3 + 2] = radius * horizontalRadius * Math.sin(theta);
  }
  return positions;
}

function createNeuralPositions() {
  const values: number[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let index = 0; index < 52; index += 1) {
    const ratio = (index + 0.5) / 52;
    const y = 1 - 2 * ratio;
    const horizontalRadius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * index;
    const startRadius = 0.72 + (((index * 17) % 41) / 41) * 0.5;
    const endRadius = 0.84 + (((index * 29) % 31) / 31) * 0.25;
    const start = new THREE.Vector3(
      horizontalRadius * Math.cos(theta),
      y,
      horizontalRadius * Math.sin(theta),
    ).multiplyScalar(startRadius);
    const endTheta = theta + 0.62;
    const end = new THREE.Vector3(
      horizontalRadius * Math.cos(endTheta),
      y * 0.7,
      horizontalRadius * Math.sin(endTheta),
    ).multiplyScalar(endRadius);
    values.push(start.x, start.y, start.z, end.x, end.y, end.z);
  }
  return new Float32Array(values);
}

const particlePositions = createParticlePositions();
const neuralPositions = createNeuralPositions();

function EnergyCore({
  activeProject,
  moving,
}: {
  activeProject: number;
  moving: boolean;
}) {
  const group = useRef<Group>(null);
  const shell = useRef<Mesh>(null);
  const particles = useRef<Points>(null);
  const colour = coreColours[activeProject] ?? coreColours[0];

  useFrame((state, delta) => {
    if (!group.current || !moving) return;
    const targetX = THREE.MathUtils.degToRad(state.pointer.y * 4);
    const targetY = THREE.MathUtils.degToRad(state.pointer.x * 4);
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.035,
    );
    group.current.rotation.y += delta * (0.085 + activeProject * 0.01);
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -targetY * 0.35,
      0.035,
    );
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.07;
      shell.current.rotation.x += delta * 0.025;
    }
    if (particles.current) {
      particles.current.rotation.y += delta * (0.08 + activeProject * 0.025);
      particles.current.rotation.z -= delta * 0.025;
    }
  });

  return (
    <group ref={group} position={[0, 0.2, 0]}>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.62, 3]} />
        <meshPhysicalMaterial
          color="#DCEBFF"
          roughness={0.08}
          metalness={0.03}
          transmission={0.82}
          transparent
          opacity={0.12}
          thickness={0.7}
          clearcoat={1}
          clearcoatRoughness={0.1}
          wireframe
        />
      </mesh>

      <mesh scale={1.1}>
        <icosahedronGeometry args={[1.28, 2]} />
        <meshPhysicalMaterial
          color={colour}
          emissive={colour}
          emissiveIntensity={0.22}
          roughness={0.16}
          metalness={0.1}
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.56, 48, 48]} />
        <meshStandardMaterial
          color={colour}
          emissive={colour}
          emissiveIntensity={2.8}
          roughness={0.22}
        />
      </mesh>
      <mesh scale={1.22}>
        <sphereGeometry args={[0.56, 36, 36]} />
        <meshBasicMaterial
          color={colour}
          transparent
          opacity={0.14}
          side={THREE.BackSide}
        />
      </mesh>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[neuralPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={colour} transparent opacity={0.32} />
      </lineSegments>

      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={colour}
          size={activeProject === 2 ? 0.035 : 0.027}
          transparent
          opacity={0.82}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <mesh rotation={[Math.PI / 2.35, 0.15, 0.4]}>
        <torusGeometry args={[1.9, 0.011, 8, 120]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.56} />
      </mesh>
      <mesh rotation={[0.42, Math.PI / 2.2, 0.3]}>
        <torusGeometry args={[2.06, 0.008, 8, 120]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.44} />
      </mesh>
      <mesh rotation={[1.1, 0.35, Math.PI / 2]}>
        <torusGeometry args={[1.78, 0.008, 8, 120]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function Platform() {
  return (
    <group position={[0, -1.73, 0]}>
      <mesh receiveShadow>
        <cylinderGeometry args={[1.48, 1.58, 0.12, 80]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, -0.085, 0]}>
        <cylinderGeometry args={[1.28, 1.45, 0.08, 80]} />
        <meshBasicMaterial color="#EAF2FF" />
      </mesh>
    </group>
  );
}

export default function ProjectCoreScene({
  activeProject,
  inView,
}: {
  activeProject: number;
  inView: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.35, 5.8], fov: 42 }}
      frameloop={inView ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#FFFFFF" />
      <pointLight
        position={[-2.5, 0.8, 2.8]}
        intensity={20}
        color="#06B6D4"
        distance={8}
      />
      <pointLight
        position={[2.8, 1.8, 1]}
        intensity={22}
        color="#7C3AED"
        distance={8}
      />
      <EnergyCore activeProject={activeProject} moving={inView} />
      <Platform />
    </Canvas>
  );
}
