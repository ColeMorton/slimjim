const assert = require('assert')
const rimraf = require('rimraf')
const OrbitDB = require('orbit-db')

const ipfs = require('./ipfs')
const keyvalueDB = require('./keyvalueDB')

describe('keyvalueDB', function() {
  let ipfsNode, orbitdb

  beforeEach(async function() {
    ipfsNode = await ipfs.getNode()
    orbitdb = new OrbitDB(ipfsNode, './orbitdb/keyvalue')
  })

  afterEach(async function() {
    orbitdb.stop()
    await ipfsNode.stop()
  })

  after(function(done) {
    rimraf('./orbitdb', done);
  })

  it('should getInstance', async function() {
    const db = await keyvalueDB.getInstance(ipfsNode, orbitdb)
    assert.deepEqual(db, {})
  })
})
