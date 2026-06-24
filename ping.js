const { chromium } = require('playwright');
const fs = require('fs');

// ADD YOUR HUGGING FACE URLS HERE
const URLS_TO_PING = [
    'https://gucdqwbgguerrillamailblock-auto-filter-bot.hf.space'
];

// Helper function to pause the script
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
    // 1. GENERATE A RANDOM DELAY (Between 2 and 15 minutes)
    const minMinutes = 2;
    const maxMinutes = 15;
    const randomMinutes = Math.floor(Math.random() * (maxMinutes - minMinutes + 1)) + minMinutes;
    const randomMilliseconds = randomMinutes * 60 * 1000;

    console.log(`[RANDOMIZER] Action started, but waiting for ${randomMinutes} minutes before visiting Hugging Face...`);
    
    // The script literally pauses here for the random amount of time
    await sleep(randomMilliseconds);
    
    console.log(`[RANDOMIZER] Wait complete! Proceeding with human simulation.`);

    // 2. SETUP SCREENSHOT FOLDER
    if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots');
    }

    // 3. LAUNCH BROWSER
    console.log('Launching headless browser...');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        viewport: { width: 1280, height: 720 }
    });

    const page = await context.newPage();

    // 4. VISIT EACH URL
    for (let i = 0; i < URLS_TO_PING.length; i++) {
        const url = URLS_TO_PING[i];
        console.log(`\n--- Starting visit to: ${url} ---`);
        
        try {
            const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
            
            if (response) {
                await sleep(3000); // Wait 3 seconds for UI to load
                
                const pageTitle = await page.title();
                console.log(`CONFIRMATION: Page Title is "${pageTitle}"`);
                console.log(`CONFIRMATION: Status Code is ${response.status()}`);
                
                const screenshotPath = `screenshots/space-visit-${i + 1}.png`;
                await page.screenshot({ path: screenshotPath });
                console.log(`SUCCESS: Screenshot saved at ${screenshotPath}`);

            } else {
                console.log(`Warning: Could not load ${url}`);
            }
        } catch (error) {
            console.error(`Error loading ${url}:`, error.message);
        }

        // Add a tiny random delay (10 to 30 seconds) between clicking different URLs
        if (i < URLS_TO_PING.length - 1) {
            const pauseBetweenUrls = Math.floor(Math.random() * 20000) + 10000;
            console.log(`Waiting ${pauseBetweenUrls / 1000} seconds before visiting the next space...`);
            await sleep(pauseBetweenUrls);
        }
    }

    console.log('\nAll automated tasks complete. Closing browser.');
    await browser.close();
}

run();

