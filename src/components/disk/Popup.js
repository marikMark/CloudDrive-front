import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDir } from '../../actions/file';
import './popup.css';
import { addNotification } from '../../reducers/notificationReducer';

const Popup = props => {
    const [dirName, setDirName] = useState('');
    const dispatch = useDispatch();
    let currentDir = useSelector(state => state.files.currentDir);
    async function createDirHandler(e) {
        e.preventDefault();
        const result = await dispatch(createDir(currentDir, dirName));
        document.getElementById('btn-secondaryCreateDir').click();
        if(result === 'dirExist') {
            dispatch(addNotification('Directory already exist!'));
        }
    }
    return (
        <>
            <div className="modal fade" id="createDirModal" tabIndex="-1" role="dialog" aria-labelledby="createDirModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="createDirModalLabel">Create Directory</h5>
                                <button type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div className="modal-body">
                            <form>
                            <input type='text'
                                className='Popup-input'
                                id='Popup-createDirInput'
                                value={dirName}
                                onChange={e => setDirName(e.target.value)}
                                onKeyDown={e => e.keyCode === 13 ? createDirHandler(e) : ''}
                            />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                id='btn-secondaryCreateDir'
                                className="btn btn-secondary"
                                data-dismiss="modal">Close</button>
                            <button
                            type="button"
                            className="btn btn-primary"
                            onClick={e => createDirHandler(e)}
                            >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popup;