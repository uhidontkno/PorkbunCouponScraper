import { scrapeSearch,filterLinks, sortByPrice } from "./modules/scraper";
import logger from "./modules/logger";
let l = await scrapeSearch()
let fl = filterLinks(l)
let sorted = await sortByPrice(fl)
console.log(sorted)