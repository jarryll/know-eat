import React from 'react';

export default class Login extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                    <link rel="stylesheet" type="text/css" href="css/style.css"/>
                </head>
                <body>
                    <div className="container">
                    <h2 className="text-center">Know Eat</h2>
                    <p className="text-center">Keep track of what you eat</p>
                    <form method="POST" action="/user">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" className="form-control form-control-lg" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className="form-control form-control-lg" required/>
                        </div>
                        <button type="submit" id="signIn" className="btn btn-primary btn-lg btn-block">Sign in</button>
                    </form>
                    <form method="GET" action="/register">
                        <button type="submit" id="register">Register</button>
                    </form>
                    </div>
                </body>
            </html>
        )
    }
}