import React from 'react';
import Classes from './BuildControl.module.css';

const buildControl = (props)=> {
    return (
        <div className={Classes.BuildControl}>
            <div className={Classes.Label}>{props.label}</div>
            <button className={Classes.Less} onClick={props.removed} disabled={props.disabled} >less</button>
            <button className={Classes.More} onClick={props.added}>more</button>
        </div>
    );
}

export default buildControl;