# 自动截图脚本使用说明

## 功能
自动截取生猪价格和水泥价格指数网站的图表，并保存到 images 目录。

## 安装步骤

### 1. 安装 Chrome 浏览器
确保已安装 Google Chrome 浏览器

### 2. 安装 Python 依赖
```bash
pip install -r requirements.txt
```

或直接安装：
```bash
pip3 install selenium webdriver-manager
```

### 3. 运行截图脚本
```bash
python3 screenshot_charts.py
```

或在 Windows 上：
```bash
python screenshot_charts.py
```

## 输出文件
脚本会在 `images` 目录生成以下文件：

1. **pig-price-chart.png** - 生猪价格走势图（来源：猪价网）
2. **cement-price-chart.png** - 水泥价格指数走势图（来源：水泥指数网）

## 常见问题

### 1. 提示 "ChromeDriver not found"
使用 webdriver-manager 自动管理驱动：

修改脚本，在 setup_driver 函数中添加：
```python
from webdriver_manager.chrome import ChromeDriverManager
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
```

### 2. 截图不完整
- 增加 `time.sleep()` 的等待时间
- 调整 `--window-size` 参数

### 3. 网站访问慢
- 增加 WebDriverWait 的超时时间
- 检查网络连接

## 高级选项

### 显示浏览器窗口（调试用）
将 `--headless` 改为 `--start-maximized`，并注释掉 `--headless`

### 自定义截图尺寸
修改 `--window-size=1920,1080` 中的数值

### 延长等待时间
修改代码中的 `time.sleep(5)` 参数
