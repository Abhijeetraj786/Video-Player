import { BrowserRouter, Link, Route } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import Upload from "./Screens/Upload";
import Home from './Screens/Home';
import videoPlayer from './Screens/VideoPlayer';
import { signout } from "./actions/userActions";
import RegisterScreen from "./Screens/RegisterScreen";
import SigninScreen from "./Screens/SigninScreen";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
   <div className="app">
     <header className="head">
      <Link to='/'> <div> VIDEO PLAYER</div></Link>
       <div>
        <span>
         <Link to='/upload'> UPLOAD VIDEO </Link>
        </span>
         {userInfo ? (
              <div className="dropdown">
              <Link to="#">
                {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </li>
              </ul>
              </div>
            ) : (<>
              <Link to="/signin">SignIn</Link>
              </>
            )}
       </div>
     </header>
     <main className="main">
       <Route path="/" component={Home} exact={true}/>
       <PrivateRoute path="/upload" component={Upload}/>
       <Route path='/video_player/:id' component={videoPlayer}/>
       <Route path="/signin" component={SigninScreen}></Route>
       <Route path="/register" component={RegisterScreen}></Route>
     </main>
     <footer className="foot">
       All copyrights reserved.
     </footer>
   </div></BrowserRouter>
  );
}

export default App;
