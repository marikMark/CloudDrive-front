import React from 'react';
import './file.css';
import folder from '../../../../assets/folder.png';
import doc from '../../../../assets/doc.png';
import pdf from '../../../../assets/pdf.png';
import picture from '../../../../assets/picture.png';
import zipFile from '../../../../assets/zip-file.png';
import txtFile from '../../../../assets/file.png';
import mp3 from '../../../../assets/mp3.png';
import json from '../../../../assets/json.png';
import mp4 from '../../../../assets/mp4.png';
import mov from '../../../../assets/mov.png';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
    setCurrentDir,
    pushToStack,
    setDraggingFile
} from '../../../../reducers/fileReducer';
import { updateFilePath, getStatic } from '../../../../actions/file';
import Dropdown from './Dropdown';
import Popup from './Popup';
import { sizeFormat } from '../../../../utils/sizeFormat';

const File = props => {
    const file = props.file;
    const type =
                file.type === 'dir' ? folder :
                file.type === 'doc' ? doc :
                file.type === 'pdf' ? pdf :
                file.type === 'png' ? picture :
                file.type === 'jpg' ? picture :
                file.type === 'jpeg' ? picture :
                file.type === 'zip' ? zipFile :
                file.type === 'mp3' ? mp3 :
                file.type === 'json' ? json :
                file.type === 'mp4' ? mp4 :
                file.type === 'mov' ? mov :
                txtFile;
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const draggingFile = useSelector(state => state.files.draggingFile);
    function doubleClickHandler(file) {
        if(file.type === 'dir') {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
            window.history.pushState({}, null, file._id);
        } else {
            dispatch(getStatic(file));
        }
    }
    const focusHandler = (e, file) => {
        e.target.className = 'File-container-hover';
        e.target.addEventListener('keydown', e => {
            if(e.keyCode === 13) {
                doubleClickHandler(file);
            }
        })
    }
    const blurHandler = e => {
        e.target.className = 'File-container';
        setOpacity(0);
        setDropDown(false);
    }
    const [dropDown, setDropDown] = useState(false);
    const [X, setX] = useState(), [Y, setY] = useState();
    const [opacity, setOpacity] = useState(0);
    const contextMenuHandler = e => {
        e.preventDefault();
        setDropDown(true);
        setX(e.clientX);
        setY(e.offsetY);
        var op = 0;
        setTimeout(function func() {
            if (op > 1)
                return;
            setOpacity(op);
            op += 0.5;
            setTimeout(func, 60);
        }, 60);
    }
    const dragStartHandler = (e, file) => {
        dispatch(setDraggingFile(file));
        props.getFile(file);
    }
    const dragLeaveHandler = e => {
        e.target.className = 'File-container';
    }
    const dragEndHandler = e => {
        e.target.className = 'File-container';
    }
    const dragOverHandler = (e, file) => {
        e.preventDefault();
        if(file.type === 'dir') {
            e.target.className = 'File-container-hover';
        }
    }
    const dropHandler = (e, file) => {
        e.preventDefault();
        if(file.type === 'dir' && file._id !== draggingFile._id) {
            dispatch(updateFilePath(draggingFile, file));
            dispatch(setDraggingFile(null));
            e.target.className = 'File-container';
        }
    }
    return (
        <>
                <div
                    tabIndex={1}
                    className='File-container'
                    onFocus={(e) => focusHandler(e, file)}
                    onBlur={(e) => blurHandler(e)}
                    onContextMenu={e => contextMenuHandler(e)}
                    onDoubleClick={() => doubleClickHandler(file)}
                    onDragStart={e => dragStartHandler(e, file)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragEnd={e => dragEndHandler(e)}
                    onDragOver={e => dragOverHandler(e, file)}
                    onDrop={e => dropHandler(e, file)}
                    draggable={true}
                >
                    <img className='File-img' style={{pointerEvents: 'none'}} src={type} alt='' />
                    <span className='File-name' style={{pointerEvents: 'none'}}>{file.name}</span>
                    <span className='File-date' style={{pointerEvents: 'none'}}>{file.updatedAt.split('T')[0]}</span>
                    <span className='File-size' style={{pointerEvents: 'none'}}>{
                        file.size === 0 ? '—' : sizeFormat(file.size)
                    }</span>
                    {dropDown &&
                        <Dropdown X={X} Y={Y} opacity={opacity} file={file} key={file.id} />
                    }
                </div>
                <Popup file={file} id={file.id} key={file.id} />
        </>
    )
}

export default File;