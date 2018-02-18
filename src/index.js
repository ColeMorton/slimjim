'use strict'

// const IPFS = require('./ipfs')
const store = require('./store')
const TodoModel = require('./todoModel')
const OrbitDB = require('orbit-db')

// const init = async () => {
//   try {
//     const ipfs = IPFS()
//     console.log('ipfs', ipfs)
//     await ipfs.onReady
//     const db = new OrbitDB(ipfs, './orbitdb/keyvalue')
//     console.log('db', db)
//     await db.stop()
//     await ipfs.stop()
//   } catch (e) {
//     throw e
//   }
// }

const init = async () => {
  try {
    const namespace = 'namespace'
    // Create the store (storage backend), namespace is our database name/id
    var db = await store(namespace);

    // Create the data model
    var model = TodoModel(db, namespace);

    function render() {}

    // Render the app
    console.log('model', model)
    model.subscribe(render);
    render();

    // Load the database from locally persisted data
    await db.load()
    await db.stop()
  } catch (e) {
    throw e
  }
}

init()
