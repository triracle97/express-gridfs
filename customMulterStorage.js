// multer custom engine storage
const { GridFSBucket } = require('mongodb');
const md5 = require('md5');

let gfs;

function MyCustomStorage (opts) {
}

MyCustomStorage.prototype._handleFile = function _handleFile (req, file, cb) {
  const hashName = md5(file.originalname); // custom name here
  gfs.delete(hashName, (err) => {
    const outStream = gfs.openUploadStreamWithId(hashName);
    file.stream.pipe(outStream);
    outStream.on('error', cb);
    outStream.on('finish', function () {
      cb(null, {
        name: hashName
      })
    })
  })
};

MyCustomStorage.prototype._removeFile = function _removeFile (req, file, cb) {
  gfs.delete(file.originalname, (err) => {});
};

module.exports = function (connection, opts) {
  connection.once('open', () => {
    gfs = new GridFSBucket(connection.db);
  });
  return new MyCustomStorage(opts)
};