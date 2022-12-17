import {Routes, BrowserRouter, Route} from 'react-router-dom';
import Home from './pages/Home';
import Header from "./components/Header";
import Footer from './components/Footer';
import Docs from './pages/Docs';
import Capi from './pages/Capi';
import About from './pages/About';
import Plugins from './pages/Plugins';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} exact/>
        <Route path="/docs/*" element={<Docs/>}/>
        <Route path="/capi/*" element={<Capi/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/plugins" element={<Plugins/>}/>
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
