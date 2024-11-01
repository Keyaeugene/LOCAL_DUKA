const {Client} = require('pg');

const userSchema = pg.Schema({ 
    name: { 
        required: true,
        type: String,
        trim: true,
    },
    email: { 
        required: true,
       type: String,
       trim: true,
       validate: { 
        validator: (value) => { 
            const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          return   value.match(re);
        },
        message: ''
       } 
    }
})