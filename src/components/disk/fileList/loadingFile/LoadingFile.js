import React from 'react';
import './loadingFile.css';

const LoadingFile = ({file}) => {
    return (
        <div
            tabIndex={1}
            className='LoadingFile-container'
        >
            {/* <img className='LoadingFile-img' style={{pointerEvents: 'none'}} src={type} alt='' /> */}
            {/* <span className='LoadingFile-name' style={{pointerEvents: 'none'}}>{file.name}</span> */}
            {/* <span className='LoadingFile-date' style={{pointerEvents: 'none'}}></span> */}
            {/* <span className='LoadingFile-size' style={{pointerEvents: 'none'}}>{ */}
                {/* // file.size === 0 ? '—' : sizeFormat(file.size) */}
            {/* // }</span> */}
            <div className='LoadingFile-progress_bar'>
                <div className='LoadingFile-progress' style={{width: file.progress}}></div>
            </div>
        </div>
    )
}

export default LoadingFile;