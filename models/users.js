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

    const getDates = async (queryValues) =>{
        const query = "SELECT DISTINCT TO_CHAR(created_at, 'FMDD MON YYYY') FROM food_items WHERE user_id = $1;"
        try {
            const result = await dbPoolInstance.query(query, queryValues)
            return result
        } catch (err) {
            console.log(err.stack)
            throw new Error ("failed to fetch dates");
        }
    }

    const addFood = async (queryValues) => {
        const query = "INSERT INTO food_items (name, calories_per_serve, serving_size, total_calories, notes, user_id) VALUES ($2, $3, $4, $6, $5, $1);"
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
        const query = "INSERT INTO users (username, password_hashed) VALUES ($1, $2) RETURNING id;"
        try {
            const result = await dbPoolInstance.query(query, queryValues);
            return result
        } catch (err) {
            console.log(err.stack)
            throw new Error ('addNewUser error')
        }
    }

    const getWeeklyData = async(queryValues) => {
        const query = "SELECT SUM(total_calories), TO_CHAR(created_at, 'FMDD MON') FROM food_items WHERE user_id = $1 AND created_at > current_date - interval '7 days' GROUP BY created_at ORDER BY created_at ASC;"
        try {
           const result = await dbPoolInstance.query(query, queryValues);
            return result
        } catch (err) {
            console.log(err.stack)
            throw new Error ('getWeeklyData error')
        }
    }

    const getDay = async (queryValues) => {
        const query = "SELECT * FROM food_items WHERE user_id = $1 AND created_at = TO_DATE($2, 'FMDD-MON-YYYY');"
        try {
           const result = await dbPoolInstance.query(query, queryValues);
            return result.rows
        } catch (err) {
            console.log(err.stack)
            throw new Error ('get daily data error')
        }
    }

    return {
        findUser,
        getFoodLog,
        addFood,
        deleteFood,
        checkUsername,
        addNewUser,
        getWeeklyData,
        getDates,
        getDay
    }

}