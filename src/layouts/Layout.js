import React from 'react'

// React helmet
import Helmet from 'react-helmet'

export const Layout = ({children}) => {

  return (
    <>
        <Helmet>
            <title>Weather App</title>
            
            {/* Bootstrap */}
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous" />
            
            {/* Font awesome */}
            <script src="https://kit.fontawesome.com/8ea51260da.js" crossorigin="anonymous"></script>

            {/* Google fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        </Helmet>
        <header className='website-header'>
            <div className="container website-inner">
                <div className="row">
                    <div className="col-2">
                        <div className="logo">
                            <h2>Weatherfully</h2>
                        </div>
                    </div>
                    <div className="col-10">
                        <div className="menu">
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/about">About</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div className="website">
            {children}
        </div>
        <footer className='website-footer'>
            <div className="container website-inner">
                <div className="row">
                    <div className="col-12">
                        <div className="footer">
                            <p>Weatherfully &copy; 2023 - Created by <a href="https://jameslatten.com">James</a> from <a href="https://lattentechnologies.com">Latten Technologies, LLC</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}
