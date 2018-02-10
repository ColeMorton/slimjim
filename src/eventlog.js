'use strict'

const ipfs = require('./ipfs')
const OrbitDB = require('orbit-db')

const init = async () => {
  const creatures = ['🐙', '🐷', '🐬', '🐞', '🐈', '🙉', '🐸', '🐓']

  console.log("Starting...")
  
  const node = await ipfs.getNode({ 
    repo: './orbitdb/examples/ipfs',
    start: true,
    EXPERIMENTAL: {
      pubsub: true,
    },
  })
  
  await node.onReady
  let db

  try {
    const orbitdb = new OrbitDB(node, './orbitdb/examples/eventlog')
    db = await orbitdb.eventlog('example', { overwrite: true })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }

  const query = async () => {
    const index = Math.floor(Math.random() * creatures.length)
    const userId = Math.floor(Math.random() * 900 + 100)

    try {
      await db.add({ avatar: creatures[index], userId: userId })
      const latest = db.iterator({ limit: 5 }).collect()
      let output = ``
      output += `[Latest Visitors]\n`
      output += `--------------------\n`
      output += `ID  | Visitor\n`
      output += `--------------------\n`
      output += latest.reverse().map((e) => e.payload.value.userId + ' | ' + e.payload.value.avatar + ')').join('\n') + `\n`
      console.log(output)
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  }

  setInterval(query, 1000)
}

module.exports = {
  init
}