<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Left column: Basic info -->
      <div class="space-y-4">
        <!-- Name -->
        <div>
          <label for="name" class="form-label">名称</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            class="form-input"
            required
          />
        </div>
        
        <!-- Type (disabled if editing) -->
        <div>
          <label for="type" class="form-label">类型</label>
          <select
            id="type"
            v-model="formData.type"
            class="form-input"
            :disabled="isEditing"
            @change="handleTypeChange"
          >
            <option v-for="type in shapeTypes" :key="type" :value="type">
              {{ typeTranslations[type] || type }}
            </option>
          </select>
        </div>
        

        
        <!-- Color -->
        <div>
          <label for="color" class="form-label">颜色</label>
          <div class="flex items-center">
            <input
              id="color"
              v-model="formData.color"
              type="color"
              class="h-10 w-10 rounded mr-2 cursor-pointer"
            />
            <input
              v-model="formData.color"
              type="text"
              class="form-input"
              pattern="^#[0-9A-Fa-f]{6}$"
              placeholder="#RRGGBB"
            />
          </div>
        </div>
        
        <!-- Position -->
        <div class="grid grid-cols-3 gap-2">
          <div>
            <label for="position-x" class="form-label">X 坐标</label>
            <input
              id="position-x"
              v-model.number="formData.position.x"
              type="number"
              class="form-input"
            />
          </div>
          <div>
            <label for="position-y" class="form-label">Y 坐标</label>
            <input
              id="position-y"
              v-model.number="formData.position.y"
              type="number"
              class="form-input"
            />
          </div>
          <div>
            <label for="position-z" class="form-label">Z 坐标</label>
            <input
              id="position-z"
              v-model.number="formData.position.z"
              type="number"
              class="form-input"
            />
          </div>
        </div>
      </div>
      
      <!-- Right column: Shape properties and preview -->
      <div class="space-y-4">
        <!-- Dynamic properties based on shape type -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">属性</h3>
          
          <!-- Rectangle -->
          <template v-if="formData.type === 'Rectangle'">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="width" class="form-label">宽度</label>
                <input
                  id="width"
                  v-model.number="formData.properties.width"
                  type="number"
                  min="1"
                  class="form-input"
                />
              </div>
              <div>
                <label for="height" class="form-label">高度</label>
                <input
                  id="height"
                  v-model.number="formData.properties.height"
                  type="number"
                  min="1"
                  class="form-input"
                />
              </div>
            </div>
          </template>
          
          <!-- Circle -->
          <template v-else-if="formData.type === 'Circle'">
            <div>
              <label for="radius" class="form-label">半径</label>
              <input
                id="radius"
                v-model.number="formData.properties.radius"
                type="number"
                min="1"
                class="form-input"
              />
            </div>
          </template>
          
          <!-- Cuboid -->
          <template v-else-if="formData.type === 'Cuboid'">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label for="length" class="form-label">长度</label>
                <input
                  id="length"
                  v-model.number="formData.properties.length"
                  type="number"
                  min="1"
                  class="form-input"
                />
              </div>
              <div>
                <label for="width" class="form-label">宽度</label>
                <input
                  id="width"
                  v-model.number="formData.properties.width"
                  type="number"
                  min="1"
                  class="form-input"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="height" class="form-label">高度</label>
                <input
                  id="height"
                  v-model.number="formData.properties.height"
                  type="number"
                  min="1"
                  class="form-input"
                />
              </div>

            </div>
          </template>
          
          <!-- Cylinder -->
          <template v-else-if="formData.type === 'Cylinder'">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="radius" class="form-label">半径</label>
                <input
                  id="radius"
                  v-model.number="formData.properties.radius"
                  type="number"
                  min="1"
                  class="form-input"
                />
              </div>
              <div>
                <label for="height" class="form-label">高度</label>
                <input
                  id="height"
                  v-model.number="formData.properties.height"
                  type="number"
                  min="1"
                  class="form-input"
                />
              </div>
            </div>
          </template>
        </div>
        
        <!-- Preview -->
        <div class="mt-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">预览</h3>
          <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex justify-center items-center" style="height: 200px;">
            <ShapePreview :shape="formData" :size="180" :interactive="true" />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Form actions -->
    <div class="flex justify-end space-x-4">
      <router-link to="/home" class="btn btn-secondary" :class="{ 'pointer-events-none opacity-50': loading }">取消</router-link>
      <button type="submit" class="btn btn-primary" :disabled="loading">
        <span v-if="loading" class="flex items-center">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          {{ isEditing ? '更新中...' : '创建中...' }}
        </span>
        <span v-else>
          {{ isEditing ? '更新' : '创建' }}图元
        </span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useShapeStore } from '../../stores/shapes';
import ShapePreview from './ShapePreview.vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => null
  },
  isEditing: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit']);
const shapeStore = useShapeStore();
const shapeTypes = computed(() => shapeStore.getShapeTypes);

const typeTranslations = {
  'Rectangle': '矩形',
  'Circle': '圆形',
  'Cuboid': '立方体',
  'Cylinder': '圆柱体'
};

// Initialize form data
const formData = ref({
  name: '',
  type: 'Rectangle',
  position: { x: 0, y: 0, z: 0 },
  color: '#3B82F6',
  properties: {}
});

// When type changes, update properties
const handleTypeChange = () => {
  const defaultProps = shapeStore.getDefaultPropertiesForType(formData.value.type);
  formData.value.properties = defaultProps || {};
  
  // 确保立方体有length属性
  if (formData.value.type === 'Cuboid' && !formData.value.properties.length) {
    formData.value.properties.length = formData.value.properties.width || 100;
  }
};

// 同步length和width属性
const syncWidthLength = (source) => {
  if (formData.value.type === 'Cuboid') {
    if (source === 'length') {
      formData.value.properties.width = formData.value.properties.length;
    } else if (source === 'width') {
      formData.value.properties.length = formData.value.properties.width;
    }
  }
};

// On mount, initialize data
onMounted(() => {
  if (props.initialData) {
    // For editing - ensure properties exist
    const initialData = JSON.parse(JSON.stringify(props.initialData));
    if (!initialData.properties) {
      initialData.properties = shapeStore.getDefaultPropertiesForType(initialData.type);
    }
    formData.value = initialData;
  } else {
    // For creation
    handleTypeChange();
  }
});

const submitForm = () => {
  emit('submit', JSON.parse(JSON.stringify(formData.value)));
};
</script>