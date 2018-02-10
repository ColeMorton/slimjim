const assert = require('assert')
const OrbitDB = require('orbit-db')

const IPFS = require('./ipfs')
const keyvalueDB = require('./keyvalueDB')

describe('keyvalueDB', function() {
  let ipfs, orbitdb

  beforeEach(async function() {
    ipfs = new IPFS()
    await ipfs.onReady
    orbitdb = new OrbitDB(ipfs, './orbitdb/keyvalue')
  })

  afterEach(async function() {
    orbitdb.stop()
    await ipfs.stop()
  })

  it('should getInstance', async function() {
    const db = await keyvalueDB.getInstance(ipfs, orbitdb)
    assert.deepEqual(db, {})
  })
})
