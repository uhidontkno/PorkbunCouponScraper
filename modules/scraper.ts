import logger from "./logger";
let ua:string = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
export async function scrapeSearch() {
    let links:string[] = []
    for (let i = 1; i < 11; i++) {
    logger.info(`🔍 Scraping for possible coupon links... (pg ${i}/10)`)
    let res = await (await fetch("https://moae.sbs/search?q=site:porkbun.com%20%22?coupon=%22&format=json", {
        "headers": {
            "User-Agent":ua
        }
    })).json()
    for (let b = 0; b < res.results.length; b++) {
        links.push(res.results[b].url);
    }
    
    }
    logger.info(`🔗 Got ${links.length} links!`)
    return links
}