const IPFS = require('./ipfs')
const OrbitDB = require('orbit-db')

const init = async () => {
  try {
    const ipfs = new IPFS()
    await ipfs.onReady
    const orbitdb = new OrbitDB(ipfs, './orbitdb/keyvalue')
    orbitdb.stop()
    await ipfs.stop()
  } catch (e) {
    throw e
  }
}

module.exports = {
  init
}
