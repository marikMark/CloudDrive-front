import React, { useState } from 'react';
import File from './file/File';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentDir, setDraggingFile, removeCurrentDirName, removeFromStack } from '../../../reducers/fileReducer';
import './fileList.css';
import { updateFilePath, uploadFile } from '../../../actions/file';
import LoadingFile from './loadingFile/LoadingFile';
import { addNotification } from '../../../reducers/notificationReducer';

const FileList = () => {
    const files = useSelector(state => state.files.files);
    const loadingFiles = useSelector(state => state.upload.files);
    const currentDir = useSelector(state => state.files.currentDir);
    const dirStack = useSelector(state => state.files.dirStack);
    const dirPathStack = useSelector(state => state.files.currentDirName);
    const draggingFile = useSelector(state => state.files.draggingFile);
    const dispatch = useDispatch();
    function backClickHandler() {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
        dispatch(removeCurrentDirName(backDirId));
        window.history.pushState({}, null, backDirId === 'null' ? '/' : backDirId);
    }
    const [dragFile, setDragFile] = useState();
    const getFile = file => {
        setDragFile(file);
    }
    const backDropHandler = async e => {
        e.preventDefault();
        const backDirId = {
            _id: dirStack.pop()
        };
        await dispatch(updateFilePath(dragFile, backDirId));
        dispatch(setDraggingFile(null));
        dispatch(setCurrentDir(backDirId._id));
    }
    const changePrevDir = (e, dir) => {
        if(dir[1] === currentDir) {
            dispatch(addNotification('You are already in this folder!'));
        } else {
            dispatch(removeCurrentDirName(dir[1]));
            dispatch(removeFromStack(dir[1]));
            dispatch(setCurrentDir(dir[1]));
            window.history.pushState({}, null, dir[1] === 'null' ? '/' : dir[1]);
        }
    }
    const [dragEnter, setDragEnter] = useState(false);
    const dragEnterHandler = e => {
        e.preventDefault();
        e.stopPropagation();
        draggingFile === null && setDragEnter(true);
    }
    const dragLeaveHandler = e => {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(false);
    }
    const dropHandler = e => {
        e.preventDefault();
        e.stopPropagation();
        const files = [...e.dataTransfer.files];
        files.forEach(async file => {
            let result = await dispatch(uploadFile(currentDir, file));
            if(result === 'fileExist') {
                dispatch(addNotification('File already exist!'));
            }
        });
        setDragEnter(false);
    }
    return (
        <div className='FileList-container'
            onDragEnter={e => dragEnterHandler(e)}
            // onDrop={e => dropHandler(e)}
            onDragOver={e => dragEnterHandler(e)}
        >
            {
                dragEnter &&
                <div className='FileList-drag_and_drop_area'
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDrop={e => dropHandler(e)}
                    onDragOver={e => dragEnterHandler(e)}
                >+</div>
            }
            <div className='FileList-path_container'>
                <div className='FileList-pathDir'>
                    {
                        dirPathStack.map(dir =>
                            <>
                                <span className='FileList-pathOneDir'
                                    onClick={e => changePrevDir(e, dir)}
                                >
                                    {
                                        dir[0]
                                    }
                                </span>
                                {
                                    dirPathStack[dirPathStack.length - 1] === dir ?
                                    ''
                                    :
                                    <span className='FileList-path_sign'>›</span>
                                }
                            </>
                        )
                    }
                </div>
            </div>
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