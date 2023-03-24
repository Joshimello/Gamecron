<script>
  import MiniSearch from 'minisearch'
  import { onMount } from 'svelte'
  import '@fontsource/roboto-slab'
  import '@fontsource/roboto-mono'

  let games = []
  let value = ''
  let minisearch

  onMount( async() => {

    let data = (await import('./games.json')).default

    setInterval(() => {
      games = data.map((game, index) => {

        game['serverTime'] = new Date(new Date().toLocaleString('en-US', { timeZone: game.timezone }))

        game['serverResetTime'] = new Date(game.serverTime.getFullYear(), game.serverTime.getMonth(), game.serverTime.getDate(), game.dailyReset.split(":")[0], game.dailyReset.split(":")[1])

        let timeDiff = game.serverResetTime.getTime() - game.serverTime.getTime()
        if(timeDiff <= 0) timeDiff += (24 * 60 * 60 * 1000)

        game['timeToReset'] = [
          Math.floor(timeDiff / (60 * 60 * 1000)),
          Math.floor(timeDiff / (60 * 1000) % 60),
          Math.floor(timeDiff / (1000) % 60),
        ]

        game['percentToReset'] = Math.floor(100 - (timeDiff / (24 * 60 * 60 * 1000) * 100))

        return game

      })
    }, 1000)

    minisearch = new MiniSearch({
      fields: ['game'],
      storeFields: ['id'],
      searchOptions: {
        fuzzy: 1
      }
    })

    minisearch.addAll(data.map((game, index) => ({...game, id: index})))

  })

  $: searchResultIDs = minisearch ? minisearch.search(value) : []
  $: searchResult = searchResultIDs.length ? searchResultIDs.map(entry => games[entry.id]) : games
    
</script>

<main class="bg-gray-100 h-100vh flex flex-col items-center overflow-y-scroll">

  <div class="px-8 flex flex-col gap-4 w-160">
    {#if games.length}

      <input class="bg-white shadow-xl px-8 py-4 my-4 text-xl outline-0" bind:value placeholder="Search..." />

      {#each searchResult as game}
        <div class="bg-white shadow-xl p-4 rounded flex flex-row gap-4">

          <img class="h-16 rounded-2xl" src="./icons/{game.game.replace(/[/\\?%*:|"<>]/g, '').toLowerCase()}.webp" alt={game.game} />

          <div class="flex flex-col flex-1">
            <div class="flex justify-between items-start">
              <span class="text-2xl font-serif">{game.game}</span>
              <span class="text-sm font-mono">{game.server.toUpperCase()}</span>
            </div>
            <span class="font-mono text-lg">
              {String(game.timeToReset[0]).padStart(2, '0')}h
              {String(game.timeToReset[1]).padStart(2, '0')}m
              {String(game.timeToReset[2]).padStart(2, '0')}s
            </span>
            <div class="border-orange-100 border-3 rounded" style="width: {game.percentToReset}%"></div>
          </div>

        </div>
      {/each}
    {:else}
      Loading...
    {/if}
  </div>
</main>

<style>
  .font-serif { font-family: 'Roboto Slab', serif; }
  .font-mono { font-family: 'Roboto Mono', monospace; }
</style>