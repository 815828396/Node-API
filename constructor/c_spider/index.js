
/**
 * @name 爬虫
 */
const superagent = require('superagent');
const cheerio = require("cheerio")
class ConsturPart {
    constructor () {}

    /**
     * 获取百度新闻
     */
    async getBaiduNews (request, response) {
      let arr = [];
      superagent.get('https://news.baidu.com/').end((err, res) => {
        if (err) {
          console.log(`获取错误${err}`)
        } else {
          
          let $ = cheerio.load(res.text);
          $('div#pane-news ul li a').each((idx, ele) => {
            let obj = {
              title: $(ele).text(),
              href: $(ele).attr('href') 
            }
            arr.push(obj);
          })

        }
      })
      response.send(arr);
    }
}

export default new ConsturPart()