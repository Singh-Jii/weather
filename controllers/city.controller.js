
const rc = require("../helpers/redis");



const xios = require("axios");


const ucl = require("../models/city.model");


const client = require("../models/user.model");


const api_key = process.env.OW_API_KEY;




const gcd = async (request, response) => {



    try {



        const city = request.params.city || request.body.preferred_city;




        const icic = await rc.get(`${city}`);



        console.log(icic)



        if (icic) return response.status(200).send({ data: icic });




        const response = await xios.get(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`)




        const wd = response.data;




        console.log(wd)



        rc.set(city, JSON.stringify(wd), { EX: 30 * 60 });



        await ucl.findOneAndUpdate({ userId: request.body.userId }, {
            userId: request.body.userId, $push: { previousSearches: city }
        }, { new: true, upsert: true, setDefaultsOnInsert: true })




        return response.send({ data: wd });



    } 
    
    catch (errors) {


        return response.status(500).send(errors.messsage);


    }



}




const msc = async (request, response) => {
    


    try {



        const cities = await ucl.aggregate([
            
            {


                 $match: { 


                    userId: request.body.userId


                } 
            },
            
            {


                $unwind: "$previousSearches"


            }
            ,
            {
                $group: {


                    _id: "$previousSearches",


                    count: { $sum: 1 }


                }
            },

            {


                $sort: { count: -1 }


            }
            ]);





        const city = cities[0]["_id"]



        const icic = await rc.get(`${city}`);




        if (icic) return response.status(200).send({ data: icic });




        const response = await xios.get(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`)




        const wd = response.data;


        

        rc.set(city, JSON.stringify(wd), { EX: 30 * 60 });




        await ucl.findOneAndUpdate({ userId: request.body.userId }, {
            userId: request.body.userId, $push: { previousSearches: city }
        }, { new: true, upsert: true, setDefaultsOnInsert: true })




        return response.send({ data: wd });

    } 
    
    catch (errors) {


        return response.status(500).send(errors.messsage);


    }



}



module.exports = { gcd, msc };



