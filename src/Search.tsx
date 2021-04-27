import React, { KeyboardEvent, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { Form, Button, Row, Col } from 'react-bootstrap';

import { useHistory } from 'react-router-dom';
import { searchProps, SearchResult } from './interfaces';

const Search = (props: searchProps) => {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const postAutocomplete = (ontypingQuery: string) => {
    const requestOptions = {
      method: 'POST',
      mode: 'cors' as RequestMode,
      headers: { 
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin':'*'
      },
      body: ontypingQuery
    };
    fetch('http://localhost:5000/autocomplete', requestOptions)
      .then(response => response.json())
      .then(data => {
          const result = data["res"];
          setSuggestions(result);
      });
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

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const ENTER = 13;
    if (event.keyCode === ENTER) {
      event.preventDefault();
      postSearch();
    }
  }

  return (
    <Form>
      <Form.Group controlId="searchComponent">
        <Row>
          <Col md={10}>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={({ value }) => {
                  setQuery(value);
                  postAutocomplete(value);
                }}
                onSuggestionSelected={(_, {suggestionValue}) => {
                  setQuery(suggestionValue);
                }}
                getSuggestionValue={suggestion => suggestion}
                onSuggestionsClearRequested={() => setSuggestions([])}
                renderSuggestion={(option) => <span>{option}</span>}
                inputProps={{
                  className: "form-control",
                  placeholder: "Search Soccer News from Sky Sports",
                  value: query,
                  onChange: (_, { newValue, method }) => {
                    setQuery(newValue);
                  },
                  onKeyDown: (event) => handleKeyDown(event)
                }}
                highlightFirstSuggestion={true}
              />
          </Col>
          <Col>
            <Button variant="info" onClick={ postSearch } >
              Search 🔍
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  )
}

export default Search;