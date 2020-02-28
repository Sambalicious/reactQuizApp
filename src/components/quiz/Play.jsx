import React, { Component, Fragment } from 'react';
import {Helmet} from 'react-helmet';
import M from 'materialize-css'
import questions from '../../questions.json';
import isEmpty from '../../is-empty';
import correctSound from '../../assets/audio/correct-answer.mp3';
import wrongSound from '../../assets/audio/wrong-answer.mp3';
import buttonSound from '../../assets/audio/button-sound.mp3';


class Play extends Component {
    state = { 
        questions,
        currentQuestion:{},
        nextQuestion: {},
        previousQuestion: {},
        answer:'',
        numberOfQuestions: 0,
        numberofAnsweredQuestions: 0,
        currentQuestionIndex:0,
        score:0,
        correctAnswer:0,
        wrongAnswers:0,
        hints:5,
        fiftyFifty: 2,
        usedFiftyFifty:false,
        time:{}

     }

     componentDidMount() {
         const { questions, currentQuestion, nextQuestion, previousQuestion} =this.state
         this.displayQuestions(questions, currentQuestion, previousQuestion, nextQuestion );
     }
     

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
            let {currentQuestionIndex} = this.state;
        if(!isEmpty(this.state.questions)){
            questions= this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion =questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex -1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,nextQuestion,previousQuestion,answer
            })
        }
     }
     handleOptionClick = (e) =>{
          if( e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            setTimeout(() => {
                document.getElementById('correct-sound').play();
            },500);
           
            this.handleCorrectAnswer();
          }
          else{
              setTimeout(() => {
                document.getElementById('wrong-sound').play();
              }, 500);
            
              this.handleWrongAnswer();
              
          }
         
     };

     handleCorrectAnswer = () => {
         M.toast({
             html: 'Correct, You are a genius!',
             classes: 'toast-valid',
             displayLength: 1500
         });
         this.setState(prevState => ({
             score: prevState.score + 1,
             correctAnswer: prevState.correctAnswer + 1,
             currentQuestionIndex: prevState.currentQuestionIndex + 1,
             numberofAnsweredQuestions: prevState.numberofAnsweredQuestions + 1
         }),  ()=> {this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.previousQuestion, this.state.nextQuestion)})
     }
     handleWrongAnswer = () => {
         navigator.vibrate(1000);
        M.toast({
            html: 'Not Correct!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberofAnsweredQuestions: prevState.numberofAnsweredQuestions + 1
        }), ()=> {this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.previousQuestion, this.state.nextQuestion)})
    }
    render() { 

        const { currentQuestion} = this.state
        
        return ( 
            <Fragment>
                <Helmet>
                    <title> Quiz Page</title>
                </Helmet>

                <Fragment>
                    <audio id="correct-sound" src={correctSound} />
                    <audio id="wrong-sound" src={wrongSound} />
                    <audio id="button-sound" src={buttonSound} />

                </Fragment>

                <div className="questions">
                    <div className="lifeline-container">
                        <p><span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>2<span className="lifeline"></span></p>
                        <p><span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span>5<span className="lifeline"></span></p>
                    </div>
                        <div className="timer-container">
                            <p><span className="left">1 0f 15</span>
                         <span className="right"> 2:15 <span className="mdi mdi-clock-outline mdi-24px"> </span></span>
                            </p>
                        </div>

                    <h4>{currentQuestion.question}  </h4>
                    <div className="options">
                        <p onClick={this.handleOptionClick} className="option"> {currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick}  className="option">{currentQuestion.optionB}</p>
                    </div>
                        <div className="options">
                        <p onClick={this.handleOptionClick}  className="option">{currentQuestion.optionC}</p>
                        <p onClick={this.handleOptionClick}  className="option">{currentQuestion.optionD}</p>
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