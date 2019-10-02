const{Router} = require('express');
const router = Router();

const getWeather = require('../lib/getWeather');

router.get('/', async(req,res) =>{
res.render('index');
});

router.post('/', async (req,res) =>{
    let location = req.body.location;
    let country = req.body.country;
    console.log(location);
    console.log(country);
    

    let data = await getWeather(location,country);
    console.log(data.list);

    
    
    
    if (data.list[0]!=undefined){
    let city = data.list[0].name
    let temp = data.list[0].main.temp
    let humidity = data.list[0].main.humidity
    let wind = data.list[0].wind.speed
    let clouds = data.list[0].clouds.all
    res.render('index',{data:{city,temp,humidity,wind,clouds}});
   
    }else{
    
        res.render('index',{err:"This is a incorrect location"})
        
    }
});

module.exports = router;