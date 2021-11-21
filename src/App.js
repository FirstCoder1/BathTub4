import "./App.css";
import BathTub from "./Components/BathTub";

function App() {

  return (
    <div className="app">
      <header className="app-header">
        <h2> BathTub </h2>
      </header>
      <div className="app-intro">
        <BathTub width={350} />
      </div>
    </div>
  );
}

export default App;
