import { Button } from 'react-bootstrap';

export default function Btn(props) {
    return (<Button variant={props.color} className="ml-2 my-auto" onClick={() => {}}>{props.text}</Button>);
}
