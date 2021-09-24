const app = require('./app');

const host = '0.0.0.0';
const port = process.env.PORT || 5000;

app.listen(port, host, () => {
    console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
