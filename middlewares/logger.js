const wst = require("winston");



const {database} = require("winston-mongodb")



const logger = wst.createLogger({



    level:"info",


    format: wst.format.json(),


    tpr:[


        new database ({


            db:process.env.MONGO_URI,


            collection:"logs",


            options: {


                useUnifiedTopology:true


            }


        })


    ]


})




module.exports = logger


