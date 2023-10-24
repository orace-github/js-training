const express = require('express');
const app = express();

const test = require('./utils');
const instance = test('localhost');
instance(3000,(port)=>{console.log(port)});
const server = require('./utils').server;

const Greet = (params) => {
    console.log(`${params}`);
}
const rest = (...x) => {
    console.log(x);
}

const decorator = (x) => {
    function inner(y){
        return x + y;
    }
    return inner;
}

function* Iterator(x) {
    //yield 8;
    yield () => { console.log(1) };
    //yield () => {console.log(2)};
    yield () => {
        function inner(y){
            console.log(`Receive ${x} from wrapper and ${x}+${y}=${x+y}`);
        }
        return inner;
    };
    yield 0;
}

const it = Iterator(10);
let f = it.next();
console.log(typeof f.value === 'function' ? f.value() : f.value)
f = it.next();
console.log(typeof f.value === 'function' ? f.value() : f.value)
f.value()(10);


const srv = new server('icloud-ubuntu','4000');
srv.up();

const exec = require('./utils').exec;
console.log(exec(() => {console.log('Exit with 0');  return 10;})); // should return 10
app.get('/', (req,res) => {
    res.send('Hello world');
})
app.listen(3000, () => {
    console.log('Your server is running at http://localhost:3000/');
})


const net = require('./utils').netStack;

const NetApp = net({tcp:1,arp:1,ip:0});
/*NetApp.next().then((value)  => console.log(value)).
catch((err) => console.log(err.message));
*/