<template>
  <div class="card hover:shadow-lg transition-shadow duration-300" :class="{ 'border-2 border-primary-500': selected }">
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ shape.name }}</h3>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
            :class="typeClass">
        {{ typeTranslations[shape.type] || shape.type }}
      </span>
    </div>
    
    <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4 flex justify-center items-center" style="height: 120px;">
      <ShapePreview :shape="shape" :size="100" />
    </div>
    
    <div class="text-sm text-gray-600 dark:text-gray-300 mb-4">
      <div class="grid grid-cols-2 gap-2">
        <div>
          <span class="font-medium">位置：</span> 
          <div class="text-xs">
            x: {{ shape.position.x }}, 
            y: {{ shape.position.y }}, 
            z: {{ shape.position.z }}
          </div>
        </div>
        <div>
          <span class="font-medium">属性：</span>
          <div class="text-sm space-y-1">
            <div v-for="(value, key) in (shape.properties || {})" :key="key" class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">{{ propertyTranslations[key] || key }}:</span>
              <span class="font-medium">{{ value }}</span>
            </div>
            <div v-if="!shape.properties || Object.keys(shape.properties).length === 0" class="text-gray-500 dark:text-gray-400">
              无特殊属性
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex justify-between">
      <router-link :to="`/shapes/${shape.id}`" class="btn btn-secondary text-sm">
        <span class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          查看
        </span>
      </router-link>
      <div class="flex space-x-2">
        <router-link :to="`/shapes/${shape.id}/edit`" class="btn btn-accent text-sm">
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            编辑
          </span>
        </router-link>
        <button @click="confirmDelete" class="btn btn-danger text-sm">
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            删除
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ElMessageBox } from 'element-plus';
import ShapePreview from './ShapePreview.vue';

const props = defineProps({
  shape: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['delete']);

const typeTranslations = {
  'Rectangle': '矩形',
  'Circle': '圆形',
  'Cuboid': '立方体',
  'Cylinder': '圆柱体'
};

const propertyTranslations = {
  'width': '宽度',
  'height': '高度',
  'radius': '半径',
  'depth':'test',
  'length': '长度'
};

const typeClass = computed(() => {
  const classes = {
    Rectangle: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    Circle: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Cuboid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Cylinder: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  };
  
  return classes[props.shape.type] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
});

const confirmDelete = async () => {
  try {
    await ElMessageBox.confirm(
      `确定要删除"${props.shape.name}"吗？`,
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    emit('delete', props.shape.id);
  } catch {
    // 用户取消删除
  }
};
</script>