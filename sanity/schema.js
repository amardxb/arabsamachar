import { news } from "./news";
import  goldPrice  from "./goldPrice";
import  exchangeRate  from "./exchangeRate";
import weatherData from "./weatherData";
import fuelRate from "./fuelRate";
import subscriber from "./subscriber.js";
import dailyDigest from "./dailyDigest.js";
import author from "./author.js";
 
 

export const schema = {
  types: [news, goldPrice, exchangeRate, weatherData, fuelRate, subscriber, dailyDigest, author],
}
