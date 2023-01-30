import './App.css';
import Header from './Bases/Header';
import Navbar from './Bases/Navbar';
import Product from './Layouts/Product';
import { products, typicals } from './Mocks/Data';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Navbar typicals = {typicals} />
        <Product products = {products} />
      </div>
    </div>
  );
}

export default App;
