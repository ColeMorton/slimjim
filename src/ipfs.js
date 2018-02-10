const IPFS = require('ipfs')

const { promisified, createEventPromise } = require('./utils')

const IPFS_CONFIG = {
  EXPERIMENTAL: {
    pubsub: true,
  }
}

class IPFSWrapper extends IPFS {
  constructor(args) {
    super(args)
    const EVENTS = new Map([
      ['ready', 'onReady'],
      ['stop', 'onStopped'],
      ['err', 'onError']
    ])
    EVENTS.forEach((handler, event) => this[handler] = createEventPromise(this, event))
  }

  stop(done) {
    return promisified(this.stop, done)
  }
}

const EVENT_HANDLERS = new Map([
  ['onReady', () => console.log('IPFS ready')],
  ['onStopped', () => console.log('IPFS stopped')],
  ['onError', (e) => { throw e }]
])

const addEventHandlers = (node, eventHandlers) => {
  eventHandlers.forEach((eventHandler, key) => node[key].then(eventHandler))
}

const getNode = async (ipfsConfig) => {
  try {
    console.log('Starting IPFS...')
    const node = new IPFSWrapper({ ...IPFS_CONFIG, ...ipfsConfig })
    addEventHandlers(node, EVENT_HANDLERS)
    await node.onReady
    return node
  } catch (e) {
    console.log('Starting IPFS FAILED!', e)
    return Promise.reject(e)
  }
}

module.exports = {
  IPFSWrapper,
  EVENT_HANDLERS,
  addEventHandlers,
  getNode
}
