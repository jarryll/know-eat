import React from 'react';

export default class Success extends React.Component {
    render(){
        return(
            <div>
                <h2>Account successfully created!</h2>
                <form method="GET" action="/success">
                <button type="submit">Click here to log in</button>
                </form>
            </div>
            )
    }
}