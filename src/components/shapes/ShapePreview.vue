<template>
  <div ref="canvasContainer" class="w-full h-full flex items-center justify-center"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as THREE from 'three';

const props = defineProps({
  shape: {
    type: Object,
    required: true
  },
  size: {
    type: Number,
    default: 100
  },
  interactive: {
    type: Boolean,
    default: false
  }
});

const canvasContainer = ref(null);
let scene, camera, renderer, shape3D, animationId;

// Create the 3D scene
const initScene = () => {
  // Create scene
  scene = new THREE.Scene();
  
  // Create camera
  camera = new THREE.PerspectiveCamera(
    75,
    props.size / props.size,
    0.1,
    1000
  );
  camera.position.z = 5;
  
  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(props.size, props.size);
  renderer.setClearColor(0x000000, 0);
  
  // Add to DOM
  if (canvasContainer.value) {
    canvasContainer.value.innerHTML = '';
    canvasContainer.value.appendChild(renderer.domElement);
  }
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Create and add shape
  createShape();
  
  // Start animation
  animate();
};

// Helper function to ensure valid positive numbers
const getValidNumber = (value, defaultValue = 1) => {
  const num = Number(value);
  return (!isNaN(num) && num > 0) ? num : defaultValue;
};

// Create the shape based on type
const createShape = () => {
  // Remove existing shape if any
  if (shape3D) {
    scene.remove(shape3D);
  }
  
  if (!props.shape) {
    return;
  }
  
  const { type, properties = {}, color } = props.shape;
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color || '#ffffff'),
    roughness: 0.7,
    metalness: 0.2
  });
  
  let geometry;
  
  switch (type) {
    case 'Rectangle':
      geometry = new THREE.BoxGeometry(
        getValidNumber(properties.width, 50) / 50,
        getValidNumber(properties.height, 50) / 50,
        0.1
      );
      break;
    case 'Circle':
      geometry = new THREE.CircleGeometry(
        getValidNumber(properties.radius, 25) / 50,
        32
      );
      break;
    case 'Cuboid':
      geometry = new THREE.BoxGeometry(
        getValidNumber(properties.width, 50) / 50,
        getValidNumber(properties.height, 50) / 50,
        getValidNumber(properties.depth, 50) / 50
      );
      break;
    case 'Cylinder':
      geometry = new THREE.CylinderGeometry(
        getValidNumber(properties.radius, 25) / 50,
        getValidNumber(properties.radius, 25) / 50,
        getValidNumber(properties.height, 50) / 50,
        32
      );
      break;
    default:
      geometry = new THREE.BoxGeometry(1, 1, 1);
  }
  
  shape3D = new THREE.Mesh(geometry, material);
  scene.add(shape3D);
};

// Animation loop
const animate = () => {
  animationId = requestAnimationFrame(animate);
  
  if (shape3D && props.interactive) {
    shape3D.rotation.x += 0.01;
    shape3D.rotation.y += 0.01;
  }
  
  renderer.render(scene, camera);
};

// Watch for shape changes
watch(() => props.shape, () => {
  if (scene) {
    createShape();
  }
}, { deep: true });

// Initialize on mount
onMounted(() => {
  initScene();
});

// Clean up on unmount
onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  if (renderer) {
    renderer.dispose();
  }
  
  if (shape3D) {
    if (shape3D.geometry) shape3D.geometry.dispose();
    if (shape3D.material) shape3D.material.dispose();
  }
});
</script>