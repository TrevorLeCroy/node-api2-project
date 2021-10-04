// implement your server here
// require your posts router and connect it here
const postsRouter = require('./posts/posts-router');
const express     = require('express');
const app         = express();

app.use(express.json());
app.use('/api/posts', postsRouter);

module.exports = app;