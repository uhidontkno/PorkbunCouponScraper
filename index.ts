import { scrapeSearch,filterLinks } from "./modules/scraper";
import logger from "./modules/logger";
let l = await scrapeSearch()
let fl = filterLinks(l)
console.log(fl)