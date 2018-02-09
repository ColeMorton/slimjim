const assert = require('assert')
const app = require('./index')

describe('app', function() {
  it('should initialise', function(done) {
    const wrapper = async () => {
      await app.init()
      done()
    }
    assert.doesNotThrow(wrapper)
  })
})
