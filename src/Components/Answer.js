import React from 'react';

const Answer = (props) => {
    return (
        <div>
            {props.selectedNumbers.map((num, i) => 
                <div key={i} 
                    className="number"
                    onClick={() => props.removeNumber(num)}>
                    {num}
                </div>
            )}
        </div>
    )
}

export default Answer;
