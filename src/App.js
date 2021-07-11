// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import { login } from './actions/user';
import { auth } from './actions/user';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Button } from 'react-bootstrap';
// import { setLoading } from './reducers/loadingReducer';
import Disk from './components/disk/Disk';

function App() {
  const isAuth = useSelector(state => state.user.isAuth);
  const loading = useSelector(state => state.loading.loading);
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(auth());
  });
  return (
    <div className="App">
      {!isAuth &&
      <>
        {loading ? 
          <Spinner className='App-spinner'
          animation="border" 
          variant="dark" />
          :
          <Button
          className='App-login-button'
          variant="outline-info"
          onClick={() => {
            dispatch(login())
          }}
          >Login</Button>
        }
      </>
      }
      {isAuth &&
        <>
          <Navbar />
          <Disk />
        </>
      }
    </div>
  );
}

export default App;
