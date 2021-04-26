import React, { KeyboardEvent, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { searchProps, SearchResult } from './interfaces';


const Search = (props: searchProps) => {
  const history = useHistory();
  const [query, setQuery] = useState("");
  
  const handelInputChanges = (e : React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target!.value);
  }

  const postSearch = () => {
    const requestOptions = {
      method: 'POST',
      mode: 'cors' as RequestMode,
      headers: { 
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin':'*'
      },
      body: query
    };
    fetch('http://localhost:5000/search', requestOptions)
      .then(response => response.json())
      .then(data => {
          const documents = data["res"];
          const results = documents as SearchResult[];
          props.setResult(results);
          history.push(`/search?q=${ query }`);
      });
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      postSearch();
    }
  }

  return (
    <Form>
      <Form.Group controlId="searchComponent">
        <Row>
          <Col md={10}>
            <Form.Control
              as="input"
              placeholder="Search Soccer News from 2014"
              onChange= {handelInputChanges}
              onKeyDown = { (event : KeyboardEvent) => handleKeyDown(event) }
            />
          </Col>
          <Col>
            <Button variant="info" onClick={ postSearch } >
              Search
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  )
}

export default Search;