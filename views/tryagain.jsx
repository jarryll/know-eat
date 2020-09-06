import React from 'react';

export default class Tryagain extends React.Component {
    render(){
        return(
            <div>
            <h2>The username you have chosen already exists. Please choose another.</h2>
            <form method="GET" action="/userExists">
                <button type="submit">Try again</button>
            </form>
            </div>
            )
    }
}