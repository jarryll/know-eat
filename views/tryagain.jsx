import React from 'react';

export default class Tryagain extends React.Component {
    render(){
        return(
            <html>
            <head>
                <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                     <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"></script>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
                    <link rel="stylesheet" type="text/css" href="css/tryagain-style.css"/>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet"/>
                    <title>knowEat! - Know what you eat</title>
            </head>
            <body>

                <nav className="navbar navbar-light fixed-top justify-content-between navbar-custom">
                    <img className ="logo" src="./images/logo_resized.png"/>
                </nav>
                <div className="text-center container container-custom">
                    <h3>The username you have chosen already exists. Please choose another.</h3>
                    <form method="GET" action="/userExists">
                        <button type="submit" className="btn btn-primary btn-lg btn-custom">Try again</button>
                    </form>
                </div>

                </body>

            </html>

            )
    }
}