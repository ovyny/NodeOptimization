# NodeOptimization

## Code
```
// const is better than let in this case because the identifier is not reassigned 
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());

let todos = [{id: 'jkhsdjkf', content: 'review this code'}];

app.post('/todos', (req, res) => {
  todos.push({
    ...req.body, // no control over req.body params or format
    id: Math.random().toString(32).slice(2)
  });
  res.sendStatus(201);
});

app.put('/todos/:id', (req, res) => {
  // no control over req.body content
  // not respecting todos format as an object
  todos[Number(req.params.id)] = req.body;
  res.sendStatus(200);
});

app.get('/todos/:id', (req, res) => {
  // wrong way to call id params
  // not respecting todos format as an object
  res.send(todos[id]);
});

// all is expected as an :id param (can not access to this route)
// this route must be placed at least before the /todos/:id route
app.get('/todos/all', (req, res) => {
  res.send(todos);
});

app.get('/', (req, res) => {
  // status code 200 can be used instead of OK
  res.send('OK');
});

app.listen(8080, () => {
  console.log('Listening on port 8080...');
});

```
