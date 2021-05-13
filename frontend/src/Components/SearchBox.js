import { Form, FormControl, Button } from 'react-bootstrap';

export default function SearchBox(props){
  return (
    <Form inline>
      <FormControl type="text" 
        placeholder="Search" 
        className="search"
        type="search"
        placeholder="예) 정보처리기능사 "
        onChange={props.handleChange} 
      />
    </Form>
  )
}
