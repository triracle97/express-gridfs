// ignore this file
const fs = require('fs');
const intoStream = require('into-stream');

const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
mongoose.connect('mongodb://localhost:27017/myApp');

mongoose.connection.once('open', () => {
  const gfs = new GridFSBucket(mongoose.connection.db);
  const data = fs.readFileSync('./img.jpg');
  const st = intoStream(data);
  const writeStream = gfs.openUploadStreamWithId('img.jpg');
  st.pipe(writeStream);
  writeStream.on('finish', () => {
    console.log('done');
  })
})