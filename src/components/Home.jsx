import React, {Fragment} from 'react';
import { Helmet} from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = () => {
    return ( 
        <Fragment>
            <Helmet>
                <title>Quiz App -Home</title>
            </Helmet>
        <div id="home">
            <section>
                <div style={{textAlign:"center"}}>
                    <span className="cube mdi mdi-cube-outline mdi-48px"></span>
                </div>
                <h1>Computer Based Test -Demo</h1>
                <div className="playBtn">
                    <ul>
                        <li><Link  className="play-button" to="/play/instructions">Play Demo</Link></li>
                    </ul>
                    <br/><br/><br/>

                    <span className=" mdi mdi-copyright center">Developed by Samuel Ayegbusi</span>
                </div>

                { /*
                 <div className="auth-container">
                    <Link className="auth-buttons" id="login-btn" to="/login">Login</Link>
                    <Link to="/register" id="signup-btn" className="auth-buttons">Register</Link>
                </div>
                */}
            </section>
            
        </div>
        </Fragment>
     );
}
 
export default Home;