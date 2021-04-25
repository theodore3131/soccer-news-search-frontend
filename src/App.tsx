import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { SearchResult } from './interfaces';
import Navigation from './Navigation';
import Result from './Result';
import Search from './Search';
import './App.css';
import logo2 from './images/logo2.png'

const App = () => {
  const [result, setResult] = useState<Array<SearchResult>>();

  let content = 
    <div>
      <br /><br />
      <Row className='justify-content-md-center'>
        <img src={logo2} alt='logo' className='logo'/>
      </Row>
      <Row className='justify-content-md-center'>
        <Col>
        <Search setResult = {setResult} />
        </Col>
      </Row> 
    </div>
  
  if (result !== undefined) {
    content = 
      <div>
        <Result result = { result } />
      </div>
  }

  return (
    <div>
      <Navigation setResult = { setResult } />
      <Container fluid="lg">
        { content }
      </Container>
    </div>
  );
}

export default App;
