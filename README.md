# Gamecron
forgot when your dailies reset today? Here ya go [Gamecron](https://joshimello.github.io/Gamecron/)  

### Info
minimal app to track daily reset time in games  

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

### To Do
- [ ] pre... loading.........
- [ ] extra information
- [ ] automated icons

### Credits
game icons scraped from [QooApp](https://www.qoo-app.com/) with [this](https://github.com/Joshimello/Gamecron/blob/main/utils/getIcon.js)  
initial game data from [cicerakes/Game-Time-Master](https://github.com/cicerakes/Game-Time-Master)
