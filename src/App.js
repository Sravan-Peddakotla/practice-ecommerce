import Products from "./components/Products";
import Header from './components/Header'
import Menu from './components/Menu'
function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Header />
       <Menu />
       <Products />
      </header>
    </div>
  );
}

export default App;
