import React from 'react';

export default class Register extends React.Component {
    render(){
        return(
            <html>
                <head>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet"/>
                    <link rel="stylesheet" type="text/css" href="css/register-style.css"/>
                    <title>knowEat! - Know what you eat</title>
                </head>
                <body>
                <div className = "container">
                    <div className="logo-container">
                            <img src="./images/login-logo.png" className="logo"/>
                        </div>
                    <div className="form-container">
                    <div>
                        <h4 className="text-center">Sign up for an account - it's free!</h4>
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
                            <button type="submit" id="signIn" className="btn btn-primary btn-lg btn-block btn-custom">Register</button>
                        </form>
                        <div className="backToLogin-container">
                            <form method="GET" action="/login">
                                <p className="text-center">Already have an account?</p>
                                <button type="submit" className="btn btn-primary btn-lg btn-block btn-custom" id="backToLogin">Log in here</button>
                        </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </body>
            </html>

            )
    }
}