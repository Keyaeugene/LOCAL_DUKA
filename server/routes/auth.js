const express = require('express');

const authRouter = express.Router();

authRouter.get('/user', (res,req)=> { 
   res.json({msg: "rivaan"}) 
});

module.exports = authRouter;