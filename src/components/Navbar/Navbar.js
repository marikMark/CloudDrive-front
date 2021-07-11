import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import { setLoading } from '../../reducers/loadingReducer'

export default function NavbarComponent() {
    const dispatch = useDispatch();
    return (
        <div className='Navbar-container'>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    CloudDrive
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Button
                    style={{position: 'absolute', right: '15px'}}
                    variant="outline-info"
                    onClick={() => {
                        dispatch(logout())
                        dispatch(setLoading(false))
                    }}
                    >Exit</Button>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}