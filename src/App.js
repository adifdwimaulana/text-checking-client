import logo from './logo.svg';
import { useState } from 'react'
import './App.css';
import axios from 'axios'
import { Row, Col, Form, FormGroup } from 'react-bootstrap'

function App() {
  const [word, setWord] = useState('')

  const handleSearch = (e) => {
    const value = e.target.value

    setWord(value)
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/word/search',
      data: {
        input: value
      }
    })
    .then((response) => {
      if(response.status === 200){
        if(response.data.status === 200){
          console.log(response.data.result)
        }
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <Form>
          <Form.Group controlId="word">
              <Form.Label>Search words</Form.Label>
              <Form.Control type="text" placeholder="Word" onChange={handleSearch} value={word} autoComplete="off" required />
          </Form.Group>
        </Form>
        
      </header>
    </div>
  );
}

export default App;
