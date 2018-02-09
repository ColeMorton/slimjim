const getInstance = async (ipfsNode, orbitdb) => {
  try {
    const db = {}
    // const db = await orbitdb.kvstore('example', { overwrite: true })
    // await db.load()
    return db
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports = {
  getInstance
}