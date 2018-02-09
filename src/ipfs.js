const IPFS = require('ipfs')

const IPFS_CONFIG = {
  EXPERIMENTAL: {
    pubsub: true,
  }
}

const createEventPromise = (node) => (event) => new Promise((resolve) => node.on(event, (args) => resolve(args)))

const deferred = (obj, key, done) => new Promise((resolve) => {
  return obj[key]((args) => {
    resolve(args)
    typeof done == 'function' && done(args)
  })
})

class IPFSWrapper extends IPFS {
  constructor(args) {
    super(args)

    const EVENTS = new Map([
      ['ready', 'onReady'],
      ['stop', 'onStopped'],
      ['err', 'onError']
    ])

    const promiseFor = createEventPromise(this)
    EVENTS.forEach((handler, event) => this[handler] = promiseFor(event))
  }

  stop(done) {
    return deferred(this, 'stop', done)
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

const getNode = async () => {
  try {
    console.log('Starting IPFS...')
    const node = new IPFSWrapper(IPFS_CONFIG)
    addEventHandlers(node, EVENT_HANDLERS)
    await node.onReady
    return node
  } catch (e) {
    console.log('Starting IPFS FAILED!', e)
    return Promise.reject(e)
  }
}

module.exports = {
  createEventPromise,
  deferred,
  IPFSWrapper,
  getNode
}
