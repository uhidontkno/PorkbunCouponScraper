import cheerio from "cheerio";
import logger from "./logger";
let ua:string = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
export async function scrapeSearch() {
    let links:string[] = []
    let res = await (await fetch("https://moae.sbs/search?q=site:porkbun.com%20%22?coupon=%22&format=json", {
        "headers": {
            "User-Agent":ua
        }
    })).json()
    console.log(res)
   return res
}