import React from 'react'
import './App.css'
import { Button, Card, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function Todo({ todo, index, editTodo, markTodo, removeTodo }) {
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? 'line-through' : '' }}> {todo.text} </span>
      <div>
        <Button variant="warning" onClick={() => editTodo(index)}>✐</Button>{' '}
        <Button variant="success" onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button variant="danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      return;
    }

    addTodo(value);
    setValue('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label><b>Add Todo</b></Form.Label>
        <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
      </Form.Group>
      <Button variant="primary mb-3 btn-block" type="submit">
        Submit
    </Button>
    </Form>
  )
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: 'This is a sample Todos',
      isDone: false
    }
  ])

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  }

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  }

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  const editTodo = index => {
    console.log(todos[index].text);
    const newTodos = [...todos];
    const newTodo = prompt('New Todo ?');
    newTodos[index].text = newTodo;
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="container justify-content-center col-lg-8">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {
            todos.map((todo, index) => (
              <Card className="mt-2" key={index}>
                <Card.Body>
                  <Todo key={index} index={index} todo={todo} editTodo={editTodo} markTodo={markTodo} removeTodo={removeTodo} />
                </Card.Body>
              </Card>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
