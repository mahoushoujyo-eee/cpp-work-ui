<template>
  <div>
    <div class="mb-6 flex items-center">
      <router-link :to="`/shapes/${shapeId}`" class="text-primary-500 hover:text-primary-600 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        返回图元详情
      </router-link>
    </div>
    
    <div class="card">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">编辑图元</h1>
      
      <!-- Error message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        <strong class="font-bold">错误：</strong>
        <span class="block sm:inline">{{ error }}</span>
      </div>
      
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span class="ml-3 text-gray-600 dark:text-gray-300">加载中...</span>
      </div>
      
      <div v-else-if="shape">
        <ShapeForm 
          :initial-data="shape" 
          :is-editing="true"
          :loading="updating"
          @submit="updateShape" 
        />
      </div>
      
      <!-- Not found -->
      <div v-else class="text-center py-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">未找到图元</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
          您要编辑的图元不存在或已被删除。
        </p>
        <router-link to="/home" class="btn btn-primary">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useShapeStore } from '../stores/shapes';
import ShapeForm from '../components/shapes/ShapeForm.vue';

const route = useRoute();
const router = useRouter();
const shapeStore = useShapeStore();

const shapeId = computed(() => route.params.id);
const shape = ref(null);
const loading = ref(true);
const updating = ref(false);
const error = ref(null);

// Fetch shape data on mount
onMounted(async () => {
  try {
    shape.value = await shapeStore.fetchShapeById(shapeId.value);
  } catch (err) {
    error.value = '获取图元数据失败';
    console.error('Failed to fetch shape:', err);
  } finally {
    loading.value = false;
  }
});

const updateShape = async (updatedShape) => {
  updating.value = true;
  error.value = null;
  
  try {
    await shapeStore.updateShape(shapeId.value, updatedShape);
    router.push(`/shapes/${shapeId.value}`);
  } catch (err) {
    error.value = '更新图元失败，请检查输入数据';
    console.error('Failed to update shape:', err);
  } finally {
    updating.value = false;
  }
};
</script>