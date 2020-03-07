import React, { Component, Fragment } from 'react';
import {Helmet} from 'react-helmet';
import M from 'materialize-css'
import questions from '../../questions.json';
import isEmpty from '../../is-empty';
import correctSound from '../../assets/audio/correct-answer.mp3';
import wrongSound from '../../assets/audio/wrong-answer.mp3';
import buttonSound from '../../assets/audio/button-sound.mp3';
import classnames from 'classnames';


class Play extends Component {
    state = { 
        questions,
        currentQuestion:{},
        nextQuestion: {},
        previousQuestion: {},
        answer:'',
        numberOfQuestions: 0,
        numberOfAnsweredQuestions: 0,
        currentQuestionIndex:0,
        score:0,
        correctAnswers:0,
        wrongAnswers:0,
        hints:5,
        fiftyFifty: 2,
        usedFiftyFifty:false,
        time:{}, 
        previousRandomNumbers: [],
        nextBtnDisabled:false,
        previousBtnDisabled: true,

        

     };

     interval = null;
     correctSound  = React.createRef();
     wrongSound = React.createRef();
     buttonSound = React.createRef();
    

     componentDidMount() {
         const { questions, currentQuestion, nextQuestion, previousQuestion} =this.state
         this.displayQuestions(questions, currentQuestion, previousQuestion, nextQuestion );
         this.startTimer();
     }
     componentWillUnmount(){
         clearInterval(this.interval)
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
                currentQuestion,
                numberOfQuestions:questions.length,
                nextQuestion,previousQuestion,answer, previousRandomNumbers :[]
            }, () => {
                this.showOptions();
                this.handledDisabledBtn();
            });
        }
     }
     handleOptionClick = (e) =>{
          if( e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            setTimeout(() => {
                
                this.correctSound.current.play();
            },500);
           
            this.handleCorrectAnswer();
          }
          else{
              setTimeout(() => {
                
                this.wrongSound.current.play();
              }, 500);
            
              this.handleWrongAnswer();
              
          }
         
     };

     handleNextButton = () => {
         this.playButtonSound();
         if (this.state.nextQuestion !== undefined){
              this.setState(prevState => ({
                  currentQuestionIndex: prevState.currentQuestionIndex + 1
              }), () => {
                  this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
              });
         }
     }

     handlePreviousButton = () => {
         this.playButtonSound();
         if (this.state.previousQuestion !== undefined){
             this.setState(prevState => ({
                 currentQuestionIndex: prevState.currentQuestionIndex - 1
                  
             }), () => {this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
                
             })
         }
     }

     handleQuitBtn = () => {
         alert('Are you sure you want to end the test now?');
         this.props.history.push('/play/summary');
     }

     handleButtonClick = (e) => {
         this.playButtonSound();

            switch (e.target.id) {
                case 'previousBtn':
                    this.handlePreviousButton();                 
                    break;
                case 'nextBtn': 
                this.handleNextButton();
                break;

                case 'quitBtn': 
                this.handleQuitBtn();
                
                default: 
                    break;
            }
     };
     
     playButtonSound =()=>{
         
         this.buttonSound.current.play()
     }

     handleCorrectAnswer = () => {
         M.toast({
             html: 'Correct, You are a genius!',
             classes: 'toast-valid',
             displayLength: 1500
         });
         this.setState(prevState => ({
             score: prevState.score + 1,
             correctAnswers: prevState.correctAnswers + 1,
             currentQuestionIndex: prevState.currentQuestionIndex + 1,
             numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
         }),  ()=> {
             if (this.state.nextQuestion === undefined){
                 this.testEnded();
             }
             else{
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.previousQuestion, this.state.nextQuestion);
            }
        })
            
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
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), ()=> {
            if (this.state.nextQuestion === undefined){
            this.testEnded()
        }else{
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.previousQuestion, this.state.nextQuestion);
        }
     })
    ;
};

    showOptions=() => {
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.style.visibility = "visible";
        });
        this.setState({
            usedFiftyFifty: false
        })
    }
    handleHints = () => { 
        if(this.state.hints > 0){
            const options = Array.from(document.querySelectorAll('.option'));
        let indexOfAnswer;
        options.forEach((option, index) => {
            if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
                indexOfAnswer = index
            }
        });

        while(true){
           const randomNumber = Math.round(Math.random() * 3);
           if(randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)){
               options.forEach((option, index) =>{
                   if(index === randomNumber){
                       option.style.visibility="hidden";
                       this.setState(prevState => ({
                       hints: prevState.hints - 1,
                       previousRandomNumbers : prevState.previousRandomNumbers.concat(randomNumber)
                   }));
                   }
                   
               });
               break;
           }
        }

        }
        
    };

    handleFifty = () => {
        if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false){
            const options = document.querySelectorAll('.option');
            const randomNumbers = [];
            let indexOfAnswer;

            options.forEach((option, index) => {
                if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
                    indexOfAnswer = index;
                }
            });

            let count = 0;
            do {

                const randomNumber = Math.round(Math.random() * 3);
                if(randomNumber !== indexOfAnswer){
                    if(randomNumbers.length < 2 &&!randomNumbers.includes(randomNumber)
                     && !randomNumbers.includes(indexOfAnswer)){;
                     randomNumbers.push(randomNumber);
                     count++;
                }else{
                    while(true){
                        const newRandomNumber = Math.round(Math.random() * 3);
                        if(!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)){
                            randomNumbers.push(newRandomNumber);
                            count++;
              
                            break;
                        }
                    }

                }

            }
        }while (count < 2);

            options.forEach((option, index)=>{
                if(randomNumbers.includes(index)){
                    option.style.visibility = "hidden"
                }
            });
            this.setState(prevState => ({
                fiftyFifty: prevState.fiftyFifty - 1,
                usedFiftyFifty: true
            }))

        }
    };

    ////setting the timer
    startTimer = () => {
        ////adjust the length of the exam here 
        const countDownTime = Date.now() + 70000;
        this.interval =setInterval(() => {
                const now = new Date();
                const distance = countDownTime - now;

                const minutes = Math.floor((distance % (1000 * 60 * 60))/ (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60 ))/ (1000 ));

                if(distance < 0){
                    clearInterval(this.interval);
                    this.setState({
                        time: {
                            minutes: 0,
                        seconds: 0
                        } 


                    }, ()=> {
                        this.testEnded();
                    });
                }
                else{
                    this.setState({
                        time: {
                            minutes,seconds, distance
                        }
                    })
                }
        }, 1000);

    };

    handledDisabledBtn= () => {
        //disabliing previous button
        if(this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0){

            this.setState({
                previousBtnDisabled: true
            });
        }else{
            this.setState({
                previousBtnDisabled: false
            });
        }
        //disabling next button
        if(this.state.nextQuestion === undefined || this.state.currentQuestion + 1  ===this.state.questions.length ){

            this.setState({
                nextBtnDisabled: true
            });
        }else{
            this.setState({
                nextBtnDisabled: false
            });
        }
    }

    testEnded = () => {
       alert('Test ended!');

       const {state} = this
       const scores = {
           score: state.score,
           numberOfQuestions: state.numberOfQuestions,
           numberOfAnsweredQuestions: (state.correctAnswers + state.wrongAnswers ),
           correctAnswers: state.correctAnswers,
           wrongAnswers: state.wrongAnswers,
           fiftyFiftyUsed: 2 - state.fiftyFifty,
           hintUsed: 5 - state.hints

       };
       
       setTimeout(() => {
           this.props.history.push('/play/summary', scores);
       }, 1000);
    }

    render() { 

        const { currentQuestion,time} = this.state
        
        return ( 
            <Fragment>
                <Helmet>
                    <title> Quiz Page</title>
                </Helmet>

                <Fragment>
                    <audio ref={this.correctSound} src={correctSound} />
                    <audio ref={this.wrongSound} src={wrongSound} />
                    <audio ref={this.buttonSound} src={buttonSound} />

                </Fragment>

                <div className="questions">
                    <div className="lifeline-container">
                        <p><span onClick={this.handleFifty} className="mdi mdi-set-center mdi-24px lifeline-icon"></span>{this.state.fiftyFifty} <span  className="lifeline"></span></p>
                        <p><span onClick={this.handleHints} className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span> {this.state.hints} <span  className="lifeline"></span></p>
                    </div>
                        <div className="timer-container">
                            <p>
                                <span className="left">  {this.state.currentQuestionIndex + 1} Of {this.state.questions.length}</span>
                         <span className={classnames('right valid', {
                             'warning': time.distance <= 12000,
                             'invalid': time.distance <= 9000
                         })}>{time.minutes}:{time.seconds}
                        <span className="mdi mdi-clock-outline mdi-24px clock"> </span></span>
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
                            <button 
                            className={classnames('', {'disabled': this.state.previousBtnDisabled
                            })} id="previousBtn" onClick={this.handleButtonClick}>Previous</button>
                            <button
                                className={classnames('', {'disabled': this.state.nextBtnDisabled
                            })}
                            id="nextBtn"  onClick={this.handleButtonClick}>Next</button>
                            <button
                                
                            id='quitBtn' onClick={this.handleButtonClick}> Quit</button>
                        </div>
                </div>
            </Fragment>
         );
    }
}
 
export default Play;