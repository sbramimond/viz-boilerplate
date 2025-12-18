# Threejs-offscreen-interaction

> 在webworker中使用offscreenCanvas的方式来渲染threejs或者echarts，并与之交互。

## 解决交互的问题
 - 我们在ui thread中创建一个副本，用来收集交互信息，并传入worker thread中来进行设置同步。
 - 可以低成本的解决OrbitControls等问题
 - 例子中有echarts和threejs的交互的例子。

## 可以使用gltf-transfrom 来转换gltf文件
```bash
gltf-transform optimize input.glb output.glb --texture-compress webp
```
## 启动
```bash
pnpm dev
```

## 启动webSocket
```bash
cd server
node index.js
```

