// For user authentication
const SALT = "it's fun to build apps";
const hash = require('js-sha256');
const fetch = require('node-fetch');
const appKey = '83410c2b3c621c95336cbc5a222924d9'
const appId = '6673ca50'

module.exports = (db) => {

    let displayMain = async (req, res) => {
        if (!req.cookies['loggedIn']) {res.render('login')}
        else {
            let userIdCookie = req.cookies['user_id']
            let loggedInCookie = req.cookies['loggedIn']
            let userNameCookie = req.cookies['username']
            let queryValues = [userNameCookie]
            let foodLog = await db.users.getFoodLog(queryValues);
            if (loggedInCookie === hash(`${SALT}-${userIdCookie}-true`)) {res.render ('main', {userNameCookie, foodLog })}
            else {
                res.clearCookie('loggedIn');
                res.render('login')
            }
        }
    }

    let checkCredentials = async (req, res) => {
        let queryValues = [req.body.username, hash(req.body.password)];
        try {
            let result = await db.users.findUser(queryValues);
            if (result.rowCount > 0) {
                res.cookie('loggedIn', hash(`${SALT}-${hash(`${result.rows[0]["id"]}`)}-true`))
                res.cookie('user_id', hash(`${result.rows[0]['id']}`))
                res.cookie('username', `${result.rows[0]['username']}`)
                res.cookie('user',`${result.rows[0]['id']}`)
                res.redirect('/')
            } else {
                res.send('please create an account')
            }
        } catch (err) {
            console.log(err.stack)
            }
    }

    let logFood = async (req, res) => {
        let user = req.cookies['user']
        console.log(user)
        let findFood = async (foodName) => {
            let url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${foodName}&app_id=${appId}&app_key=${appKey}`
            try {
                let response = await fetch(url)
                let foodInfo = await response.json();
                let calories = (foodInfo["parsed"][0]["food"]["nutrients"]["ENERC_KCAL"])
                try {
                    let queryValues = [user, foodInfo.text, calories]
                    let result = await db.users.addFood(queryValues)
                    res.redirect("/")
                } catch(err) {
                    console.log(err.stack);
                    throw('something went wrong with adding food item')
                }
            } catch (err) {
                console.log(err.stack)
                throw("no such food")
            }
        }
       findFood(req.body.foodItem)
    }

    return {
        displayMain,
        checkCredentials,
        logFood
    }
}