const express = require('express');
const app = express();
const port = 8888;
const serveGridfs = require('./serveGridfs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myApp');
const multer = require('multer');
const storage = require('./customMulterStorage')(mongoose.connection);
const upload = multer({
  storage: storage
})

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/upload', upload.any(), (req, res, next) => {
  res.send(req.files);
});

app.use('/static', serveGridfs(mongoose.connection));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));