from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Start navigation
        page.goto("http://localhost:3000")

        # 2. Verify "Skills" link is gone and "Testimonials" exists
        # Check text content of navigation items
        nav_text = page.locator("nav").text_content()
        print(f"Nav text: {nav_text}")

        if "Skills" in nav_text or "Habilidades" in nav_text:
            print("FAILURE: Skills link still present")
        else:
            print("SUCCESS: Skills link removed")

        if "Testimonials" in nav_text or "Testimonios" in nav_text:
             print("SUCCESS: Testimonials link present")
        else:
             print("FAILURE: Testimonials link missing")

        # 3. Take screenshot of Navbar to verify font and color changes (visually)
        page.screenshot(path="verification/new_design.png")

        # 4. Verify scrolling to testimonials
        # Click the testimonials link
        # Note: Depending on viewport, it might be in the hamburger menu on mobile,
        # but we are running default viewport (usually 1280x720) so it should be visible.
        testimonials_link = page.get_by_role("button", name="Testimonials") # or "Testimonios" depending on default lang
        # If default is ES:
        if not testimonials_link.count():
             testimonials_link = page.get_by_role("button", name="Testimonios")

        if testimonials_link.count():
            testimonials_link.click()
            # Wait a bit for smooth scroll
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/scrolled_to_testimonials.png")
            print("Clicked Testimonials link")
        else:
            print("Could not find Testimonials link to click")

        browser.close()

if __name__ == "__main__":
    verify_changes()
