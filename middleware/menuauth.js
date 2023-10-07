
//hostelar registration  midelwar
export const menu_auth = async (req, res, next) => {
    console.log(' menus  authentiction validation ')

    // var nameRegex = /^[A-Za-z]+$/
    // var email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    // var phone = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/
    // const passwordRegex = /^[a-zA-Z0-9]{5,9}$/

    var days = req.body.days
    var Breakfast = req.body.Breakfast
    var Lunch = req.body.Lunch
    var Dinner = req.body.Dinner




    if (days.trim() === ""||Breakfast.trim()===""||Lunch.trim()===""||Dinner.trim()==="") {
        console.error('unauthorised')
        res.sendStatus(401)
    } else {
        next()
        
    }
}
