const rc = require("../helpers/redis");



const rl = async (request,response,next) =>{



    const bl = await rc.exists(request.ip);



    if(bl === 1 ) {



        let nr  = await rc.get(request.ip);


        nr = +nr;




        if(nr<3) {


            rc.incr(request.ip);


            next();


        } 
        
        
        
        else if(nr===3) {



            rc.expire(request.ip,60);



            return response.send("Reached maximum request pleaes try again, after 1min")


        } 
        
        
        else {




            return response.send("Reached maximum request pleaes try again, after 1min")



        }



    } 
    
    
    else {



        rc.set(request.ip, 1);


        next()


    }



};




module.exports = rl;