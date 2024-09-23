import Canvas from './components/Canvas';
import Goku from './components/Goku';
import Clouds from './components/Clouds';

const App = () => {
  return (
    <div className="app">
      <Clouds />
      <div className="content">
        <Canvas />
        <Goku gifUrl={"https://media.tenor.com/cJtDhl2-MP0AAAAi/goku-dragon-ball.gif"} />
      </div>
    </div>
  );
}

 export default App ;