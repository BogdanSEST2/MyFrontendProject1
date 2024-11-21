const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');



const app = express();
const PORT = 5000;
const DATA_FILE = './data.json';
app.use(cors());
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    const { email, name, service, message } = req.body;
    const newData = { email, name, service, message };
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения файла:', err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        const jsonData = JSON.parse(data || '[]');
        const isDuplicate = jsonData.some(
            entry =>
                entry.email === email &&
                entry.name === name &&
                entry.service === service &&
                entry.message === message
        );
        if (isDuplicate) return res.status(400).json({ message: 'Такие данные уже существуют!' });
        jsonData.push(newData);
        fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2), err => {
            if (err) {
                console.error('Ошибка записи в файл:', err);
                return res.status(500).json({ message: 'Ошибка записи' });
            }

            return res.json({ message: 'Данные успешно сохранены' });
        });
    });
});

app.get('/data', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения файла:', err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        res.json(JSON.parse(data || '[]'));
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
