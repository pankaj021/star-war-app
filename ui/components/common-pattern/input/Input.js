import React, { Component } from 'react';
import {validateProps} from './helper';
import './Input.css'

export default class Input extends Component {
    constructor(props){
        super();
        this.state = { value: props.defaultValue || '', showRequiredMessage: false };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
    }

    onChangeHandler(event, onChangeCallBack){
        const inputValue = event.target.value;
        this.props.getInputValue(inputValue);
        this.setState({value: inputValue}, onChangeCallBack);
    }

    onBlurHandler(event) {
        if(!event.target.value) {
            // event.target.focus();
            return this.setState({showRequiredMessage: true});
        }
        this.setState({showRequiredMessage: false});
    }

    render() {
        const { className, label, type, placeholder, isRequired, requiredText, isError, errorText, onChangeCallBack } = this.props;
        const {value, showRequiredMessage} = this.state;
        const propsError = validateProps(this.props);
        if(propsError.status) return null;
        return (
            <div className={'input ' + (className || '')} >
                {label && <h4 className='input-label'>{label + (isRequired || requiredText ? '*' : '')}</h4>}
                <input 
                    type={type}
                    placeholder={placeholder}
                    isrequired={isRequired.toString()}
                    value={value}
                    onChange={(event) => this.onChangeHandler(event, onChangeCallBack)}
                    onBlur={(event) => this.onBlurHandler(event)}
                />
                {!isError && showRequiredMessage && <div className='input-error error-col'>{requiredText}</div>}
                { isError && <div className='input-error error-col'>{errorText}</div>}
            </div>
        )
    }
}