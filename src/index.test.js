const assert = require('assert')
const app = require('./index')

const IPFS = require('./ipfs')
const OrbitDB = require('orbit-db')

describe('app', function() {
  it('should initialise', function(done) {
    const wrapper = async () => {
      try {
        const ipfs = IPFS()
        await ipfs.onReady
        const orbitdb = new OrbitDB(ipfs, './orbitdb/keyvalue')
        orbitdb.stop()
        await ipfs.stop()
      } catch (e) {
        throw e
      }
      done()
    }
    assert.doesNotThrow(wrapper)
  })
})
