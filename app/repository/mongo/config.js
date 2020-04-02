module.exports = {
  url: process.env.MONGO_URL || 'mongodb://localhost:27017/kaitinder',
  opts: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
