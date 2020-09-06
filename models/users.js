module.exports = (dbPoolInstance) =>{

    const findUser = async (queryValues) => {
        try {
            const query = "SELECT * FROM users WHERE username = $1 AND password_hashed = $2;"
            const result = await dbPoolInstance.query(query, queryValues)
                return result
        }
        catch (err) {
            console.log(err.stack)
            throw new Error ("findUserError");
        }
    }

    const getFoodLog = async (queryValues) => {
        const query = "SELECT * FROM food_items WHERE user_id = $1 AND created_at = CURRENT_DATE;"
        try {
            const result = await dbPoolInstance.query(query, queryValues)
            return result
        } catch (err) {
            console.log(err.stack)
            throw new Error ("Can't retrieve food log from database");
        }
    }

    const addFood = async (queryValues) => {
        const query = "INSERT INTO food_items (name, calories, notes, user_id) VALUES ($2, $3, $4, $1);"
        try {
            const result = await dbPoolInstance.query(query, queryValues)
            return result
        } catch (err) {
            console.log(err.stack)
            throw new Error ("failed to add food")
        }
    }

    const deleteFood = async (queryValues) => {
        const query = "DELETE FROM food_items WHERE id = $1;"
        try {
            const result = await dbPoolInstance.query(query, queryValues)
            return result
        } catch (err) {
            console.log(err.stack)
            throw new Error ("delete item failed")
        }
    }

    const checkUsername = async (queryValues) => {
        const query = "SELECT * FROM users WHERE username = $1;"
        try {
            const result = await dbPoolInstance.query(query, queryValues)
            return result
        } catch (err) {
            console.log(err.stack)
            throw new Error ('checkUsername error')
        }
    }

    const addNewUser = async (queryValues) => {
        const query = "INSERT INTO users (username, password_hashed) VALUES ($1, $2);"
        try {
            const result = await dbPoolInstance.query(query, queryValues);
            return result
        } catch (err) {
            console.log(err.stack)
            throw new Error ('addNewUser error')
        }

    }

    return {
        findUser,
        getFoodLog,
        addFood,
        deleteFood,
        checkUsername,
        addNewUser
    }

}