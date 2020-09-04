module.exports = (dbPoolInstance) =>{

    let findUser = async (queryValues) => {
        try {
            let query = "SELECT * FROM users WHERE username = $1 AND password_hashed = $2;"
            let result = await dbPoolInstance.query(query, queryValues)
                return result
        }
        catch (err) {
            console.log(err.stack)
            throw "findUser error"
        }
    }

    let getFoodLog = async (queryValues) => {
        let query = "SELECT dates.date, food_items.name, food_items.calories, food_items.notes  FROM users INNER JOIN dates ON users.id = dates.user_id INNER JOIN food_items ON dates.id = food_items.date_id WHERE users.username = $1 AND dates.date= CURRENT_DATE;"
        let result = await dbPoolInstance.query(query, queryValues)
            return result
    }

    return {
        findUser,
        getFoodLog
    }

}