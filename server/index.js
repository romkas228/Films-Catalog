const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const USERS_FILE = path.join(__dirname, 'users.json');

function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function makeToken(user) {
  return Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
}

app.post('/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  const users = readUsers();
  if (users.find(u => u.email === email)) return res.status(409).json({ error: 'Email exists' });

  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id, email, password, name: name || '' };
  users.push(newUser);
  saveUsers(users);

  const token = makeToken(newUser);
  res.json({ user: { id: newUser.id, email: newUser.email, name: newUser.name }, token });
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const token = makeToken(user);
  res.json({ user: { id: user.id, email: user.email, name: user.name }, token });
});

app.get('/auth/me', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = Buffer.from(token, 'base64').toString('ascii');
    const [idStr] = decoded.split(':');
    const id = Number(idStr);
    const users = readUsers();
    const user = users.find(u => u.id === id);
    if (!user) return res.status(401).json({ error: 'Invalid token' });
    res.json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Mock auth server running at http://localhost:${PORT}`));