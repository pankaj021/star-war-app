import React, { Component } from 'react';
import {btnSize, btnType} from './const';
import './Button.css'

export default class Button extends Component {
    render() {
        const { className, label, type, size, onClick } = this.props;
        let otherClass = className + " " || "";
        if(type && btnType[type]) otherClass += btnType[type] + " ";
        if(size && btnSize[size]) otherClass += btnSize[size] + " ";
        return (
            <button
                className={'button ' + otherClass}
                onClick={onClick}
            >
                {label}
            </button>
        )
    }
}