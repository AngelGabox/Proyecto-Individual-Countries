const { Country, Activity, Op} = require('../db')
const axios = require('axios')

const preloadCountries = async () => {
   try{ 
    let countries = (await axios('https://restcountries.com/v3/all')).data 
    // console.log('ESTO TIENE DATA', data)
    countries = countries.map(c => {
        return{
            id: c.cca3,
            name: c.name.common,
            flag: {...c.flags}[0],
            continent: c.region,
            capital: {...c.capital}[0],
            subregion: c.subregion,
            area: c.area
        }
    })
    countries = await Promise.all(countries.map( co => Country.create(co)))
    // console.log('ARRAY DE PAISES:', countries);
    // console.log('ESTO ME DEVUELVE PROMISE.ALL:', arr.then(value => console.log(value)));
    return 'Paises cargados exitosamente :)'
    }catch(err){
        console.log(err)
        return'no se cargaron los paises :c'
    }
}
const allCountries = async() =>{
    return await Country.findAll({
        include: {
            model: Activity,
            attributes: ['name', 'id', "difficulty", "duration", "season"],
            through: {
                attributes: []
            }
        }
    });
}
const countryXId = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const country =await  Country.findAll({ 
            where:{ id: { [Op.iLike]: `%${id}%` }},
            include:{
                model: Activity,
                attributes: ['name', 'id', "difficulty", "duration", "season"],
                through: {
                    attributes: []
                }
            }
        })
        res.status(200).send(country)
    } catch (error) {
        next(error)
        res.status(400).send('el pais no existe')
    }
} 



const getCountries = async(req, res, next) => {
    try {
        let { name, continent, activity } = req.query  
        let countries = await allCountries()

        if(name && name !== '') {
            countries = await countries.filter(c => c.name.toLowerCase().includes(name.toLocaleLowerCase()))
            countries.length ? 
            countries :
            res.status(404).send("No existe ese pais 😕😔 o escribiste mal su nombre 😅");
        }else if(continent && continent !== ''){
            countries = await countries.filter(c => c.continent.toLowerCase().includes(continent.toLocaleLowerCase()))
            countries.length ? 
            countries :
            res.status(404).send("este continente no existe 😕😔 o esta mal escrito 😅");
        }else if(activity){
            let actividad = await Activity.findOne({
                where: { 
                    name: activity},
                include:{
                    model: Country,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            })
            // console.log('-----> actividad:', actividad)
            countries = [...actividad.countries]
            // console.log('---->countries = [...actividad.countries]:', countries)
            countries = await Promise.all(countries.map(c => Country.findOne({ 
                where: { name: c.name },
                include:{
                    model: Activity,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            })))
            // console.log('---->countries.map:', countries)
            countries.length?
            countries:
            res.status(404).send("No se escontro un pais con esta actividad, crea esta actividad turistica 😉");
        }
        
        // if(order === "a-z"){
        //     countries = countries.sort((a,b) =>{
        //         return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        //     })
        // }else if(order === 'z-a'){
        //     countries = countries.sort((a,b) =>{
        //         return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        //     })
        // }else if(order === 'menorMAYOR'){
        //     countries = countries.sort((a,b) =>{
        //         return a.area.toLowerCase().localeCompare(b.area.toLowerCase())
        //     })
        // }else if(order === 'MAYORmenor'){
        //     countries = countries.sort((a,b) =>{
        //         return b.area.toLowerCase().localeCompare(a.area.toLowerCase())
        //     })
        // }
        

        // console.log('COUNTRIES QUE ME TRAE DE DB:', countries)
        res.status(200).send(countries)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getCountries,
    preloadCountries,
    countryXId
};