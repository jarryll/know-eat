import React from 'react';

export default class Main extends React.Component{
    render(){
        let { userNameCookie, foodLog } = this.props
        let foodItems = foodLog.rows
        let today = new Date();
        let date = today.getDate() + ' ' +today.toLocaleString('default', {month: 'short'})
        console.log(foodItems);
        let foodList = foodItems.map((item, index) => {
            return (
                <div key={index}>
                    <form method="POST" action="/remove?_method=DELETE" >
                        <tr scope="row">
                            <td>{item.name}</td>
                            <td className="calories">{item.calories}</td>
                            <td>{item.notes}</td>
                            <td>
                                <button type="submit" className="close" name={item.id} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </td>
                        </tr>
                    </form>
                </div>
                )
        })
        return (
            <html>
            <head>
                <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                    <link rel="stylesheet" type="text/css" href="css/style.css"/>
            </head>
            <body>
            <div className = "container">
                <h1>Welcome, {userNameCookie}</h1>
                <h2>Here's your food log for today, {date}:</h2>

                 <div>
                    <table className = "table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Food</th>
                                <th scope="col">Calories (kCal)</th>
                                <th scope="col">Notes</th>
                                <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                            {foodList}
                        </tbody>
                    </table>
                 </div>

                 <div className="totalCaloriesDisplay">
                 </div>

                <div>
                    <form method="POST" action="/addItem">
                        <div>
                            <div>
                                <label htmlFor ="foodItem">Food Item</label>
                                <input type ="text" id="foodInput" name="foodItem"/>
                            </div>
                            <div>
                                <label htmlFor ="notes">Notes</label>
                                <textarea rows="4" cols="60" id="notes" name="notes" placeholder="Add your thoughts about what you ate..."/>
                            </div>
                            <div>
                                <button type="submit" id="foodInputButton">Log it!</button>
                            </div>
                        </div>
                    </form>
                    <form method="GET" action="/logout">
                        <button type="submit" id="register">Log out</button>
                    </form>
                </div>
                <script src="script.js" type="text/javascript"></script>
                </div>
            </body>
            </html>

            )
    }
}