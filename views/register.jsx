import React from 'react';

export default class Register extends React.Component {
    render(){
        return(
            <html>
                <head>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                    <link rel="stylesheet" type="text/css" href="css/style.css"/>
                </head>
                <body>
                    <div>
                        <h2>Sign up for an account - it's free!</h2>
                    </div>
                    <div>
                        <form method="POST" action="/newUser">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" className="form-control form-control-lg" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password (min length 8)</label>
                                <input type="password" name="password" className="form-control form-control-lg" minLength="8" required/>
                            </div>
                            <button type="submit" id="signIn" className="btn btn-primary btn-lg btn-block">Register</button>
                        </form>
                    </div>
                </body>
            </html>

            )
    }
}