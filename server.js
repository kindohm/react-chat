const express = require('express')
const app = express()

app.get("/api/hank", (req, res) => {
    res.send({ name: "HANK" });
});

// app.set("port", process.env.PORT || 3001);

app.listen(3001, () => console.log('Example app listening on port 3001!'))
