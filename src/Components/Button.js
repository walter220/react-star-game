import React from 'react';

const Button = (props) => {
    const { numbers, answerState, retryAttemps } = props;

    let button;
    switch (answerState) {
        case 'correct':
            button = (
                <button className="btn btn-lg btn-success"
                    onClick={() => { props.acceptAnswer() }}>
                    <i className="fa fa-check"></i>
                </button>)
            break;
        case 'incorrect':
            button = (
                <button className="btn btn-lg btn-danger"
                    onClick={() => { props.checkAnswer() }}>
                    <i className="fa fa-times"></i>
                </button>)
            break;
        case 'win':
            button = ''
            break;
        case 'lose':
            button = ''
            break;
        default:
            button = (
                <button className="btn btn-lg btn-primary"
                    disabled={numbers.length === 0}
                    onClick={() => { props.checkAnswer() }}>
                    =
            </button>)
            break;
    }

    return (
        <div className="row text-center">
            <div className="col-12">
                {button}
            </div>
            <div className="col-12">
                <button className="btn btn-warning mt-3 text-white"
                    disabled={retryAttemps === 0 || answerState === 'win' || answerState === 'lose'}
                    onClick={() => props.retryStars()}>
                    <i className="fa fa-sync text-white"></i>
                    <span className="font-weight-light"> {retryAttemps}</span>
                </button>
            </div>
        </div>
    )
}

export default Button;
