import React from 'react';

export default class NoSuchUser extends React.Component {
    render(){
        return(
            <div>
                <h2>Couldn't find your account. Please check your username and/or password</h2>
                <form method="GET" action="/userNotFound">
                    <button type="submit">Try again</button>
                </form>
            </div>
            )
    }
}