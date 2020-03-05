import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

class QuizSummary extends Component {

    constructor(props){
        super(props)

            this.state = { 
                score: 0,
                numberOfQuestion:0, 
                numberOfAnsweredQuestion: 0,
                correctAnswers: 0,
                WrongAnswers: 0,
                hintUsed:0,
                fiftyFiftyUsed:0
             

        }
    }

    componentDidMount() {

        const { state } = this.props.location;
        if (state){

            this.setState({
                score: (state.score / state.numberOfQuestion)* 100,
                numberOfQuestion: state.numberOfQuestion, 
                numberOfAnsweredQuestion: state.numberOfAnsweredQuestion,
                correctAnswers: state.correctAnswers,
                WrongAnswers: state.WrongAnswers,
                hintUsed:state.hintUsed,
                fiftyFiftyUsed:state.fiftyFiftyUsed
            });
        }
       
    }

    
    render() { 
        
        const { state, score } = this.props.location;
        let stat, remark;
            if (score <= 30 ){
                remark ='Nice try!, But you are capable of more.';
            }
            else if (score > 30 && score <= 50){
                remark = 'Good try!. You can do more.';
            } else if(score <= 70 && score > 50 ){
                remark = 'Good try. you are capable of more';
            }
            else if( score >= 71 && score <= 84){
                remark = 'Wow, Your are awesome!';
            }
            else{
                remark = 'Wonderful, You are a genius';
            }

        if(state !== undefined){
            stat = (
                <Fragment>
                    <div>
                        <span className="mdi mdi-check-circle-outline success-icon"></span>
                    </div>
                    <h1>Test has ended</h1>
                    <div className="container">
                        <h4> {remark} </h4>
                        <h2> Your score : {this.state.score.toFixed()}&#37; </h2>
                        <span className="left stat">Total number of questions:</span>
                        <span className="right"> { this.state.numberOfQuestion} </span><br/>


                        <span className="left stat">Total number of Answered questions:</span>
                        <span className="right"> { this.state.numberOfAnsweredQuestion} </span><br/>


                        <span className="left stat">Total number of correct answers:</span>
                        <span className="right"> { this.state.correctAnswers} </span><br/>


                        <span className="left stat">Total number of wrong answwers:</span>
                        <span className="right"> { this.state.WrongAnswers} </span><br/>

                        <span className="left stat">Total number of Fifty-Fifty lifeline used:</span>
                        <span className="right"> { this.state.fiftyFiftyUsed} </span><br/>


                        <span className="left stat">Total number of Hints used:</span>
                        <span className="right"> { this.state.hintUsed} </span><br/>


                    </div>

                    <section>
                        <ul>
                            <li>
                                <Link to="/">Back to Homepage</Link>
                            </li>
                            </ul>
                    </section>
                </Fragment>
            )
        }

        else{
            stat = (<h1>stat is unavailable. Go back and take a test.</h1>)
        }
        return (  
            <Fragment>
                <Helmet><title>Test Summary</title></Helmet>
                {stat}


            </Fragment>
        );
    }
}
 
export default QuizSummary;