const { v4: uuid} =  require('uuid')
const { Country, Activity, Op} = require('../db.js')

const addActivity = async(req, res, next) =>{
    try {
    const {name, difficulty, duration, season, countriesAct } = req.body
    const activity = {
      id: uuid(),
      name,
      difficulty,
      duration,
      season
    }
    const newActivity = await Activity.create(activity)
    console.log('COUNTRIES PARA LA ACTIVIDAD:', countriesAct)
    const countriesDb = await Country.findAll({ where: { name: countriesAct } })
    newActivity.addCountry(countriesDb)
    res.status(200).json({...activity, countriesAct})
    } catch (error) {
      next(error)
    }
}

const getActivities = async(req, res, next) => {
  try {
    let activities = await Activity.findAll({
      include: {
        model: Country,
        attributes: [`name`],
        through: {
          attributes: []
        }
      }
    })
    res.status(200).send(activities)
  } catch (error) {
    next(error)
  }
}
module.exports = {
  addActivity,
  getActivities
}


