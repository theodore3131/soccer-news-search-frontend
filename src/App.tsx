import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import { SearchResult } from './interfaces';
import Navigation from './Navigation';
import Result from './Result';
import './App.css';
import Main from './Main';

const App = () => {
  const [result, setResult] = useState<Array<SearchResult>>([]);

  return (
    <BrowserRouter>
      <Navigation />
      <Container fluid="lg">
        <Route exact path = '/' render = {
          () => <Main setResult = { setResult } />
        } />
        <Route path='/search' render = {
          () => <Result result = { result } />
        }/>
      </Container>
    </BrowserRouter>
  );
}

export default App;
