import fs from 'fs'
import { parse } from 'yaml'

let files = fs.readdirSync('./games/')

let data = files
  .map(file => parse(fs.readFileSync('./games/' + file, 'utf8')))
  .sort((a, b) => a.game > b.game ? 1 : -1)

fs.writeFileSync('./src/games.json', JSON.stringify(data))

console.log('create ./src/games.json')