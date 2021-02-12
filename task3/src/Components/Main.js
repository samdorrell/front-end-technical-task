import { useState, useEffect } from 'react';
import './Main.css';
import { Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'

const Item = (props) => {
    return (
        <Card className='item'>
            <Accordion.Toggle variant="link" eventKey={props.item.id}>
                <Card.Header className='title'>
                    {props.item.title}
                </Card.Header>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.item.id}>
                <Card.Body className='body'>
                    {props.item.body}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

const Main = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Accordion>
                {items.map(item => (
                    <Item key={item.id} item={item} />
                ))}
            </Accordion>
        );
    }
}

export default Main;