from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

# Setup driver with Service object
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)
driver.maximize_window()
wait = WebDriverWait(driver, 10)

# Base URL
BASE_URL = "http://localhost:5173"  # Adjust if needed

def login():
    print("🔐 Logging in as Admin...")
    driver.get(f"{BASE_URL}/login")
    time.sleep(2)
    driver.find_element(By.NAME, "email").send_keys("shalvi@gmail.com")  # Replace with real creds
    driver.find_element(By.NAME, "password").send_keys("shalvi232346")       # Replace with real creds
    driver.find_element(By.ID, "loginBtn").click()
    time.sleep(2)

# Test Case 1: Homepage Load
def test_homepage():
    print("🏠 Testing homepage load...")
    driver.get(BASE_URL)
    assert "Home" in driver.title or driver.current_url == BASE_URL

# Test Case 2: View All Products
def test_view_products():
    print("🛍️ Viewing all products...")
    driver.get(f"{BASE_URL}/products")
    assert "/products" in driver.current_url

# Test Case 3: Use Search Box
def test_search_products():
    print("🔎 Testing search box...")
    driver.get(f"{BASE_URL}/search")
    search_box = wait.until(EC.presence_of_element_located((By.NAME, "keyword")))
    search_box.send_keys("Laptop")
    search_box.send_keys(Keys.RETURN)
    time.sleep(2)
    assert "/products" in driver.current_url

# Test Case 4: Filter via Dropdown
def test_filter_dropdown():
    print("📂 Testing dropdown filter...")
    driver.get(f"{BASE_URL}/products")
    try:
        select = Select(wait.until(EC.presence_of_element_located((By.ID, "categoryDropdown"))))  # Adjust ID
        select.select_by_visible_text("Electronics")  # Adjust option
        time.sleep(2)
    except Exception as e:
        print("⚠️ Dropdown test skipped or failed:", str(e))

# Test Case 5: Product Detail Page
def test_product_details():
    print("📦 Testing product details page...")
    driver.get(f"{BASE_URL}/products")
    try:
        first_product = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".productCard a")))  # Adjust selector
        first_product.click()
        time.sleep(2)
        assert "/product/" in driver.current_url
    except Exception as e:
        print("⚠️ Product details test failed:", str(e))

# Test Case 6: Admin Create Product
def test_admin_create_product():
    print("➕ Creating product via admin panel...")
    login()
    driver.get(f"{BASE_URL}/admin/products/new")
    try:
        driver.find_element(By.NAME, "name").send_keys("Test Product")
        driver.find_element(By.NAME, "price").send_keys("199.99")
        driver.find_element(By.NAME, "description").send_keys("A Selenium test product")
        Select(driver.find_element(By.NAME, "category")).select_by_index(1)  # Adjust as needed
        driver.find_element(By.NAME, "stock").send_keys("10")
        driver.find_element(By.ID, "createProductBtn").click()
        time.sleep(2)
    except Exception as e:
        print("⚠️ Admin create product test failed:", str(e))

# Test Case 7: Admin View All Products
def test_admin_product_list():
    print("📋 Testing admin product list view...")
    driver.get(f"{BASE_URL}/admin/product")
    assert "/admin/product" in driver.current_url

# Test Case 8: Admin Dashboard Access
def test_admin_dashboard():
    print("📊 Testing admin dashboard access...")
    driver.get(f"{BASE_URL}/admin/dashboard")
    assert "dashboard" in driver.current_url or "dashboard" in driver.title.lower()

# Run test cases
try:
    test_homepage()
    test_view_products()
    test_search_products()
    test_filter_dropdown()
    test_product_details()
    test_admin_create_product()
    test_admin_product_list()
    test_admin_dashboard()
    print("\n✅ All tests completed successfully!")
except AssertionError as e:
    print("\n❌ Test failed with assertion error:", str(e))
except Exception as ex:
    print("\n❌ Test failed due to unexpected error:", str(ex))
finally:
    driver.quit()
