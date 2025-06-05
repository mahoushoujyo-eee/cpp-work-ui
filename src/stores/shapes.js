import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// API配置 - 从环境变量中获取API基础URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:58010';

// Shape types and their properties
const shapeTypes = {
  Rectangle: {
    width: 100,
    height: 50,
  },
  Circle: {
    radius: 50,
  },
  Cuboid: {
    length: 100,
    width: 100,
    height: 50,
  },
  Cylinder: {
    radius: 50,
    height: 100,
  }
};

// API请求辅助函数
const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.success ? data.data : data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const useShapeStore = defineStore('shapes', () => {
  // State
  const shapes = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const statistics = ref(null);
  
  const searchQuery = ref('');
  const filterType = ref('All');
  const filterProperty = ref('All');
  
  // Helper function to check property filter
  const checkPropertyFilter = (shape, filterValue) => {
    if (!shape || !shape.properties) return filterValue === 'All';
    
    switch (filterValue) {
      case 'hasRadius':
        return 'radius' in shape.properties;
      case 'hasWidth':
        return 'width' in shape.properties;
      case 'hasHeight':
        return 'height' in shape.properties;
      case 'hasLength':
        return 'length' in shape.properties;
      default:
        return true;
    }
  };

  // Getters
  const filteredShapes = computed(() => {
    return shapes.value.filter(shape => {
      if (!shape) return false;
      
      const matchesSearch = (shape.name || '').toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesType = filterType.value === 'All' || shape.type === filterType.value;
      const matchesProperty = filterProperty.value === 'All' || checkPropertyFilter(shape, filterProperty.value);
      
      return matchesSearch && matchesType && matchesProperty;
    });
  });
  
  const getShapeById = computed(() => {
    return (id) => shapes.value.find(shape => shape.id == id);
  });
  
  const getShapeTypes = computed(() => {
    return Object.keys(shapeTypes);
  });
  

  
  // Helper function to transform backend data to frontend format
  const transformBackendData = (backendShape) => {
    const frontendShape = {
      id: backendShape.id,
      name: backendShape.name,
      type: backendShape.type,
      color: backendShape.color,
      position: backendShape.position || { x: 0, y: 0, z: 0 },
      properties: {}
    };
    
    // Extract properties based on shape type
    switch (backendShape.type) {
      case 'Rectangle':
        frontendShape.properties = {
          width: backendShape.width || 100,
          height: backendShape.height || 50
        };
        break;
      case 'Circle':
        frontendShape.properties = {
          radius: backendShape.radius || 50
        };
        break;
      case 'Cuboid':
        frontendShape.properties = {
          width: backendShape.width || backendShape.length || 100,
          height: backendShape.height || 50,
          length: backendShape.length || backendShape.width || 100
        };
        break;
      case 'Cylinder':
        frontendShape.properties = {
          radius: backendShape.radius || 50,
          height: backendShape.height || 100
        };
        break;
      default:
        frontendShape.properties = getDefaultPropertiesForType(backendShape.type);
    }
    
    return frontendShape;
  };

  // API Actions
  async function fetchShapes() {
    loading.value = true;
    error.value = null;
    try {
      const data = await apiRequest('/primitives');
      const shapesArray = Array.isArray(data) ? data : [];
      shapes.value = shapesArray.map(transformBackendData);
    } catch (err) {
      error.value = '获取图元列表失败';
      console.error('Failed to fetch shapes:', err);
    } finally {
      loading.value = false;
    }
  }
  
  async function fetchShapeById(id) {
    loading.value = true;
    error.value = null;
    try {
      const data = await apiRequest(`/primitives/${id}`);
      return data ? transformBackendData(data) : null;
    } catch (err) {
      error.value = '获取图元详情失败';
      console.error('Failed to fetch shape:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }
  
  async function addShape(shapeData) {
    loading.value = true;
    error.value = null;
    try {
      // 转换前端数据格式到后端格式
      const backendData = {
        type: shapeData.type,
        name: shapeData.name,
        color: shapeData.color,
        position: shapeData.position,
        ...shapeData.properties
      };
      
      const newShape = await apiRequest('/primitives', {
        method: 'POST',
        body: JSON.stringify(backendData)
      });
      
      // 重新获取列表以确保数据同步
      await fetchShapes();
      return newShape.id;
    } catch (err) {
      error.value = '创建图元失败';
      console.error('Failed to create shape:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }
  
  async function updateShape(id, shapeData) {
    loading.value = true;
    error.value = null;
    try {
      // 转换前端数据格式到后端格式
      const backendData = {
        type: shapeData.type,
        name: shapeData.name,
        color: shapeData.color,
        position: shapeData.position,
        ...shapeData.properties
      };
      
      await apiRequest(`/primitives/${id}`, {
        method: 'PUT',
        body: JSON.stringify(backendData)
      });
      
      // 重新获取列表以确保数据同步
      await fetchShapes();
      return true;
    } catch (err) {
      error.value = '更新图元失败';
      console.error('Failed to update shape:', err);
      return false;
    } finally {
      loading.value = false;
    }
  }
  
  async function deleteShape(id) {
    loading.value = true;
    error.value = null;
    try {
      await apiRequest(`/primitives/${id}`, {
        method: 'DELETE'
      });
      
      // 从本地状态中移除
      const index = shapes.value.findIndex(shape => shape.id == id);
      if (index !== -1) {
        shapes.value.splice(index, 1);
      }
      return true;
    } catch (err) {
      error.value = '删除图元失败';
      console.error('Failed to delete shape:', err);
      return false;
    } finally {
      loading.value = false;
    }
  }
  
  async function deleteAllShapes() {
    loading.value = true;
    error.value = null;
    try {
      await apiRequest('/primitives', {
        method: 'DELETE'
      });
      
      shapes.value = [];
      return true;
    } catch (err) {
      error.value = '清空图元失败';
      console.error('Failed to delete all shapes:', err);
      return false;
    } finally {
      loading.value = false;
    }
  }
  
  async function fetchStatistics() {
    try {
      const data = await apiRequest('/statistics');
      statistics.value = data;
      return data;
    } catch (err) {
      console.error('Failed to fetch statistics:', err);
      return null;
    }
  }
  
  async function fetchShapesByType(type) {
    loading.value = true;
    error.value = null;
    try {
      const data = await apiRequest(`/primitives/type/${type}`);
      const shapesArray = Array.isArray(data) ? data : [];
      return shapesArray.map(transformBackendData);
    } catch (err) {
      error.value = '按类型获取图元失败';
      console.error('Failed to fetch shapes by type:', err);
      return [];
    } finally {
      loading.value = false;
    }
  }
  
  async function checkHealth() {
    try {
      const data = await apiRequest('/health');
      return data;
    } catch (err) {
      console.error('Health check failed:', err);
      return { status: 'error', service: false, database: false };
    }
  }
  
  function setSearchQuery(query) {
    searchQuery.value = query;
  }
  
  function setFilterType(type) {
    filterType.value = type;
  }
  
  function setFilterProperty(property) {
    filterProperty.value = property;
  }
  
  function getDefaultPropertiesForType(type) {
    return { ...shapeTypes[type] };
  }
  
  return {
    // State
    shapes,
    loading,
    error,
    statistics,
    searchQuery,
    filterType,
    filterProperty,
    
    // Getters
    filteredShapes,
    getShapeById,
    getShapeTypes,

    
    // API Actions
    fetchShapes,
    fetchShapeById,
    addShape,
    updateShape,
    deleteShape,
    deleteAllShapes,
    fetchStatistics,
    fetchShapesByType,
    checkHealth,
    
    // Local Actions
    setSearchQuery,
    setFilterType,
    setFilterProperty,
    getDefaultPropertiesForType
  };
});