import React, { Component } from 'react';


class QuizSummary extends Component {

    constructor(props){
        super(props);

        this.state = { 
            score: 0,
            numberOfQuestion:0, 
            numberOfAnsweredQuestion: 0,
            correctAnswer: 0,
            WrongAnswer: 0,
            hintUsed:0,
            fiftyFiftyUsed:0
         }
    }

    componentDidMount() {

        const { state } = this.props.location
        this.setState({
            score: (state.score / state.numberOfQuestion)* 100,
            numberOfQuestion: state.numberOfQuestion, 
            numberOfAnsweredQuestion: state.numberOfAnsweredQuestion,
            correctAnswer: state.correctAnswer,
            WrongAnswer: state.WrongAnswer,
            hintUsed:state.hintUsed,
            fiftyFiftyUsed:state.fiftyFiftyUsed
        })
    }
    
    render() { 
        return (  
            <div>hello from summary </div>
        );
    }
}
 
export default QuizSummary;