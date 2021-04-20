import React from 'react';

import './LCDDialogContent.css';

const DialogContent = (props) => {
    return (
        <div className="dialogContent">
            <h4>{props.data.title}</h4>
        </div>
    );
};

export default DialogContent;