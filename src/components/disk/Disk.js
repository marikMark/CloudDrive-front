import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile, createDir, uploadFolder } from '../../actions/file';
import { setCurrentDir } from '../../reducers/fileReducer';
import FileList from './fileList/FileList';
import './disk.css';
import 'bootstrap';
import uploadFileLogo from '../../assets/upload-file.png';
import uploadFolderLogo from '../../assets/upload-folder.png';
import createFolderLogo from '../../assets/create-folder.png';
import Popup from './Popup';
import { useParams } from 'react-router';

const Disk = () => {
    const dispatch = useDispatch();
    let currentDir = window.location.pathname.replace('/', '') === '' ? 'null' : window.location.pathname.replace('/', '');
    currentDir = useSelector(state => state.files.currentDir);
    const files = useSelector(state => state.files.files);
    const userId = useSelector(state => state.user.currentUser.userId);
    useEffect(() => {
        // const currentDirId = localStorage.getItem('currentDirId') || currentDir;
        dispatch(getFiles(currentDir));
        document.addEventListener('scroll', scrollHandler);
    }, [currentDir]);
    function fileUploadHandler(e) {
        // currentDir = currentDir === null ? userId : currentDir;
        const files = [...e.target.files];
        files.forEach(async file => {
            let result = await dispatch(uploadFile(currentDir, file));
            if(result === 'fileExist') {
                console.log('xui');
                alert('File already exist!');
            }
        });
    }
    async function folderUploadHandler(e) {
        // currentDir = currentDir === null ? userId : currentDir;
        const files = e.target.files;
        console.log(files);
        const result = await dispatch(uploadFolder(files, currentDir));
        if(result === 'dirExist') {
            alert('Directory already exist!');
        }

        // files.forEach(file => {
        //     const path = file.webkitRelativePath.split('/');
        //     const fileName = path.pop();
        //     let res;
        //     path.forEach(async folder => {
        //         res = await dispatch(createDir(currentDir, folder));
        //     });
        //     console.log(res);
        // });
    }
    const scrollHandler = () => {
        const scroll = document.documentElement.scrollTop;
        const button = document.getElementById('Disk-create-btn').style;
        if(scroll >= 60) {
            button.transition = '.0s';
            button.marginTop = '-60px';
            button.position = 'fixed';
            setTimeout(() => {
                button.transition = '.3s';
            }, 5);
        }
        if(scroll <= 60) {
            button.transition = '.0s';
            button.marginTop = '0px';
            button.position = '';
            setTimeout(() => {
                button.transition = '.3s';
            }, 5);
        }
    }
    return (
        <div className='Disk-container'>
            <div className='Disk-btns'>
                <div className="btn-group">
                    <button
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    className='Disk-create-btn'
                    id='Disk-create-btn'
                    >New</button>
                    <div className="dropdown-menu">
                        <button data-toggle='modal'
                            className="dropdown-item"
                            data-target="#createDirModal"
                        >
                            <img src={createFolderLogo} alt='' />
                            Folder
                        </button>
                        <div className="dropdown-divider"></div>
                        <label className="dropdown-item" htmlFor='Disk-upload_file'>
                            <img src={uploadFileLogo} alt='' />
                            File upload
                        </label>
                        <input
                            type='file'
                            id='Disk-upload_file'
                            className='Disk-upload_file'
                            multiple={true}
                            onChange={(e) => fileUploadHandler(e)}
                            />
                        <label className="dropdown-item" htmlFor='Disk-upload_folder'>
                            <img src={uploadFolderLogo} alt='' />
                            Folder upload
                        </label>
                        <input
                            type='file'
                            id='Disk-upload_folder'
                            className='Disk-upload_folder'
                            webkitdirectory='true'
                            mozdirectory='true'
                            directory='true'
                            onChange={(e) => folderUploadHandler(e)}
                        />
                    </div>
                </div>
            </div>
            <FileList />
            <Popup />
        </div>
    );
}

export default Disk;