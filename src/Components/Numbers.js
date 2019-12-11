import React from 'react';
import _ from 'lodash';

const Numbers = (props) => {
    const {usedNumbers, selectedNumbers} = props;

    let numClasses = num => {
        if (usedNumbers.indexOf(num) >= 0) {
            return 'number used';
        } else if (selectedNumbers.indexOf(num) >= 0) {
            return 'number selected';
        } else {
            return 'number';
        }
    };

    return (
        <div className="card text-center">
            <div>
                {Numbers.NumList.map(num => 
                    <div key={num} 
                        className={numClasses(num)}
                        onClick={() => props.selectNumber(num)}>
                        {num}
                    </div>
                )}
            </div>
        </div>
    )
}

Numbers.NumList = _.range(1,10);

export default Numbers;
