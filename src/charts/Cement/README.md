# 水泥价格指数CEMPI走势图

## 数据来源
- 中国水泥网指数 (https://index.ccement.com/)

## 更新方式
通过iframe嵌入外部网站，实时显示最新数据

## 技术实现
- React组件封装iframe
- CSS缩放调整显示区域
- sandbox安全策略限制

## iframe配置
- **URL**: https://index.ccement.com/
- **缩放**: 0.7
- **位置调整**: top: -280px, left: -200px
- **尺寸放大**: width +300px, height +250px
