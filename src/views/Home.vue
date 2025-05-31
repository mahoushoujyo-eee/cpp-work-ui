<template>
  <div>
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">几何图元管理</h1>
      <p class="text-gray-600 dark:text-gray-300 mt-2">
        轻松管理和可视化您的几何图元。
      </p>
    </header>
    
    <!-- Search and filters -->
    <SearchAndFilter />
    
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
    
    <!-- Shape list -->
    <div v-else-if="filteredShapes.length > 0">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ShapeCard
          v-for="shape in filteredShapes"
          :key="shape.id"
          :shape="shape"
          @delete="deleteShape"
        />
      </div>
    </div>
    
    <!-- Empty state -->
    <div v-else class="card p-8 text-center">
      <div class="flex flex-col items-center justify-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">未找到图元</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
          {{ searchQuery ? '没有符合搜索条件的图元。' : '开始创建您的第一个图元！' }}
        </p>
        <router-link to="/shapes/create" class="btn btn-primary">
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            创建新图元
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { ElMessageBox } from 'element-plus';
import { useShapeStore } from '../stores/shapes';
import ShapeCard from '../components/shapes/ShapeCard.vue';
import SearchAndFilter from '../components/ui/SearchAndFilter.vue';

const shapeStore = useShapeStore();
const filteredShapes = computed(() => shapeStore.filteredShapes);
const searchQuery = computed(() => shapeStore.searchQuery);
const loading = computed(() => shapeStore.loading);
const error = computed(() => shapeStore.error);

// 初始化时获取数据
onMounted(async () => {
  await shapeStore.fetchShapes();
});

const deleteShape = async (id) => {
  try {
    await ElMessageBox.confirm(
      '此操作将永久删除该图元，是否继续？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    await shapeStore.deleteShape(id);
  } catch {
    // 用户取消删除
  }
};
</script>