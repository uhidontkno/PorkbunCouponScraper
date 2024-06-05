import { scrapeSearch,filterLinks, sortByPrice } from "./modules/scraper";
import logger from "./modules/logger";
logger.warn("This program bots Porkbun's site to find coupon prices (due to a lack of an API) and this project may be against their TOS. Use a VPN for best results.")
setTimeout(async ()=>{
let l = await scrapeSearch()
let fl = filterLinks(l)
let sorted = await sortByPrice(fl)
console.log(sorted)
},500)
