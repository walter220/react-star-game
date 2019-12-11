import React from 'react';
import _ from 'lodash';

import Stars from './Stars';
import Button from './Button';
import Answer from './Answer';
import Numbers from './Numbers';


class Game extends React.Component {
    static getNewStarCount = (oldNum) => {
        let newNum = Math.ceil(Math.random() * 9);
        while (newNum === oldNum) {
            newNum = Math.ceil(Math.random() * 9);
        }
        return newNum;
    };

    possibleSolutions = (arr, n) => {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
            arr.pop();
            return this.possibleSolutions(arr, n);
        }
        let listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount; i++) {
            var combinationSum = 0;
            for (var j = 0; j < listSize; j++) {
                if (i & (1 << j)) { combinationSum += arr[j]; }
            }
            if (n === combinationSum) { return true; }
        }
        return false;
    }

    state = {
        selectedNumbers: [],
        usedNumbers: [],
        stars: Game.getNewStarCount(0),
        answerState: 'initial',
        retryAttemps: 10,
    };

    selectNumber = (num) => {
        if (this.state.usedNumbers.indexOf(num) >= 0) { return; }
        if (this.state.selectedNumbers.indexOf(num) >= 0) { return; }
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.concat(num),
        }));
    }

    removeNumber = (num) => {
        this.setState(() => ({
            selectedNumbers: this.state.selectedNumbers.filter(n => n !== num),
        }));
    }

    checkAnswer = () => {
        if (this.state.stars ===
            this.state.selectedNumbers.reduce((acc, n) => acc + n, 0)) {
            this.setState(() => ({
                answerState: 'correct'
            }));
        } else {
            this.setState(() => ({
                answerState: 'incorrect'
            }));
        }
    }

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            stars: Game.getNewStarCount(prevState.stars),
            answerState: 'initial',
        }), () => this.checkGameFinished());
    }

    retryStars = () => {
        if (this.state.retryAttemps === 0) {
            return;
        }
        this.setState(prevState => ({
            selectedNumbers: [],
            answerState: 'initial',
            retryAttemps: prevState.retryAttemps - 1,
            stars: Game.getNewStarCount(prevState.stars),
        }), () => this.checkGameFinished());
    }

    resetGame = () => {
        this.setState(prevState => ({
            usedNumbers: [],
            selectedNumbers: [],
            stars: Game.getNewStarCount(prevState.stars),
            answerState: 'initial',
            retryAttemps: 10,
        }));
    }

    checkGameFinished = () => {
        if (this.state.usedNumbers.length === 9) {
            this.setState(() => ({
                answerState: 'win'
            }));
            return;
        }

        if (this.state.retryAttemps === 0) {
            const nums = _.range(1,10).filter((n => 
                this.state.usedNumbers.indexOf(n) === -1
            ));

            if (!this.possibleSolutions(nums, this.state.stars)) {
                this.setState(() => ({
                    answerState: 'lose'
                }));
            }
        }
    }

    render() {
        const {
            stars,
            selectedNumbers,
            usedNumbers,
            answerState,
            retryAttemps
        } = this.state;

        let gameState;
        if (answerState === 'win') {
            gameState = <h2 className="text-center">Gewonnen <i className="far fa-smile-beam"></i></h2>
        } else if (answerState === 'lose') {
            gameState = <h2 className="text-center">Verloren <i className="far fa-sad-tear"></i></h2>
        } else {
            gameState = <Numbers
                            selectedNumbers={selectedNumbers}
                            usedNumbers={usedNumbers}
                            answerState={answerState}
                            selectNumber={this.selectNumber} />
        }

        return (
            <>
                <div className="row">
                    <div className="col-4">
                        <h3 className="pull-left">Play Nine</h3>
                    </div>
                    <div className="col-8 text-right">
                        <button type="button" className="btn btn-sm btn-primary mb-2" data-toggle="modal" data-target="#rules">
                            Spelregels
                        </button>
                        <button className="btn btn-sm btn-secondary text-white ml-3 mb-2" onClick={this.resetGame}>Reset Game</button>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-5">
                        <Stars count={stars} />
                    </div>
                    <div className="col-3">
                        <Button
                            numbers={selectedNumbers}
                            checkAnswer={this.checkAnswer}
                            acceptAnswer={this.acceptAnswer}
                            answerState={answerState}
                            retryStars={this.retryStars}
                            retryAttemps={retryAttemps} />
                    </div>
                    <div className="col-4">
                        <Answer
                            selectedNumbers={selectedNumbers}
                            removeNumber={this.removeNumber} />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-12">
                        { gameState }
                    </div>
                </div>
            </>
        )
    }
}

export default Game;
