// require your server and launch it here
const server = require('./api/server');
const PORT   = process.env.port || 5000;

server.listen(PORT, () => {
    console.log(`Server listening on port::${PORT}`);
});
