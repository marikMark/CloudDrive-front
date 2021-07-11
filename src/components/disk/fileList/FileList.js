import React, { useState, useEffect } from 'react';
import File from './file/File';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentDir, setDraggingFile } from '../../../reducers/fileReducer';
import './fileList.css';
import { updateFilePath, getFiles } from '../../../actions/file';
import LoadingFile from './loadingFile/LoadingFile';

const FileList = () => {
    const files = useSelector(state => state.files.files);
    const loadingFiles = useSelector(state => state.upload.files);
    const currentDir = useSelector(state => state.files.currentDir);
    const dirStack = useSelector(state => state.files.dirStack);
    const dispatch = useDispatch();
    function backClickHandler() {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
        window.history.pushState({}, null, backDirId === 'null' ? '/' : backDirId);
    }
    const [dragFile, setDragFile] = useState();
    const getFile = file => {
        setDragFile(file);
    }
    const backDropHandler = async e => {
        e.preventDefault()
        const backDirId = {
            _id: dirStack.pop()
        };
        await dispatch(updateFilePath(dragFile, backDirId));
        dispatch(setDraggingFile(null));
        dispatch(setCurrentDir(backDirId._id));
        // dispatch(getFiles(currentDir));
    }
    return (
        <div className='FileList-container'>
            <div className='FileList-header'>
                {currentDir !== 'null' ?

                            <button
                            className='FileList-back'
                            title='Back'
                            onClick={() => backClickHandler()}
                            onDragOver={e => e.preventDefault()}
                            onDrop={e => backDropHandler(e)}
                            >‹</button>

                : ''}
                <span className='FileList-name'>Name</span>
                <span className='FileList-date'>Last modified</span>
                <span className='FileList-size'>File size</span>
            </div>
            {
                files.map(file => <File getFile={getFile} file={file} key={file.id} />)
            }
            {
                loadingFiles.map(file => <LoadingFile file={file} />)
            }
        </div>
    );
};

export default FileList;