import React from 'react';

export default class Main extends React.Component{
    render(){
        let { userNameCookie, foodLog } = this.props
        let foodItems = foodLog.rows
        console.log(foodItems);
        let foodList = foodItems.map((item, index) => {
            return (
                <div key={index}>
                <p>{item.name}</p>
                <p>{item.calories}</p>
                </div>
                )
        })
        return (
            <html>
            <head></head>
            <body>
                <h1>Welcome, {userNameCookie}</h1>
                 <div>
                 {foodList}
                </div>

                <div>
                    <form method="POST" action="/addItem">
                    <label htmlFor ="foodItem">Food Item</label>
                    <input type ="text" id="foodInput" name="foodItem"/>
                    <div>
                        <button type="button" id="foodInputButton">Log it!</button>
                    </div>
                    </form>
                </div>
                <script src="script.js" type="text/javascript"></script>
            </body>
            </html>

            )
    }
}