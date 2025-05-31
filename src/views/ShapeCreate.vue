<template>
  <div>
    <div class="mb-6 flex items-center">
      <router-link to="/home" class="text-primary-500 hover:text-primary-600 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        返回图元列表
      </router-link>
    </div>
    
    <div class="card">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">创建新图元</h1>
      
      <!-- Error message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        <strong class="font-bold">错误：</strong>
        <span class="block sm:inline">{{ error }}</span>
      </div>
      
      <ShapeForm @submit="createShape" :loading="creating" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useShapeStore } from '../stores/shapes';
import ShapeForm from '../components/shapes/ShapeForm.vue';

const router = useRouter();
const shapeStore = useShapeStore();
const creating = ref(false);
const error = ref(null);

const createShape = async (newShape) => {
  creating.value = true;
  error.value = null;
  
  try {
    const id = await shapeStore.addShape(newShape);
    router.push(`/shapes/${id}`);
  } catch (err) {
    error.value = '创建图元失败，请检查输入数据';
    console.error('Failed to create shape:', err);
  } finally {
    creating.value = false;
  }
};
</script>