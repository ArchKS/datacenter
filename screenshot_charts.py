"""
自动截图脚本 - 截取生猪价格和水泥价格指数图表
"""

import time
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager


def setup_driver(download_dir):
    """设置Chrome驱动（自动下载和管理驱动）"""
    chrome_options = Options()
    chrome_options.add_argument('--headless')  # 无头模式，不显示浏览器窗口
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1920,1080')
    chrome_options.add_argument('--hide-scrollbars')
    chrome_options.add_argument('--disable-blink-features=AutomationControlled')

    # 设置用户代理，避免被检测为爬虫
    chrome_options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

    # 使用 webdriver-manager 自动管理 ChromeDriver
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver


def screenshot_pig_price(driver, output_path):
    """截取生猪价格走势图"""
    print("正在截取生猪价格走势图...")

    try:
        # 访问猪价网
        driver.get("https://zhujia.zhuwang.com.cn/")

        # 等待页面加载
        time.sleep(5)

        # 尝试等待图表加载
        try:
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "chart"))
            )
            print("图表加载完成")
        except:
            print("未找到图表元素，直接截图")

        # 等待页面完全渲染
        time.sleep(3)

        # 截图
        driver.save_screenshot(output_path)
        print(f"✓ 生猪价格走势图已保存到: {output_path}")

        return True
    except Exception as e:
        print(f"✗ 截取生猪价格走势图失败: {e}")
        return False


def screenshot_cement_price(driver, output_path):
    """截取水泥价格指数走势图"""
    print("正在截取水泥价格指数走势图...")

    try:
        # 访问水泥指数网
        driver.get("https://index.ccement.com/")

        # 等待页面加载
        time.sleep(5)

        # 尝试等待图表加载
        try:
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.TAG_NAME, "canvas"))
            )
            print("图表加载完成")
        except:
            print("未找到canvas元素，直接截图")

        # 等待页面完全渲染
        time.sleep(3)

        # 截图
        driver.save_screenshot(output_path)
        print(f"✓ 水泥价格指数走势图已保存到: {output_path}")

        return True
    except Exception as e:
        print(f"✗ 截取水泥价格指数走势图失败: {e}")
        return False


def main():
    """主函数"""
    # 获取脚本所在目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    images_dir = os.path.join(script_dir, "images")

    # 确保images目录存在
    os.makedirs(images_dir, exist_ok=True)

    # 输出文件路径
    pig_price_path = os.path.join(images_dir, "pig-price-chart.png")
    cement_price_path = os.path.join(images_dir, "cement-price-chart.png")

    print("=" * 60)
    print("开始自动截图...")
    print("=" * 60)

    # 设置驱动
    driver = None
    try:
        driver = setup_driver(images_dir)

        # 截取生猪价格走势图
        screenshot_pig_price(driver, pig_price_path)

        # 等待一下再截取下一个
        time.sleep(2)

        # 截取水泥价格指数走势图
        screenshot_cement_price(driver, cement_price_path)

        print("=" * 60)
        print("截图完成！")
        print(f"图片保存在: {images_dir}")
        print("=" * 60)

    except Exception as e:
        print(f"✗ 脚本执行失败: {e}")
        print("\n可能的原因：")
        print("1. 未安装 Chrome 浏览器")
        print("2. 未安装 ChromeDriver")
        print("3. 网络连接问题")
        print("\n解决方法：")
        print("1. 安装 Chrome 浏览器")
        print("2. 运行: pip install selenium")
        print("3. 下载 ChromeDriver: https://chromedriver.chromium.org/")

    finally:
        if driver:
            driver.quit()


if __name__ == "__main__":
    main()
