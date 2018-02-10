const ipfs = require('./ipfs')
const OrbitDB = require('orbit-db')

const eventlog = require('./eventlog')

const init = async () => {
  try {
    // const ipfsNode = await ipfs.getNode()
    // const orbitdb = new OrbitDB(ipfsNode, './orbitdb/keyvalue')
    // orbitdb.stop()
    // await ipfsNode.stop()

    // eventlog.init()
  } catch (e) {
    throw e
  }
}

module.exports = {
  init
}
