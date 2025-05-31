<template>
  <div>
    <!-- 项目介绍头部 -->
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">几何图元管理系统</h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
        C++ 课程设计 - 基于现代Web技术栈的几何图元管理平台
      </p>
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-2">项目概述</h2>
        <p class="text-lg">
          本项目是一个完整的几何图元管理系统，采用前后端分离架构，实现了2D和3D几何图形的创建、管理、可视化和持久化存储。
        </p>
      </div>
    </header>

    <!-- 技术栈介绍 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- 后端技术栈 -->
      <div class="card">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">后端技术栈</h3>
        </div>
        <ul class="space-y-3 text-gray-600 dark:text-gray-300">
          <li class="flex items-center">
            <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            <strong>C++17</strong> - 核心编程语言，面向对象设计
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            <strong>httplib</strong> - 轻量级HTTP服务器库
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            <strong>nlohmann/json</strong> - JSON数据处理
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
            <strong>智能指针</strong> - 现代C++内存管理
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            <strong>RESTful API</strong> - 标准化接口设计
          </li>
        </ul>
      </div>

      <!-- 前端技术栈 -->
      <div class="card">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">前端技术栈</h3>
        </div>
        <ul class="space-y-3 text-gray-600 dark:text-gray-300">
          <li class="flex items-center">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            <strong>Vue 3</strong> - 渐进式JavaScript框架
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            <strong>Vite</strong> - 现代前端构建工具
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
            <strong>Tailwind CSS</strong> - 实用优先的CSS框架
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
            <strong>Pinia</strong> - Vue状态管理
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            <strong>Vue Router</strong> - 单页应用路由
          </li>
        </ul>
      </div>
    </div>

    <!-- 核心功能特性 -->
    <div class="card mb-8">
      <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">核心功能特性</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">多种几何图元</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">支持2D图形（矩形、圆形）和3D图形（立方体、圆柱体）的创建和管理</p>
        </div>
        
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">实时可视化</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">提供图形预览功能，支持交互式3D渲染和实时属性调整</p>
        </div>
        
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
          </div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">数据持久化</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">基于JSON的数据存储，支持图元的增删改查操作</p>
        </div>
        
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div class="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">智能搜索</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">支持按名称、类型、属性进行筛选和搜索</p>
        </div>
        
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div class="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">响应式设计</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">适配桌面和移动设备，支持深色模式切换</p>
        </div>
        
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div class="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">现代架构</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">采用MVC架构模式，代码结构清晰，易于维护和扩展</p>
        </div>
      </div>
    </div>

    <!-- 功能体验区域 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <!-- 快速开始 -->
      <div class="card">
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">快速开始</h3>
        <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            体验完整的几何图元管理功能，从创建到可视化，一站式解决方案。
          </p>
          <div class="space-y-3">
            <router-link to="/shapes/create" class="btn btn-primary inline-flex items-center w-full justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              创建新图元
            </router-link>
            <router-link to="/home" class="btn btn-secondary inline-flex items-center w-full justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              图元管理
            </router-link>
          </div>
        </div>
      </div>

      <!-- 项目亮点 -->
      <div class="card">
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">项目亮点</h3>
        <div class="space-y-4">
          <div class="flex items-start">
            <div class="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">完整的MVC架构</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">清晰的代码分层，易于维护和扩展</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">现代C++特性</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">智能指针、RAII、面向对象设计</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">前后端分离</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">RESTful API设计，前端Vue3框架</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">实时可视化</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">支持2D/3D图形的实时预览和交互</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 版权信息 -->
    <footer class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
      <p>&copy; 2024 几何图元管理系统 - C++ 课程设计项目</p>
    </footer>
  </div>
</template>

<script setup>
// 技术介绍页面，无需复杂的状态管理
</script>