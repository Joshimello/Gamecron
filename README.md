# Gamecron

games daily reset time  
based off [cicerakes/Game-Time-Master](https://github.com/cicerakes/Game-Time-Master)

### Usage
[Gamecron](joshimello.github.io/Gamecron/)  

### Adding Games
add a file in /games with the format
```yaml
game: GAME NAME # add quotation marks if name has ':'
server: SERVER
timezone: TIMEZONE
dailyReset: 00:00
```
example
```yaml
game: Blue Archive
server: JP
timezone: Asia/Tokyo
dailyReset: 04:00
```
then throw a pull request
