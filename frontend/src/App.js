import { BrowserRouter, Link, Route } from "react-router-dom";
import Upload from "./Screens/Upload";
import Home from './Screens/Home';
import videoPlayer from './Screens/VideoPlayer';

function App() {
  return (
    <BrowserRouter>
   <div className="app">
     <header className="head">
      <Link to='/'> <div> VIDEO PLAYER</div></Link>
       <div>
         <Link to='/upload'> UPLOAD VIDEO </Link>
       </div>
     </header>
     <main className="main">
       <Route path="/" component={Home} exact={true}/>
       <Route path="/upload" component={Upload}/>
       <Route path='/video_player/:id' component={videoPlayer}/>
     </main>
     <footer className="foot">
       All copyrights reserved.
     </footer>
   </div></BrowserRouter>
  );
}

export default App;
