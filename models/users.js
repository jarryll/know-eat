module.exports = (dbPoolInstance) =>{

    let findUser = async (values) => {
        try {
            let query = "SELECT * FROM users WHERE username = $1 AND password_hashed = $2;"
            let result = await dbPoolInstance.query(query, values)
                return result
        }
        catch (err) {
            console.log(err.stack)
            throw "findUser error"
        }
    }

    return {
        findUser
    }

}