from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to http://localhost:3000...")
            page.goto("http://localhost:3000", timeout=60000)

            print("Page loaded. Checking for navbar...")
            page.wait_for_selector("nav[role='navigation']", timeout=10000)

            print("Navbar found. Taking initial screenshot of Hero section...")
            page.screenshot(path="verification/hero.png")
            print("Hero screenshot saved to verification/hero.png")

            print("Attempting to click portfolio link to scroll...")
            # Using the aria-label constructed in the component
            portfolio_link = page.locator("button[aria-label*='Portfolio'], button[aria-label*='Portafolio']").first

            if portfolio_link.is_visible():
                portfolio_link.click()
                print("Clicked portfolio link. Waiting for scroll...")
                page.wait_for_timeout(3000)
                page.screenshot(path="verification/scrolled_to_portfolio.png")
                print("Screenshot saved to verification/scrolled_to_portfolio.png")
            else:
                print("Portfolio link not found or not visible.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_state.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_changes()
