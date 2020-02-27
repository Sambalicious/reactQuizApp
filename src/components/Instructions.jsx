import React, { Component, Fragment } from 'react';
import {LInk} from 'react-router-dom';
import { Helmet } from 'react-helmet';


const Instructions = () => {
    return ( 
        <Fragment>
            <Helmet>
                <title>Quiz instructions - Quiz App</title>
            </Helmet>
        <div className="instructions">
               <h1>Instructions For the quiz</h1> 
               <p>Ensure that you go over the instructions on this page</p>

        </div>
        </Fragment>
     );
}
 
export default Instructions;