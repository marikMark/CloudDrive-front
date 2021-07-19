import axios from "axios";
import {
    addFile,
    setFiles,
    removeFromFiles,
    renameFileReducer
} from "../reducers/fileReducer";
import { addUploadFile, changeUploadFile, removeUploadFile } from "../reducers/uploadReducer";

export function getFiles(dirId) {
    return async dispatch => {
        const res = await axios.get(`https://clouddrive-back.herokuapp.com/api/drive/file/${dirId ? dirId : ''}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch(setFiles(res.data));
    }
}

export function createDir(dirId, dirName) {
    return async dispatch => {
        const res = await axios.post(`https://clouddrive-back.herokuapp.com/api/drive/folder`, {
            name: dirName,
            parentId: dirId,
            type: 'dir'
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(res.data.message) {
            return res.data.message;
        }
        dispatch(addFile(res.data));
        return res.data;
    }
}

export function uploadFile(dirId, file) {
    return async dispatch => {
        const data = new FormData();
        data.append('file', file);
        data.append('parentId', dirId);
        const uploadFile = {
            id: Date.now(),
            name: file.name,
            progress: 0
        };
        dispatch(addUploadFile(uploadFile));
        const res = await axios.post('https://clouddrive-back.herokuapp.com/api/drive/file', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            onUploadProgress: progressEvent => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                if(totalLength) {
                    uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength);
                    dispatch(changeUploadFile(uploadFile));
                }
            }
        });
        if(res.data.message) {
            return res.data.message;
        }
        dispatch(removeUploadFile(uploadFile.id));
        dispatch(addFile(res.data));
    }
}

export function updateFilePath(childFile, parentFile) {
    return async dispatch => {
        const data = {
            childFile,
            parentFile
        };
        await axios.put('https://clouddrive-back.herokuapp.com/api/drive/file/move', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch(removeFromFiles(childFile));
        dispatch(getFiles(childFile.parentId));
    }
}

export function removeFile(file) {
    return async dispatch => {
        console.log(file);
        await axios.delete('https://clouddrive-back.herokuapp.com/api/drive/file', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: file
        });
        dispatch(removeFromFiles(file));
    }
}

export function renameFile({...data}) {
    return async dispatch => {
        await axios.put('https://clouddrive-back.herokuapp.com/api/drive/file/name', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch(renameFileReducer(data));
    }
}

export function downloadFile(file) {
    return async dispatch => {
        console.log(file);
        const res = await fetch(`https://clouddrive-back.herokuapp.com/api/drive/file/download?_id=${file._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(res.status === 200) {
            const blob = await res.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    }
}

export function uploadFolder(files, parentId) {
    return async dispatch => {
        console.log(files);
        const data = new FormData();
        for(let i = 0; i < files.length; i++) {
            data.append(`files[${i}]`, files[i]);
            data.append(`files[${i}]`, files[i].webkitRelativePath.split('/').slice(0, -1).join('/'));
        };
        data.append('parentId', parentId);
        const uploadFile = {
            id: Date.now(),
            name: '—',
            progress: 0
        };
        dispatch(addUploadFile(uploadFile));
        const res = await axios.post('https://clouddrive-back.herokuapp.com/api/drive/files', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            onUploadProgress: progressEvent => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                if(totalLength) {
                    uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength);
                    dispatch(changeUploadFile(uploadFile));
                }
            }
        });
        if(res.data.message) {
            return res.data.message;
        }
        dispatch(removeUploadFile(uploadFile.id));
        dispatch(addFile(res.data));
    }
}

export function getStatic(file) {
    return async dispatch => {
        const ext = file.name.split('.').pop();
        if(ext === 'mov' || ext === 'mp4') {
            const newWin = window.open();
            const player = document.createElement('video');
            player.style = {
                marginLeft: 'auto',
                marginRight: 'auto'
            }
            player.controls = 'true';
            player.src = `https://clouddrive-back.herokuapp.com/?userId=${file.userId}&_id=${file._id}&ext=${ext}`;
            player.preload = 'auto';
            player.autofocus = 'true';
            player.style.position = 'absolute';
            player.style.margin = 'auto';
            player.style.top = '0';
            player.style.right = '0';
            player.style.bottom = '0';
            player.style.left = '0';
            player.style.width = '800px';
            newWin.document.body.style.background = 'black';
            newWin.document.body.append(player);
        } else if(ext === 'mp3' || ext === 'wav') {
            const newWin = window.open();
            const player = document.createElement('audio');
            player.style.position = 'absolute';
            player.style.margin = 'auto';
            player.style.top = '0';
            player.style.right = '0';
            player.style.bottom = '0';
            player.style.left = '0';
            player.style.width = '300px';
            player.style.height = '50px';
            player.controls = 'true';
            player.id = 'audio-player';
            player.autofocus = 'true';
            newWin.document.body.style.background = 'black';
            newWin.document.body.append(player);
            const source = document.createElement('source');
            source.id = 'aim';
            source.type = `audio/${ext}`;
            source.src = `https://clouddrive-back.herokuapp.com/?userId=${file.userId}&_id=${file._id}&ext=${ext}`;
            newWin.document.getElementById('audio-player').appendChild(source);
        } else {
            window.open(`https://clouddrive-back.herokuapp.com/?userId=${file.userId}&_id=${file._id}&ext=${ext}`, '_blank');
        }
    }
}