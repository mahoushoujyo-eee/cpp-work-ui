<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
    <div class="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
      <!-- Search -->
      <div class="flex-grow">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            class="form-input py-2 pl-10 w-full"
            placeholder="搜索图元..."
            v-model="searchText"
            @input="onSearchChange"
          />
        </div>
      </div>
      
      <!-- Type Filter -->
      <div class="w-full md:w-48">
        <select
          class="form-input w-full"
          v-model="selectedType"
          @change="onTypeChange"
        >
          <option value="All">所有类型</option>
          <option v-for="type in shapeTypes" :key="type" :value="type">
            {{ typeTranslations[type] || type }}
          </option>
        </select>
      </div>
      
      <!-- Property Filter -->
      <div class="w-full md:w-48">
        <select
          class="form-input w-full"
          v-model="selectedProperty"
          @change="onPropertyChange"
        >
          <option value="All">所有属性</option>
          <option value="hasRadius">有半径属性</option>
          <option value="hasWidth">有宽度属性</option>
          <option value="hasHeight">有高度属性</option>
          <option value="hasDepth">有深度属性</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useShapeStore } from '../../stores/shapes';

const props = defineProps({
  initialSearchQuery: {
    type: String,
    default: ''
  },
  initialFilterType: {
    type: String,
    default: 'All'
  },
  initialFilterProperty: {
    type: String,
    default: 'All'
  }
});

const shapeStore = useShapeStore();
const searchText = ref(props.initialSearchQuery);
const selectedType = ref(props.initialFilterType);
const selectedProperty = ref(props.initialFilterProperty);

const shapeTypes = computed(() => shapeStore.getShapeTypes);
// Property filter options are now hardcoded in template

const typeTranslations = {
  'Rectangle': '矩形',
  'Circle': '圆形',
  'Cuboid': '立方体',
  'Cylinder': '圆柱体'
};



const onSearchChange = () => {
  shapeStore.setSearchQuery(searchText.value);
};

const onTypeChange = () => {
  shapeStore.setFilterType(selectedType.value);
};

const onPropertyChange = () => {
  shapeStore.setFilterProperty(selectedProperty.value);
};

onMounted(() => {
  shapeStore.setSearchQuery(props.initialSearchQuery);
  shapeStore.setFilterType(props.initialFilterType);
  shapeStore.setFilterProperty(props.initialFilterProperty);
});
</script>