const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const posts = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.post('/create', (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    posts.unshift({
      title,
      content,
      date: new Date().toLocaleString()
    });
  }
  res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Blog server is running on http://localhost:${PORT}`);
});
