import logger from "./logger";
let ua:string = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
export async function scrapeSearch() {
    let links:string[] = []
    logger.info(`🔍 Scraping for possible coupon links...`)
    let start = Date.now()
    for (let i = 1; i < 13; i++) {
    
    let res = await (await fetch("https://moae.sbs/search?q=site:porkbun.com%20%22?coupon=%22&format=json", {
        "headers": {
            "User-Agent":ua
        }
    })).json()
    for (let b = 0; b < res.results.length; b++) {
        links.push(res.results[b].url);
    }
    
    }
    let end = Date.now();
    logger.info(`🔗 Got ${links.length} links!`)
    logger.info(`🔍 Took ${Math.floor((end - start) * 100) / 100 / 1000} seconds to scrape 12 pages`)
    
    return links
}
function startsUpper(str:string) {
    return str[0] == str[0].toUpperCase()
}
export function filterLinks(links:string[]) {
    let fl:string[] = []
    logger.info(`🔗 Filtering ${links.length} links!`)
    for (let i = 0; i < links.length; i++) {
        let path = new URL(links[i]).pathname
        if (path.includes("?coupon=")) {
            fl.push(links[i])
        } else if (startsUpper(path.replaceAll("/",""))) { // might be a coupon redirect
            fl.push(links[i])
        }
    }
    logger.info(`🔗 Got ${fl.length} possible coupons!`)
    return fl
}