const express = require('express');

const app = express();

app.use(express.static('dist'))


app.listen(3002, function () {
    console.log('Example app listening on port 3000!\n');
});
