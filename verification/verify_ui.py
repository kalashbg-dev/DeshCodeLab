from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to http://localhost:3000...")
            page.goto("http://localhost:3000", timeout=60000)

            print("Page loaded. Waiting for network idle...")
            page.wait_for_load_state("networkidle", timeout=30000)

            # The page uses Suspense/Lazy loading.
            # We need to scroll down to trigger the loading of the portfolio section.
            print("Scrolling to bottom to trigger lazy loading...")
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(3000)

            print("Scrolling back up to portfolio position (approx 1000px)...")
            page.evaluate("window.scrollTo(0, 1000)")
            page.wait_for_timeout(2000)

            # Check if #portfolio exists now
            if page.locator("#portfolio").count() > 0:
                print("Portfolio section found in DOM.")
                portfolio = page.locator("#portfolio")
                if portfolio.is_visible():
                     print("Portfolio is visible.")
                     portfolio.scroll_into_view_if_needed()
                     page.wait_for_timeout(1000)
                     page.screenshot(path="verification/portfolio_cards.png")
                     print("Screenshot saved to verification/portfolio_cards.png")
                else:
                     print("Portfolio exists but is not visible.")
                     page.screenshot(path="verification/debug_invisible.png")
            else:
                print("Portfolio section NOT found in DOM. Suspense fallback might still be active or lazy load failed.")
                page.screenshot(path="verification/debug_not_found.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_state.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
