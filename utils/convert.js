import fs from 'fs'
import { stringify } from 'yaml'

let rawdata = fs.readFileSync('./gamedata.json')
let data = JSON.parse(rawdata)

data.forEach(game => {
  let fileName = 
    '../games/' +

    game.game
      .split(':')[0]
      .match(/[A-Za-z0-9]/g)
      .join('')
      .toLowerCase()

    + '.yaml'
  


  fs.writeFileSync(fileName, stringify(game))
})