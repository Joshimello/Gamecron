import fs from 'fs'
import cheerio from 'cheerio'

let rawdata = fs.readFileSync('../src/games.json')
let data = JSON.parse(rawdata);

for (const game of data) {
  let page = await fetch('https://apps.qoo-app.com/en/search?q=' + game.game)
  let html = await page.text()
  let $ = cheerio.load(html)
  if(!$('.qoo-game-bar .icon')[0]) continue
  let imgUrl = $('.qoo-game-bar .icon')[0].attribs['data-src'].replace('192', '512')
  console.log(imgUrl)
  let res = await fetch('https:' + imgUrl)
  let buffer = await res.arrayBuffer()
  fs.writeFile('../public/icons/' +
    game.game.replace(/[/\\?%*:|"<>]/g, '').toLowerCase() + '.webp',
    Buffer.from(buffer),
    () => console.log('ok')
  )
}
