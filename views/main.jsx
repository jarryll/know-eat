import React from 'react';

export default class Main extends React.Component{
    render(){
        let { userNameCookie, foodLog, dateLog } = this.props
        let foodItems = foodLog.rows
        let today = new Date();
        let date = today.getDate() + ' ' +today.toLocaleString('default', {month: 'short'})
        console.log(dateLog)
        let dateList = dateLog.rows.map((item, index) => {
            return (
                <option key={index} className="date-option" value={item.to_char}>{item.to_char}</option>
                )
        })
        console.log(dateList)
        let foodList = foodItems.map((item, index) => {
            return (
                <div key={index}>
                    <form method="POST" action="/remove?_method=DELETE" >
                        <tr scope="row">
                            <td>{item.name}</td>
                            <td>{item.calories_per_serve}</td>
                            <td>{item.serving_size}</td>
                            <td className="calories">{item.total_calories}</td>
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
                     <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"></script>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                    <link rel="stylesheet" type="text/css" href="css/main-style.css"/>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet"/>
                    <title>knowEat! - Know what you eat</title>
            </head>
            <body>
            <div className = "container-fluid">
             <nav className="navbar navbar-light fixed-top justify-content-between navbar-custom">
                    <img className ="logo" src="./images/logo_resized.png"/>
                    <form className="form-inline" method="GET" action="/logout">
                        <button className="btn btn-outline-light" type="submit">Sign out</button>
                    </form>
                </nav>
            </div>
            <div className = "container main-container">

                <h1 id="welcome">Welcome, {userNameCookie}.</h1>

                <div className="food-log">
                <h2 id="date-dashboard">Here's your food log for today, <span id="date">{date}</span>:</h2>

                 <div>
                    <table className = "table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Food</th>
                                <th scope="col">Calories (kcal) per 100g</th>
                                <th scope="col">Serving size (g)</th>
                                <th scope="col">Calories based on serving size</th>
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
                 </div>
                <div className="add-food form-group">
                        <div>
                            <div>
                                <label htmlFor ="foodItem">Food Item</label>
                                <input type ="text" className="form-control" id="foodInput" name="foodItem" placeholder="What did you eat today?" required/>
                            </div>
                            <div className="serving-size">
                                <label htmlFor="serving">Serving Size (in grams)</label>
                                <input type="number" className="form-control" name="serving" id="serving" placeholder="Numeric values only" required/>
                            </div>
                            <div className="notes">
                                <label htmlFor ="notes">Notes</label>
                                <textarea rows="4" cols="60" id="notes" className="form-control" name="notes" placeholder="Add your thoughts here!"/>
                            </div>
                            <div className="log-food-btn">
                                <button type="button" className="btn btn-primary btn-lg btn-block btn-custom popup" id="foodInputButton">Log it!
                                    <p className="popuptext" id="myPopup">Sorry, information for this food item is currently unavailable. <br/>Please try another item.</p>
                                </button>
                            </div>
                        </div>

                    <div className = "daily-log-container">
                        <h2 htmlFor="date-select">Your past logs</h2>
                        <select id="date-select">
                        <option>SELECT DATE</option>
                        {dateList}
                        </select>
                    </div>

                    <div id="daily-log">
                    </div>

                    <div className="weekly-view">
                        <h2>Weekly intake</h2>
                    </div>
                    <div className="chart-container">
                    <canvas id="chartDiv"></canvas>
                    </div>
                </div>
                </div>
                     <script src="script.js" type="text/javascript"></script>
            </body>
            </html>

            )
    }
}