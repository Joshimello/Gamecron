import fs from 'fs'
import { stringify } from 'yaml'

let rawdata = fs.readFileSync('./gamedata.json')
let data = JSON.parse(rawdata)

data.forEach(game => {
  let fileName = 
    '../games/' +

    '[' + game.server + '] ' +

    game.game
      .replace(/[/\\?%*:|"<>]/g, '')
      .toLowerCase()

    + '.yaml'
  
  fs.writeFileSync(fileName, stringify(game))
})