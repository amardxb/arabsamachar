import { news } from "./news";
import { webstories } from "./webstories"; 
import  goldPrice  from "./goldPrice";
import  exchangeRate  from "./exchangeRate";
import weatherData from "./weatherData";
import fuelRate from "./fuelRate";
import subscriber from "./subscriber.js";
import dailyDigest from "./dailyDigest.js";
 
 

export const schema = {
  types: [news, goldPrice, exchangeRate, weatherData, fuelRate, subscriber, dailyDigest, webstories],
}
