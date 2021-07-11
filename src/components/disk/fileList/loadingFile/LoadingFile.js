import React from 'react';
import './loadingFile.css';
import folder from '../../../../assets/folder.png';
import doc from '../../../../assets/doc.png';
import pdf from '../../../../assets/pdf.png';
import picture from '../../../../assets/picture.png';
import zipFile from '../../../../assets/zip-file.png';
import txtFile from '../../../../assets/file.png';
import mp3 from '../../../../assets/mp3.png';
import { removeUploadFile } from '../../../../reducers/uploadReducer';
import { useDispatch } from 'react-redux';

const LoadingFile = ({file}) => {
    const dispatch = useDispatch();
    const type =
                file.type === 'dir' ? folder :
                file.type === 'doc' ? doc :
                file.type === 'pdf' ? pdf :
                file.type === 'png' ? picture :
                file.type === 'jpg' ? picture :
                file.type === 'jpeg' ? picture :
                file.type === 'zip' ? zipFile :
                file.type === 'mp3' ? mp3 :
                txtFile;
    return (
        <div
            tabIndex={1}
            className='LoadingFile-container'
            onClick={() => dispatch(removeUploadFile(file.id))}
        >
            {/* <img className='LoadingFile-img' style={{pointerEvents: 'none'}} src={type} alt='' /> */}
            {/* <span className='LoadingFile-name' style={{pointerEvents: 'none'}}>{file.name}</span> */}
            <span className='LoadingFile-date' style={{pointerEvents: 'none'}}></span>
            <span className='LoadingFile-size' style={{pointerEvents: 'none'}}>{
                // file.size === 0 ? '—' : sizeFormat(file.size)
            }</span>
            <div className='LoadingFile-progress_bar'>
                <div className='LoadingFile-progress' style={{width: file.progress}}></div>
            </div>
        </div>
    )
}

export default LoadingFile;