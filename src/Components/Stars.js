import React from 'react';
import _ from 'lodash';

const Stars = (props) => {
    const { count } = props;

    return (
        <div>
            {_.range(count).map((i) => <i key={i} className="fa fa-star"></i>)}
        </div>
    )
}

export default Stars;
