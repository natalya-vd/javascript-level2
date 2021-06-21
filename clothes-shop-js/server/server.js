const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(express.static('.'));
app.use(cors());

app.listen(3000, () => {
    console.log('Server is running at port 3000!')
});

app.get('/cartData', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

app.get('/catalogData', (req, res) => {
    fs.readFile('catalogData.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

app.post('/addToCart', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err, data) => {
        if(err) {
            res.send('{"result": 0}')
        } else {
            const cart = JSON.parse(data);
            const item = req.body;

            cart.push(item);

            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if(err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}')
                };
            });
        };
    });
});

app.post('/removeToCart', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err, data) => {
        if(err) {
            res.send('{"result": 0}')
        } else {
            const cart = JSON.parse(data);
            const item = req.body;

            for(let i = cart.length - 1; i >= 0; i--) {
                if(cart[i].id_product === item.id_product) {
                    cart.splice(i, 1)
                    break;
                }
            }

            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if(err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}')
                };
            });
        };
    });
})
