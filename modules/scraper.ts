import cheerio from "cheerio";
import logger from "./logger";
let ua:string = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
export async function scrapeSearXNG() {
    let links:string[] = []
    let res = await (await fetch("https://searxng.ca/search?q=site:porkbun.com+%22?coupon=%22", {
        "headers": {
            "User-Agent":ua
        }
    })).text()
    console.log(res)
    let c = cheerio.load(res)
    console.log(c('input.page_number').last().attr("value"))
    let lastPage:number = parseInt(c('input.page_number').last().attr('value') as string);
    logger.info(`🔍 Got ${lastPage} pages`)
    // "recursively" scrape for links
    for (let i = 1; i > lastPage; i++) {
        let linkCount:number = 0;
        logger.info(`🔍 Scraping for Porkbun Coupons (page ${i}/${lastPage})`)
        let res = await (await fetch(`https://searxng.site/searxng/search?q=site:porkbun.com+%22?coupon=%22&pageno=${i}`, {
            "headers": {
                "User-Agent":ua
            }
        })).text()
        let c = cheerio.load(res)
        c('h3 a').each((_, element) => {
            const href = c(element).attr('href');
            if (href) {
              links.push(href);linkCount++;
            }
          });
        logger.info(`🔗 Got ${linkCount} on page ${i}`)
        logger.info(`  Total: ${links.length}`)
    }
    logger.info(`🔗 Got ${links.length} total!`)
    return links
}