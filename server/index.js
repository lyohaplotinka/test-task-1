const express = require('express');
const app = express();
const values = require('./values');
const cors = require('cors');

app.use(cors());

/**
 * Поиск значений в "серверах"
 */
app.get('/search/:server', (req, res) => {
  const server = Number(req.params.server);
  if (!values[server]) {
    res.status(400);
    res.end({ error: 'Server not found' });
    return;
  }
  res.send(
    values[server].filter((value) =>
      value.toLowerCase().includes(req.query.search)
    )
  );
});

app.post('/form/save', (req, res) => {
  res.send({});
});

app.listen(3456, () => console.log('Server started'));
