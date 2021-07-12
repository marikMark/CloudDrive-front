import React from 'react';
import 'bootstrap';
import './dropdown.css';
import { removeFile, downloadFile } from '../../../../actions/file';
import { useDispatch } from 'react-redux';

const Dropdown = (props) => {
    const dispatch = useDispatch();
    const removeClickHandler = file => {
        dispatch(removeFile(file));
    }
    const downloadHandler = (e, file) => {
        e.stopPropagation();
        dispatch(downloadFile(file));
    }
    return (
        <div>
            <div className="Dropdown-container" style={{top: props.Y, left: props.X, opacity: props.opacity}}>
                        <span className="dropdown-item"
                            data-target={'#renameFileModal' + props.file.id}
                            data-toggle='modal'
                        >Rename
                        </span>
                        {
                            props.file.type !== 'dir' &&
                                <span className="dropdown-item"
                                    onClick={e => downloadHandler(e, props.file)}
                                >Download
                                </span>
                        }
                        <div className="dropdown-divider" style={{marginTop: '-1px', marginBottom: '-1px'}}></div>
                        <span className="dropdown-item"
                            style={{color: '#ff1f48'}}
                            onClick={() => removeClickHandler(props.file)}
                            >Remove
                        </span>
            </div>
        </div>
    )
}

export default Dropdown;
