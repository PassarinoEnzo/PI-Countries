const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const { PORT } = process.env;
const { Country } = require("./src/db")

conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    const allCountries = Country.findAll();
    if(!allCountries.length){
      const response = await axios('http://localhost:5000/countries');
      let countryDB = response.data.map((country) =>{
        return{
          id: country.cca3,
          name: country.name.common,
          flag: country.flags.png,
          continent: country.continents ? country.continents[0] : "No encontre continente!",
          capital: country.capital ? country.capital[0] : "No encontre capital!",
          subRegion: country.subregion,
          area: country.area,
          population: country.population,
        }
      })
      await Country.bulkCreate(countryDB)
        
    }
    console.log(`Corriendo servidor en ${PORT} `);
  })
}).catch((err) => console.error(err));
