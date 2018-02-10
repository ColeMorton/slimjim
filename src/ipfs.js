const IPFS = require('ipfs')

const { promisified, createEventPromise } = require('./utils')

const IPFS_CONFIG = {
  EXPERIMENTAL: {
    pubsub: true,
  }
}

class IPFSWrapper extends IPFS {
  constructor(args = {}) {
    super({ ...IPFS_CONFIG, ...args })
    const EVENTS = new Map([
      ['ready', 'onReady'],
      ['stop', 'onStopped'],
      ['err', 'onError']
    ])
    EVENTS.forEach((handler, event) => this[handler] = createEventPromise(this, event))
  }

  stop(done) {
    return promisified(super.stop, done)
  }
}

module.exports = IPFSWrapper
