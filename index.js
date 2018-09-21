const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const todos = [{id: 'jkhsdjkf', content: 'review this code'}];

app.post('/todos', (req, res) => {
  const content = req.body.content ? req.body.content : '';

  if (content !== '') {
    todos.push({
      content: content,
      id: Math.random().toString(32).slice(2)
    });

    res.sendStatus(201);
  } else {
    res.send('No content property found or empty content');
  }
});

app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const todoIndex = getTodoIndexById(id, todos);
  const content = req.body.content ? req.body.content : '';

  if (todoIndex != null) {
    if (content !== '') {
      todos[todoIndex].content = content;
      res.sendStatus(200);
    } else {
        res.send('No content property found or empty content');
    }
  } else {
      res.sendStatus(404);
  }
});

app.get('/todos/all', (req, res) => {
  res.send(todos);
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  const result = getTodoById(id, todos);

  if (result != null) {
      res.send(result);
  } else {
      res.sendStatus(404);
  }
});

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(8080, () => {
  console.log('Listening on port 8080...');
});

const getTodoIndexById = (id, todos) => {
  for (var i=0; i < todos.length; i++) {
      if (todos[i].id === id) {
          return i;
      }
  }

  return null;
}

const getTodoById = (id, todos) => {
    for (var i=0; i < todos.length; i++) {
        if (todos[i].id === id) {
            return todos[i];
        }
    }

    return null;
}
