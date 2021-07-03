import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three'

import EarthDayMap from '../../assets/textures/8k_earth_daymap.jpg'
import EarthNightMap from '../../assets/textures/8k_earth_nightmap.jpg'
import EarthNormalMap from '../../assets/textures/8k_earth_normal_map.jpg'
import EarthSpecularMap from '../../assets/textures/8k_earth_specular_map.jpg'
import EarthCloudMap from '../../assets/textures/8k_earth_clouds.jpg'

const Earth = (props) => {
    const [colorMap, normalMap, specularMap, cloudMap, nightMap] = useLoader(THREE.TextureLoader, [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudMap, EarthNightMap]);

    const earthRef = useRef()
    const cloudRef = useRef()

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime()
        earthRef.current.rotation.y = elapsedTime / 6;
        cloudRef.current.rotation.y = elapsedTime / 6;
    })

    return (
        <>
            {/* <ambientLight intensity={1} /> */}
            <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />
            <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
            <mesh ref={cloudRef} position={[0, 0, 2.5]}>
                <sphereGeometry args={[1.005, 32, 32]} />
                <meshPhongMaterial map={cloudMap} opacity={0.4} depthWrite transparent
                    side={THREE.DoubleSide} />
            </mesh>
            <mesh ref={earthRef} position={[0, 0, 2.5]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshPhongMaterial specularMap={specularMap} />
                <meshStandardMaterial map={colorMap} normalMap={normalMap} metalness={0.4}
                    roughness={0.7} />
                {/* <OrbitControls enableZoom enablePan enableRotate zoomSpeed={0.6} panSpeed={0.5} rotateSpeed={0.4} /> */}
            </mesh>
        </>
    )
}

export default Earth
