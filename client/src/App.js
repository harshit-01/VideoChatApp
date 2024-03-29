import VideoPlayer from "./component/VideoPlayer";
import Notification from "./component/Notification"
import Options from "./component/Options";
import ButtonAppBar from "./component/Navbar";
import Share from "./component/Share";
import './App.css';


function App() {
  return (
    <div className="App">
      <ButtonAppBar />
      <div className="container">
        <div className="row_one">
          <VideoPlayer>

          </VideoPlayer>
        </div>
        <div className="row_two">
          <Options>
            <Notification>
            </Notification>
          </Options>
          <Share />
        </div>
      </div>
    </div>
  );
}

export default App;
