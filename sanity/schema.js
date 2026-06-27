import { news } from "./news";
import { webstories } from "./webstories"; 
import  goldPrice  from "./goldPrice";
import  exchangeRate  from "./exchangeRate";
import weatherData  from "./weatherData";
 
 

export const schema = {
  types: [news, goldPrice, exchangeRate, weatherData, webstories],
}
