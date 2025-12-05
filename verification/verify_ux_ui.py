from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the home page
        page.goto("http://localhost:3000")

        # 1. Verify Loading Screen is gone (should see content immediately)
        # Wait for the hero heading to be visible
        page.wait_for_selector("h1", state="visible")

        # 2. Verify Hero Image Overlay is gone
        # We can take a screenshot of the hero section
        hero_section = page.locator("#hero")
        hero_section.screenshot(path="verification/hero_section.png")

        # 3. Verify Particle Field is simplified (visual check via screenshot)

        # 4. Verify no scroll progress bar (visual check via full page screenshot)
        page.screenshot(path="verification/full_page.png", full_page=True)

        print("Screenshots taken successfully.")
        browser.close()

if __name__ == "__main__":
    verify_changes()
