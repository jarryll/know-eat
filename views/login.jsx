import React from 'react';

export default class Login extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                    <link rel="stylesheet" type="text/css" href="css/login-style.css"/>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet"/>
                    <title>knowEat! - Know what you eat</title>
                </head>
                <body>
                    <div className="container">
                        <div className="logo-container">
                            <img src="./images/login-logo.png" className="logo"/>
                        </div>
                        <div className="form-container">
                    <form method="POST" action="/user">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" className="form-control form-control-lg" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className="form-control form-control-lg" required/>
                        </div>
                        <div className="signin-container">
                        <button type="submit" id="signIn" className="btn btn-primary btn-block btn-lg btn-custom">Sign in</button>
                        </div>
                    </form>

                    <div className = "register-container">
                    <form method="GET" action="/register">
                        <button type="submit" id="register" className="btn btn-primary btn-lg btn-block btn-custom">Register</button>
                    </form>
                    </div>
                    </div>
                    </div>
                </body>
            </html>
        )
    }
}