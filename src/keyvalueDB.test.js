const assert = require('assert')
const OrbitDB = require('orbit-db')

const ipfs = require('./ipfs')
const keyvalueDB = require('./keyvalueDB')

xdescribe('keyvalueDB', function() {
  let ipfsNode, orbitdb

  beforeEach(async function() {
    ipfsNode = await ipfs.getNode()
    orbitdb = new OrbitDB(ipfsNode, './orbitdb/keyvalue')
  })

  afterEach(async function() {
    orbitdb.stop()
    await ipfsNode.stop()
  })

  it('should getInstance', async function() {
    const db = await keyvalueDB.getInstance(ipfsNode, orbitdb)
    assert.deepEqual(db, {})
  })
})
