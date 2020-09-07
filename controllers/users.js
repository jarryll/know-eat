// For user authentication
const SALT = "it's fun to build apps";
const hash = require('js-sha256');
const fetch = require('node-fetch');
const appKey = '83410c2b3c621c95336cbc5a222924d9'
const appId = '6673ca50'

module.exports = (db) => {

    const displayMain = async (req, res) => {
        if (!req.cookies['loggedIn']) {res.render('login')}
        else {
            const userIdCookie = req.cookies['user_id']
            const loggedInCookie = req.cookies['loggedIn']
            const userNameCookie = req.cookies['username']
            const user = req.cookies['user']
            const queryValues = [user]
            const foodLog = await db.users.getFoodLog(queryValues);
            if (loggedInCookie === hash(`${SALT}-${userIdCookie}-true`)) {res.render ('main', { userNameCookie, foodLog })}
            else {
                res.clearCookie('loggedIn');
                res.render('login')
            }
        }
    }

    const checkCredentials = async (req, res) => {
        const queryValues = [req.body.username, hash(req.body.password)];
        try {
            const result = await db.users.findUser(queryValues);
            if (result.rowCount > 0) {
                res.cookie('loggedIn', hash(`${SALT}-${hash(`${result.rows[0]["id"]}`)}-true`))
                res.cookie('user_id', hash(`${result.rows[0]['id']}`))
                res.cookie('username', `${result.rows[0]['username']}`)
                res.cookie('user',`${result.rows[0]['id']}`)
                res.redirect('/')
            } else {
                res.render('nosuchuser')
            }
        } catch (err) {
            console.log(err.stack)
            throw new Error ("checkCredentials function not working ")
            }
    }

    const findFood = async (foodName) => {
        const url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${foodName}&app_id=${appId}&app_key=${appKey}`
        try {
            const response = await fetch(url)
            const foodInfo = await response.json();
            const calories = (foodInfo["parsed"][0]["food"]["nutrients"]["ENERC_KCAL"])
            const foodItem = foodInfo.text
            return {
                calories,
                foodItem
            }
        } catch (err) {
            throw new Error("no such food item in database")
        }
    }

    const logFood = async (req, res) => {
        const user = req.cookies['user']
        try {
         const { calories, foodItem } = await findFood(req.body.foodItem);
         const queryValues = [user, foodItem, calories, req.body.notes];
         const result = await db.users.addFood(queryValues);
         res.redirect('/');
        } catch (err) {
            res.render('error')
            throw new Error ("failed to add food to database")
        }
    }

    const removeFood = async (req, res) => {
        const queryValues = [Object.keys(req.body)[0]]
        try {
            const result = await db.users.deleteFood(queryValues);
            res.redirect('/');
        } catch (err) {
            throw new Error ('something went wrong with the delete food function')
        }
    }

    const logOut = (req, res) => {
        res.clearCookie('loggedIn');
        res.clearCookie('user');
        res.clearCookie('user_id');
        res.clearCookie('username');
        res.redirect('/')
    }

    const registerForm = (req, res) => {
        res.render('register')
    }

    const createUser = async (req, res) => {
        let queryValues = [req.body.username];
        try {
            let result = await db.users.checkUsername(queryValues);
            if (result.rowCount === 0) {
                queryValues = [req.body.username, hash(req.body.password)]
                result = await db.users.addNewUser(queryValues)
                res.render('success')
            }
            else {
                res.render('tryagain')
            }
        } catch (err) {
            console.log(err.stack)
            throw new Error ('createUser error')
        }
    }

    const backToMain = (req, res) => {
        res.redirect('/')
    }

    const directToLogin = (req, res) => {
        res.render('login')
    }

    const backToRegister = (req, res) => {
        res.render('register')
    }

    const weeklyData = async (req, res)=> {
        console.log("weekly data function called")
        const user = req.cookies['user']
        const queryValues = [user]
        try {
            const result = await db.users.getWeeklyData(queryValues);
            res.send(result)
        } catch (err) {
            console.log(err.stack)
            throw new Error ('fetching weekly data failed')
        }
    }

    return {
        displayMain,
        checkCredentials,
        logFood,
        removeFood,
        logOut,
        registerForm,
        createUser,
        backToMain,
        directToLogin,
        backToRegister,
        weeklyData
    }
}