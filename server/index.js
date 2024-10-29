console.log("Hello , World");

const express = require('express');

const PORT = 3000;

const app = express();

//CREATING AN API
app.get('/hello-world', (req, res) => { 
res.send("hello world");
})
//GET, PUT, POST, DELETE, UPDATE

app.listen(PORT, "0.0.0.0",  () => { 
console.log(`connected at port ${PORT}`);
} )
//localhost