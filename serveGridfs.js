const { GridFSBucket } = require('mongodb');

module.exports = function (mongoConnection) {
  const bucketName = 'fs';
  let gfs;
  mongoConnection.once('open', () => {
    gfs = new GridFSBucket(mongoConnection.db);
  })
  return function serveGridfsMiddleware(req, res, next) {
    const _id = req.url.substr(1) // removing the first forward slash
    gfs.openDownloadStream(_id)
      .on('error', next)
      .pipe(res);
  }
}