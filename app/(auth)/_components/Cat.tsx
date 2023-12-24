"use client";
import * as THREE from "three";
import React, { useCallback, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { a } from "@react-spring/three";
import { Euler, Vector3, useFrame, useThree } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Mesh_0006: THREE.Mesh;
  };
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial;
    "Material_0.006": THREE.MeshStandardMaterial;
  };
};
export function Cat({
  isRotating,
  setIsRotating,
  position,
  rotation,
  scale,
}: {
  isRotating: boolean;
  setIsRotating: React.Dispatch<React.SetStateAction<boolean>>;
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
}) {
  const catRef = useRef<any>();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(
    "/3d/sleeping_cat_on_the_bed.glb"
  ) as GLTFResult;

  //マウスのx軸の位置
  const lastX = useRef(0);
  //回転減衰を制御するための減衰係数
  const dampingFactor = 0.95;
  //回転速度
  const rotationSpeed = useRef(0);

  const handlePointerDown = useCallback(
    (event: any) => {
      event.stopPropagation();
      event.preventDefault();
      setIsRotating(true);
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      lastX.current = clientX;
    },
    [setIsRotating, lastX]
  );

  const handlePointerUp = useCallback(
    (event: any) => {
      event.stopPropagation();
      event.preventDefault();
      setIsRotating(false);
    },
    [setIsRotating]
  );

  const handleKeyDown = useCallback(
    (event: any) => {
      if (event.key === "ArrowLeft") {
        if (!isRotating) setIsRotating(true);
        catRef.current.rotation.y += 0.005 * Math.PI;
        rotationSpeed.current = 0.007;
      } else if (event.key === "ArrowRight") {
        if (!isRotating) setIsRotating(true);
        catRef.current.rotation.y -= 0.005 * Math.PI;
        rotationSpeed.current = -0.007;
      }
    },
    [isRotating, catRef, setIsRotating, rotationSpeed]
  );

  const handleKeyUp = useCallback(
    (event: any) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        setIsRotating(false);
      }
    },
    [setIsRotating]
  );

  const handlePointerMove = useCallback(
    (event: any) => {
      // handlePointerMove の中身はそのまま
      event.stopPropagation();
      event.preventDefault();
      if (isRotating) {
        const clientX = event.touches
          ? event.touches[0].clientX
          : event.clientX;
        const delta = (clientX - lastX.current) / viewport.width;
        catRef.current.rotation.y += delta * 0.01 * Math.PI;
        lastX.current = clientX;
        rotationSpeed.current = delta * 0.01 * Math.PI;
      }
    },
    [isRotating, lastX, viewport, catRef, rotationSpeed]
  );

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("keyup", handleKeyUp);
    return () => {
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("keydown", handleKeyDown);
      canvas.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    gl,
    handlePointerMove,
    handlePointerUp,
    handlePointerDown,
    handleKeyDown,
    handleKeyUp,
  ]);

  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      catRef.current.rotation.y += rotationSpeed.current;
    }
  });

  return (
    <a.group
      dispose={null}
      ref={catRef}
      position={position}
      scale={scale}
      rotation={rotation}
    >
      <mesh
        geometry={nodes.Mesh_0006.geometry}
        material={materials["Material_0.006"]}
      />
    </a.group>
  );
}

useGLTF.preload("/3d/sleeping_cat_on_the_bed.glb");
