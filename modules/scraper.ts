import cheerio from "cheerio";
let ua = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
export async function scrapeSearXNG() {
    let res = await (await fetch("https://searxng.site/searxng/search?q=site:porkbun.com+%22?coupon=%22", {
        "headers": {
            "User-Agent":ua
        }
    })).text()
    let c = cheerio.load(res)
    let lastPage = parseInt(c('input.page_number').last().val() as string);
    // "recursively" scrape for links
    for (let i = 1; i > lastPage; i++) {

    }
}