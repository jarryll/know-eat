// For user authentication
const SALT = "it's fun to build apps";
const hash = require('js-sha256');

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
                res.redirect('/')
            } else {
                res.send('please create an account')
            }
        } catch (err) {
            console.log(err.stack)
            }
    }

    let logFood = async (req, res) => {
       res.send("jialat")
    }

    return {
        displayMain,
        checkCredentials,
        logFood
    }
}