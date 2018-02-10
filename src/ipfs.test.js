const assert = require('assert')

const ipfs = require('./ipfs')

describe('ipfs', function() {
  let ipfsNode

  beforeEach(async function() {
    ipfsNode = await ipfs.getNode()
  })

  it('should getNode', async function() {
    assert.ok(ipfsNode.isOnline())
    await ipfsNode.stop()
  })

  it('should stop node', async function() {
    await ipfsNode.stop()
    assert.ok(!ipfsNode.isOnline())
  })
})

xdescribe('ipfs', function() {
  let ipfsNode

  beforeEach(async function() {
    ipfsNode = await ipfs.getNode()
  })

  it('should getNode', async function() {
    assert.ok(ipfsNode.isOnline())
    await ipfsNode.stop()
  })

  it('should stop node', async function() {
    await ipfsNode.stop()
    assert.ok(!ipfsNode.isOnline())
  })
})
