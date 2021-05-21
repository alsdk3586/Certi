import { Form, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';

export default function SearchBox(props){
  
  return (
    <Form inline>
      <FormControl type="text" 
        placeholder="Search" 
        className="search d-flex"
        type="search"
        placeholder="예) 정보처리기능사 "
        onChange={props.handleChange} 
      />
    </Form>
  )
}
