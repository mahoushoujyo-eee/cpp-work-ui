<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <Navbar />
    <main class="container mx-auto px-4 py-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>
<script setup>
import { onMounted, watch } from 'vue';
import { useThemeStore } from './stores/theme';
import Navbar from './components/layout/Navbar.vue';

const themeStore = useThemeStore();

// Apply theme on mount
onMounted(() => {
  themeStore.initTheme();
});

// Watch for theme changes
watch(() => themeStore.isDark, (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});
</script>
