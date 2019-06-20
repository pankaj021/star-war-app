import React from 'react';
import './Loader.css'

const Loader = (props) => {
    if(!props.isLoading) return null;
    return (
        <div className='loader'>
            <div className='loader-circle'></div>
        </div>
    )
}

export default Loader;