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
        let query = "SELECT food_items.name, food_items.calories, food_items.notes, food_items.created_at FROM users INNER JOIN food_items ON users.id = food_items.user_id WHERE users.username = $1 AND food_items.created_at = CURRENT_DATE;"
        let result = await dbPoolInstance.query(query, queryValues)
            return result
    }

    let addFood = async (queryValues) => {
        let query = "INSERT INTO food_items (name, calories, user_id) VALUES ($2, $3, $1);"
        let result = await dbPoolInstance.query(query, queryValues)
            return result
    }

    return {
        findUser,
        getFoodLog,
        addFood
    }

}