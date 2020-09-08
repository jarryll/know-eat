// For user authentication
const SALT = "it's fun to build apps";
const hash = require('js-sha256');
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
            const dateLog = await db.users.getDates(queryValues);
            const foodLog = await db.users.getFoodLog(queryValues);
            if (loggedInCookie === hash(`${SALT}-${userIdCookie}-true`)) {res.render ('main', { userNameCookie, foodLog, dateLog })}
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

    const logFood = async (req, res) => {
        const user = req.cookies['user']
        const { caloriesPerServe, foodItem, servingSize, notes } = req.body;
        const totalCalories = parseInt(caloriesPerServe / 100 * servingSize);
        let queryValues = [user, foodItem, caloriesPerServe, servingSize, notes, totalCalories]
        console.log(queryValues)
        try {
            const result = await db.users.addFood(queryValues);
            res.send(result)
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
                res.cookie('loggedIn', hash(`${SALT}-${hash(`${result.rows[0]["id"]}`)}-true`))
                res.cookie('user_id', hash(`${result.rows[0]['id']}`))
                res.cookie('username', `${req.body.username}`)
                res.cookie('user',`${result.rows[0]['id']}`)
                res.redirect('/')
            }
            else {
                console.log (result)
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

    const displayLogs = async (req, res) => {
        const user = req.cookies['user']
        const date = req.params.date
        const queryValues = [user, date]
        try {
            const result = await db.users.getDay(queryValues);
            console.log(result, "-------- from controller")
            res.send(result)
        } catch (err) {
            console.log(err.stack)
            throw new Error ('fetching daily data failed')
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
        weeklyData,
        displayLogs
    }
}