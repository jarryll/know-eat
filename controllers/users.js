// For user authentication
const SALT = "it's fun to build apps";
const hash = require('js-sha256');

module.exports = (db) => {

    let test = (req, res) => res.render('login')

    let checkCredentials = async (req, res) => {
        let values = [req.body.username, hash(req.body.password)];
        try {
            let result = await db.users.findUser(values);
            if (result.rowCount > 0) {
                res.cookie('loggedIn', hash(`${SALT}-${hash(`${result.rows[0]["id"]}`)}-true`))
                res.cookie('user_id', hash(`${result.rows[0]['id']}`))
                res.render('main')
            } else {
                res.send('please create an account')
            }
        } catch (err) {
            console.log(err.stack)
            }
    }

    return {
        test,
        checkCredentials
    }
}