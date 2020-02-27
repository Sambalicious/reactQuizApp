import React, { Component, Fragment } from 'react';
import {Helmet} from 'react-helmet';



class Play extends Component {
    state = {  }
    render() { 
        return ( 
            <Fragment>
                <Helmet>
                    <title> Quiz Page</title>
                </Helmet>

                <div className="questions">
                    <div className="lifeline-container">
                        <p><span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>2<span className="lifeline"></span></p>
                        <p><span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span>5<span className="lifeline"></span></p>
                    </div>
                        <div>
                            <p><span>1 0f 15</span>
                           2:15 <span className="mdi mdi-clock-outline mdi-24px"></span>
                            </p>
                        </div>

                    <h4>Nigeria got her Independence in what year?</h4>
                    <div className="options">
                        <p className="option">1999</p>
                        <p className="option">1999</p>
                    </div>
                        <div className="options">
                        <p className="option">1960</p>
                        <p className="option">2020</p>
                        </div>

                        <div className="btn-container">
                            <button>Previous</button>
                            <button>Next</button>
                            <button> Quit</button>
                        </div>
                </div>
            </Fragment>
         );
    }
}
 
export default Play;