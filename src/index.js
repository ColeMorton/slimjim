const ipfs = require('./ipfs')
const OrbitDB = require('orbit-db')

const init = async () => {
  try {
    const ipfsNode = await ipfs.getNode()
    const orbitdb = new OrbitDB(ipfsNode, './orbitdb/keyvalue')
    orbitdb.stop()
    await ipfsNode.stop()
  } catch (e) {
    throw e
  }
}

module.exports = {
  init
}
