import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { renameFile } from '../../../../actions/file';
import './popup.css';

const Popup = props => {
    const [newName, setNewName] = useState(props.file.name);
    const dispatch = useDispatch();
    useEffect(() => {
        const modalShow = document.getElementById('renameFileModal' + props.id).style.display;
        if(modalShow === 'block') {
            const input = document.getElementById(`File-Popup-input${props.id}`);
            if(props.file.type === 'dir') {
                input.focus();
            } else {
                input.focus();
            }
        }
    });
    const data = {
        file: props.file,
        newName
    }
    function renameFileHandler() {
        data.newName = data.newName.replace(/ +/g, ' ').trim();
        if(data.newName !== '') {
            if(props.file.type !== 'dir') {
                data.newType = data.newName.split('.').pop();
            } else {
                data.newType = 'dir';
            }
            dispatch(renameFile(data));
        } else {
            alert('File can\'t be empty!');
        }
    }
    return (
        <>
            <div className="modal fade" id={'renameFileModal' + props.id} tabIndex="-1" role="dialog" aria-labelledby="renameFileModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="renameFileModalLabel">
                                {
                                    props.file.type === 'dir'
                                    ?
                                    'Rename Folder'
                                    :
                                    'Rename File'
                                }
                            </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div className="modal-body">
                            <input type='text'
                                className='File-Popup-input'
                                id={'File-Popup-input' + props.id}
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                onKeyDown={e => e.keyCode === 13 && renameFileHandler()}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => renameFileHandler()}
                            >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popup;