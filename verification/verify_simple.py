from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating...")
            page.goto("http://localhost:3000", timeout=60000)

            print("Waiting for initial load (5s)...")
            page.wait_for_timeout(5000)

            print("Scrolling to bottom to trigger all lazy loads...")
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

            print("Waiting for lazy components (5s)...")
            page.wait_for_timeout(5000)

            print("Scrolling to Portfolio section...")
            # Try to find by ID
            if page.locator("#portfolio").count() > 0:
                page.locator("#portfolio").scroll_into_view_if_needed()
                print("Found #portfolio.")
            else:
                print("#portfolio not found, scrolling to approx position.")
                page.evaluate("window.scrollTo(0, 1500)")

            page.wait_for_timeout(2000)
            page.screenshot(path="verification/full_page_check.png")
            print("Screenshot saved: verification/full_page_check.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
