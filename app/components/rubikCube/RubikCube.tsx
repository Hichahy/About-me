import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { MeshStandardMaterial, Vector3 } from 'three';

const skills = [
  'JS',
  '🦁',
  'TypeScript',
  'UX',
  'UI',
  'Node.js',
  '🛟',
  'HTML',
  'Redux',
  'Next.js',
  'GraphQL',
  'Three.js',
];

const getFontSize = (skill: string) => {
  const baseSize = 0.25;
  return skill.length > 6 ? baseSize * 0.6 : baseSize;
};

const CubePiece = ({
  position,
  materials,
  skill,
  isExternal,
}: {
  position: Vector3;
  materials: MeshStandardMaterial[];
  skill: string;
  isExternal: boolean;
}) => {
  return (
    <group position={position.toArray()}>
      <mesh material={materials}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        {isExternal &&
          [0, 1, 2, 3, 4, 5].map((side) => {
            const textPositions = [
              [0, 0, 0.51],
              [0, 0, -0.51],
              [0, 0.51, 0],
              [0, -0.51, 0],
              [-0.51, 0, 0],
              [0.51, 0, 0],
            ];

            const adjustments = [
              { x: 0, y: 0, z: -0.05 },
              { x: 0, y: 0, z: +0.05 },
              { x: 0, y: -0.05, z: 0 },
              { x: 0, y: +0.05, z: 0 },
              { x: +0.05, y: 0, z: 0 },
              { x: -0.05, y: 0, z: 0 },
            ];

            return (
              <Text
                key={side}
                position={[
                  textPositions[side][0] + adjustments[side].x,
                  textPositions[side][1] + adjustments[side].y,
                  textPositions[side][2] + adjustments[side].z,
                ]}
                fontSize={getFontSize(skill)}
                color='black'
                anchorX='center'
                anchorY='middle'
                rotation={[
                  side === 2 ? -Math.PI / 2 : side === 3 ? Math.PI / 2 : 0,
                  side === 4 ? -Math.PI / 2 : side === 5 ? Math.PI / 2 : 0,
                  0,
                ]}
                scale={side === 1 ? [-1, 1, 1] : [1, 1, 1]}
              >
                {skill}
              </Text>
            );
          })}
      </mesh>
    </group>
  );
};

const CubeGroup = ({ isUserInteracting }: { isUserInteracting: boolean }) => {
  const groupRef = useRef<any>(null);

  const faceColors = [
    '#BAD7F2',
    '#BAD7F2',
    '#BAD7F2',
    '#BAD7F2',
    '#BAD7F2',
    '#BAD7F2',
  ];

  const createMaterials = (color: string) => {
    const material = new MeshStandardMaterial({
      color,
      transparent: true,
      opacity: 1,
      roughness: 1.0,
      metalness: 0,
    });
    return material;
  };

  const positions = [
    [-1, -1, -1],
    [-1, -1, 0],
    [-1, -1, 1],
    [-1, 0, -1],
    [-1, 0, 0],
    [-1, 0, 1],
    [-1, 1, -1],
    [-1, 1, 0],
    [-1, 1, 1],
    [0, -1, -1],
    [0, -1, 0],
    [0, -1, 1],
    [0, 0, -1],
    [0, 0, 0],
    [0, 0, 1],
    [0, 1, -1],
    [0, 1, 0],
    [0, 1, 1],
    [1, -1, -1],
    [1, -1, 0],
    [1, -1, 1],
    [1, 0, -1],
    [1, 0, 0],
    [1, 0, 1],
    [1, 1, -1],
    [1, 1, 0],
    [1, 1, 1],
  ];

  const isExternal = (position: number[]) => {
    return position.some((coord) => coord === 1 || coord === -1);
  };

  useFrame(() => {
    if (groupRef.current && !isUserInteracting) {
      groupRef.current.rotation.x += 0.003;
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <CubePiece
          key={i}
          position={new Vector3(...pos)}
          materials={[
            createMaterials(faceColors[0]),
            createMaterials(faceColors[1]),
            createMaterials(faceColors[2]),
            createMaterials(faceColors[3]),
            createMaterials(faceColors[4]),
            createMaterials(faceColors[5]),
          ]}
          skill={skills[i % skills.length]}
          isExternal={isExternal(pos)}
        />
      ))}

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.7, 2.7, 2.7]} />
        <meshStandardMaterial color='black' />
      </mesh>
    </group>
  );
};

const RubikCube = () => {
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  return (
    <div>
      <Canvas className='animate-none xl:animate-levitate bg-[w] cube-wrapper'>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          onStart={() => setIsUserInteracting(true)}
          onEnd={() => setIsUserInteracting(false)}
        />
        <ambientLight intensity={2.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
        <CubeGroup isUserInteracting={isUserInteracting} />
      </Canvas>
    </div>
  );
};

export default RubikCube;
