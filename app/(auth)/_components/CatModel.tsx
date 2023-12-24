"use client";
import Loader from "@/app/components/Loader";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Cat } from "./Cat";
import { Vector3 } from "three";

export const CatModel = () => {
  const [isRotating, setIsRotating] = useState(false);

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;
    if (typeof window === "undefined") {
      return [new Vector3(0, 0, 0), new Vector3(0, 0, 0)];
    }
    if (window.innerWidth < 768) {
      screenScale = new Vector3(0.9, 0.9, 0.9);
      screenPosition = new Vector3(0, 0, 0);
    } else {
      screenScale = new Vector3(1, 1, 1);
      screenPosition = new Vector3(0, 0, 0);
    }

    return [screenScale, screenPosition];
  };
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <Canvas
      className={`w-full h-screen bg-transparent ${
        isRotating ? "cursor-grabbing" : "cursor-grab"
      }`}
      camera={{ fov: 50, near: 1, far: 1000, position: [0, 0, 1.5] }}
    >
      <Suspense fallback={<Loader />}>
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 5, 10]} intensity={2} />
        <spotLight
          position={[0, 50, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
        />
        <hemisphereLight color="#b1e1ff" groundColor="#000000" intensity={1} />
        <Cat
          isRotating={isRotating}
          setIsRotating={setIsRotating}
          position={islandPosition}
          rotation={[0.4, 0, 0]}
          scale={islandScale}
        />
      </Suspense>
    </Canvas>
  );
};
