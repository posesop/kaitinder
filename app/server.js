const log = require('./config/log');
const express = require('express');
const mongoose = require('mongoose');
const Candidate = require('./candidate');
const fs = require('fs');

const mongoOpts = {
  url: process.env.MONGO_URL || 'mongodb://kai:password@127.0.0.1:27017/admin',
  opts: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const connectMongo = async () => mongoose.connect(mongoOpts.url, mongoOpts.opts);

const app = express();

app.get('/',  (req, res) => {
  res.send('Hello KaiTinder!');
});

app.get('/candidates',  async (req, res) => {
  const candidates = await Candidate.find({});
  res.send({ data: candidates });
});


connectMongo().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, error => (error ? log.error(error) : log.info(`Server listening at port: ${port}`)));

  // const data = fs.readFileSync('data.json');
  // const parsedData = JSON.parse(data);
  // Candidate.insertMany(parsedData);
});
