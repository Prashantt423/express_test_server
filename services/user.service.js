const userRepository = require("../repository/user.repo")

const getAll = async (req,res,next)=>{
    try{
        res.json(await userRepository.getAllUsers())
    }catch(e){
        next(e)
    }
}
const getByIncomeAndCar = async (req,res,next)=>{
    try{
        res.json(await userRepository.getAllUsersWithIncomeAndCars(5,'bmw','Mercedes-Benz'))
    }catch(e){
        next(e)
    }
}
const getByGenderAndIncome = async (req,res,next)=>{
    try{
        res.json(await userRepository.getByGenderAndIncome('male',10000))
    }catch(e){
        next(e)
    }
}
const getByLastNameAndQuote = async (req,res,next)=>{
    try{
        res.json(await userRepository.getByLastNameAndQuote('M',15))
    }catch(e){
        next(e)
    }
}
const getUserWithNoDigitInEmail = async (req,res,next)=>{
    try{
        res.json(await userRepository.getUserWithNoDigitInEmail('bmw','Mercedes','audi'))
    }catch(e){
        next(e)
    }
}
const getGroupedUser = async (req,res,next)=>{
    try{
        res.json(await userRepository.getGroupedUser())
    }catch(e){
        next(e)
    }
}

module.exports = {
    getAll,
    getByIncomeAndCar,
    getByGenderAndIncome,
    getByLastNameAndQuote,
    getUserWithNoDigitInEmail,
    getGroupedUser
}