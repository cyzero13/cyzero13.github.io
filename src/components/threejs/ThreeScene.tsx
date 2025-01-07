'use client'; // For Next.js 13+ to enforce client-side rendering

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader, DRACOLoader } from 'three/examples/jsm/Addons.js';

export default function ThreeScene() {
  const mountRef = useRef<any>(null);

  useEffect(() => {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    camera.position.z = 5;

    let mew;
    let mixer:any;
    const loader =new GLTFLoader();
    const dracoLoader = new DRACOLoader();

    // Set DRACO decoder path (CDN or local)
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);
    loader.load('/area52.glb', function(gltf){
      mew = gltf.scene;
      mew.position.y = -1;
      // mew.position.x = 4;
      mew.position.z = -2;
      mew.rotation.y = 2;
      mew.rotation.x = 0;
      mew.rotation.z = 0;

      // console.log(gltf.animations)
      mixer = new THREE.AnimationMixer(mew);
      mixer.clipAction(gltf.animations[0]).play();
      scene.add(mew);
    },
    function (xhr) {},
    function (error) {}
    )

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.3)
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(500, 500, 500);
  scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      if(mixer) mixer.update(0.02);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

        window.addEventListener('resize', handleResize);
      // Clean up on component unmount
      return () => {
        if (renderer && renderer.domElement && mountRef.current) {
            mountRef.current.removeChild(renderer.domElement);
        }
        window.removeEventListener('resize', handleResize);
        if (mixer) mixer = null; // Cleanup animation mixer reference
        renderer.dispose(); // Dispose renderer to prevent memory leaks
    };
  }, []);

  return <div ref={mountRef} className='fixed z-50 inset-0 pointer-events-none'></div>;
}
