# 几何图元管理器 - 前端界面

这是一个基于 Vue.js 3 开发的几何图元管理系统前端界面，作为 C++ 课程设计项目的用户交互界面。该系统提供了直观的图形化界面来管理和可视化各种几何图元。

## 🚀 项目特性

- **现代化界面**: 基于 Vue 3 + Vite 构建的响应式单页应用
- **多种图元支持**: 支持矩形、圆形、长方体、圆柱体等几何图元
- **实时预览**: 提供 3D 可视化预览功能
- **完整的 CRUD 操作**: 创建、读取、更新、删除几何图元
- **智能搜索**: 支持按名称、类型、颜色等条件筛选
- **响应式设计**: 适配桌面和移动设备
- **暗色主题**: 支持明暗主题切换
- **数据持久化**: 与后端 C++ 服务器实时同步

## 🛠️ 技术栈

- **框架**: Vue.js 3 (Composition API)
- **构建工具**: Vite
- **UI 组件库**: Element Plus
- **样式框架**: Tailwind CSS
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **3D 渲染**: Three.js
- **HTTP 客户端**: Fetch API

## 📦 项目结构

```
vue_frontend/
├── public/                 # 静态资源
│   ├── geometry-icon.svg  # 应用图标
│   └── vite.svg
├── src/
│   ├── components/        # 组件目录
│   │   ├── layout/       # 布局组件
│   │   │   └── Navbar.vue
│   │   ├── shapes/       # 图元相关组件
│   │   │   ├── ShapeCard.vue    # 图元卡片
│   │   │   ├── ShapeForm.vue    # 图元表单
│   │   │   └── ShapePreview.vue # 图元预览
│   │   └── ui/           # 通用UI组件
│   ├── stores/           # Pinia 状态管理
│   │   ├── shapes.js     # 图元数据管理
│   │   └── theme.js      # 主题管理
│   ├── views/            # 页面组件
│   │   ├── Home.vue          # 主页 - 图元列表
│   │   ├── Introduction.vue  # 介绍页面
│   │   ├── ShapeCreate.vue   # 创建图元
│   │   ├── ShapeDetails.vue  # 图元详情
│   │   └── ShapeEdit.vue     # 编辑图元
│   ├── App.vue           # 根组件
│   ├── main.js           # 应用入口
│   └── style.css         # 全局样式
├── index.html            # HTML 模板
├── package.json          # 项目配置
├── tailwind.config.js    # Tailwind 配置
└── vite.config.js        # Vite 配置
```

## 🎯 主要功能

### 1. 图元管理
- **创建图元**: 支持创建矩形、圆形、长方体、圆柱体
- **编辑图元**: 修改图元的属性（尺寸、颜色、位置等）
- **删除图元**: 安全删除不需要的图元
- **查看详情**: 显示图元的详细信息和属性

### 2. 可视化功能
- **3D 预览**: 使用 Three.js 提供立体图元的 3D 渲染
- **实时更新**: 编辑时实时预览图元变化
- **多角度查看**: 支持旋转、缩放查看图元

### 3. 搜索与筛选
- **按类型筛选**: 快速找到特定类型的图元
- **按名称搜索**: 支持模糊搜索图元名称
- **按颜色筛选**: 根据颜色分类查看图元
- **按面积范围**: 筛选特定面积范围的图元

### 4. 用户体验
- **响应式布局**: 适配各种屏幕尺寸
- **暗色主题**: 护眼的暗色模式
- **加载状态**: 友好的加载提示
- **错误处理**: 完善的错误提示机制

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
访问 http://localhost:5173

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 🔧 配置说明

### API 配置
前端默认连接到本地后端服务器：
```javascript
const API_BASE_URL = 'http://localhost:58010';
```

如需修改后端地址，请编辑 `src/stores/shapes.js` 文件中的 `API_BASE_URL` 常量。

### 支持的图元类型
- **Rectangle (矩形)**: 宽度、高度
- **Circle (圆形)**: 半径
- **Cuboid (长方体)**: 长度、宽度、高度
- **Cylinder (圆柱体)**: 半径、高度

## 🎨 界面预览

### 主要页面
1. **介绍页面**: 项目介绍和功能说明
2. **图元列表**: 显示所有图元的网格视图
3. **创建图元**: 表单界面创建新图元
4. **图元详情**: 查看图元的详细信息和 3D 预览
5. **编辑图元**: 修改现有图元的属性

### 主要组件
- **导航栏**: 提供页面导航和主题切换
- **图元卡片**: 展示图元基本信息的卡片组件
- **图元表单**: 用于创建和编辑图元的表单
- **3D 预览**: 基于 Three.js 的 3D 渲染组件

## 🔗 与后端集成

该前端应用与 C++ 后端服务器通过 RESTful API 进行通信：

- `GET /primitives` - 获取所有图元
- `GET /primitives/:id` - 获取特定图元
- `POST /primitives` - 创建新图元
- `PUT /primitives/:id` - 更新图元
- `DELETE /primitives/:id` - 删除图元

## 📝 开发说明

### 代码规范
- 使用 Vue 3 Composition API
- 组件采用 `<script setup>` 语法
- 样式使用 Tailwind CSS 工具类
- 状态管理使用 Pinia

### 项目特点
- **模块化设计**: 组件职责清晰，易于维护
- **类型安全**: 完善的数据验证和错误处理
- **性能优化**: 懒加载和代码分割
- **用户友好**: 直观的操作界面和反馈

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目仅用于教育和学习目的，作为 C++ 课程设计的一部分。

## 🙏 致谢

- Vue.js 团队提供的优秀框架
- Element Plus 提供的 UI 组件
- Three.js 提供的 3D 渲染能力
- Tailwind CSS 提供的样式框架

---

**注意**: 这是一个课程设计项目，主要用于学习和演示目的。在生产环境中使用前，请确保进行充分的测试和安全评估。
