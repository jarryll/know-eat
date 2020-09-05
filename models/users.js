module.exports = (dbPoolInstance) =>{

    const findUser = async (queryValues) => {
        try {
            const query = "SELECT * FROM users WHERE username = $1 AND password_hashed = $2;"
            const result = await dbPoolInstance.query(query, queryValues)
                return result
        }
        catch (err) {
            console.log(err.stack)
            throw "findUser error"
        }
    }

    const getFoodLog = async (queryValues) => {
        const query = "SELECT * FROM food_items WHERE user_id = $1 AND created_at = CURRENT_DATE;"
        try {
            const result = await dbPoolInstance.query(query, queryValues)
            return result
        } catch (err) {
            throw (err)
        }
    }

    const addFood = async (queryValues) => {
        const query = "INSERT INTO food_items (name, calories, notes, user_id) VALUES ($2, $3, $4, $1);"
        try {
            const result = await dbPoolInstance.query(query, queryValues)
            return result
        } catch (err) {
            throw (err)
        }
    }

    const deleteFood = async (queryValues) => {
        const query = "DELETE FROM food_items WHERE id = $1;"
        try {
            const result = await dbPoolInstance.query(query, queryValues)
            return result
        } catch (err) {
            throw (err)
        }

    }

    return {
        findUser,
        getFoodLog,
        addFood,
        deleteFood
    }

}