const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

let todos = [];
let id = 1;
let port = process.env.PORT || 3002;

app.use(cors());
app.use(morgan('combine'));
app.use(express.json());

app.get('/', (req,res) => {
  res.json(todos);
});

app.post('/', (req, res) => {
  console.log(req);
  let data = {
    id: id++,
    content: req.body.content    
  }
  todos.push(data);
  res.json(data);
});

app.delete('/:id', (req, res) => {
  let index = todos.findIndex(item => item.id === req.query.id);
  todos.splice(index, 1);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log('App is started at port ' + port);
});