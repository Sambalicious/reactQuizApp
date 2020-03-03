import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import answer from '../assets/img/answer.png';
import fifty from '../assets/img/fiftyFifty.PNG';
import hints from '../assets/img/hints.PNG';
import options from '../assets/img/options.PNG';



const Instructions = () => {
    return ( 
        <Fragment>
            <Helmet>
                <title>Quiz instructions - Quiz App</title>
            </Helmet>
        <div className="instructions">
               <h1>Instructions For the quiz</h1> 
               <p>Ensure that you go over the instructions on this page</p>
                <ul className="browser-default" id="main-list">
                    <li> The quiz will play out for exactly 15minutes and ends as soon as your time lapses</li>
                    <li>In Each quiz, there are 15 questions generated from the server.</li>
                    <li>Every question has 4 options to choose from.
                        <br/><br/>
                        <img  src={options} alt="options"/>
                    </li>
                        <br/><br/>
                    <li>Select your answer by clicking on one of the options
                        <br/><br/>
                        <img src={answer} alt=" demo quiz answer"/>
                    </li>
                    <li>For Each quiz, you can have 2 lifelines namely: 
                        <ul className="sublist">
                            <li>2 50-50 chances</li>
                            <li>5 Hints lifeline</li>
                        </ul>

                    </li> 
                    <li>Select the Fifty-Fifty chance by clicking on the icon
                        <span className="mdi mdi-set-center mdi-24px lifeline icon"></span>. 
                         This leaves you with one right answer and one wrong answer
                         <br/><br/>
                        <img src={fifty} alt="demo fifty fifty options"/>
                    </li>
                    <li>Selecting the icon  
                    <span className="mdi mdi-lightbulb-on mdi-24px lifeline icon"></span>. 
                        Will remove one wrong answer, one at a time. You can use this option
                         as many times
                        on a question <br/><br/>
                        <img src={hints} alt="demo hints options"/>
                     </li>
                     <li>You can quit the game at any point by clicking on the quit button, after which your scores will be revealed</li>
                    <li> The timer starts as soon as the game loads</li>
                    <li>if you are ready to proceed, click the proceed to question button</li>
                </ul>
                <div className="edited">
                    <span className="left"><Link to="/">No, take me back</Link></span>
                    <span className="right"><Link to="/play/quiz">Proceed to Questions</Link></span>
                    </div>

                    <span className="mdi mdi-copywrite">developed by Samuel Ayegbusi</span>
        </div>
        </Fragment>
     );
}
 
export default Instructions;