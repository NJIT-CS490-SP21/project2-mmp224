import React from 'react';
import './Board.css';

export function Board2({onClickButton, element}) {
    return (
        <div className="box" onClick={onClickButton}>{element}
        </div>
    )
}