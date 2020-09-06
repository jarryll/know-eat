import React from 'react';

export default class Error extends React.Component {
    render(){
        return(
            <div>
                <h2>Oops, no such food in our database.</h2>
                <form method="GET" action="/err">
                <button type="submit">Try another item</button>
                </form>
            </div>
            )
    }
}