import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

class QuizSummary extends Component {

    constructor(props){
        super(props)
            
            this.state = { 
                score: 0,
                numberOfQuestions:0, 
                numberOfAnsweredQuestions: 0,
                correctAnswers: 0,
                wrongAnswers: 0,
                hintUsed:0,
                fiftyFiftyUsed:0,
                hints:5,
                fiftyFifty: 2
             

        }
    }

    componentDidMount() {
            
        const { state } = this.props.location;
        if (state){

            this.setState({
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestions: state.numberOfQuestions, 
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                hintUsed:state.hintUsed,
                fiftyFiftyUsed:state.fiftyFiftyUsed
            });
        }
       
    }

    
    render() { 
           
        const score = this.state.score;
        const state = this.props.location.state;

        
        let stat, remark;
            if (score <= 30 ){
                remark ='Nice try! seek more knowledge and try again.';
            }
            else if (score > 30 && score <= 50){
                remark = 'Good try! You can do more.';
            } else if(score <= 70 && score > 50 ){
                remark = 'Good try. you are capable of more';
            }
            else if(score >= 71 && score <= 84){
                remark = 'Wow, You are awesome!';
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
                    <h1 style={{textAlign:"center"}}>Test has ended</h1>
                    <div className="container">
                        <h4> {remark} </h4>
                        <h2> Your score : {this.state.score.toFixed()}&#37; </h2>

                        <span className="left stat">Total number of questions:</span>
                        <span className="right"> { this.state.numberOfQuestions} </span><br/>


                        <span className="left stat">Total number of Answered questions:</span>
                        <span className="right"> { this.state.numberOfAnsweredQuestions} </span><br/>


                        <span className="left stat">Total number of correct answers:</span>
                        <span className="right"> { this.state.correctAnswers} </span><br/>


                        <span className="left stat">Total number of wrong answers:</span>
                        <span className="right"> { this.state.wrongAnswers} </span><br/>

                        <span className="left stat">Total number of Fifty-Fifty lifeline used:</span>
                        <span className="right"> { this.state.fiftyFiftyUsed} out of {this.state.fiftyFifty} </span><br/>


                        <span className="left stat">Total number of Hints used:</span>
                        <span className="right"> { this.state.hintUsed}  out of {this.state.hints} </span><br/>


                    </div>
                   < br/> <br/>

                    <section>
                        <ul>
                            <li className="left">
                                <Link to="/">Back to Homepage</Link>
                                </li>
                                <li className="right">
                                <Link to="/play/instructions">Retake Test</Link>
                                </li>
                                
                            
                            </ul>
                    </section>
                </Fragment>
            )
        }

        else{
            stat = (
            <section>
            <h1 className="no-stats">No available test statistics</h1>
            
            <ul>
                <li className='left'>
                    <Link to="/">Back to Homepage</Link>
                </li>
                <li className="right">
                    <Link to="/play/quiz">Take a quiz</Link>
                </li>
                    
                
                </ul>
        </section>
        )
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