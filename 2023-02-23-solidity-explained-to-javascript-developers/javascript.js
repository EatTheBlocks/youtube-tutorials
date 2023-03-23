//layout
const a = 10;
function foo() {}



















//variable lifetime & memory
const tmpVar = 10;
function foo() {
    const anotherTmpVar = 20;
}

















//functions
let data = 10;
function updateData(newData) {
    data = newData;
}
function readData() {
    return data;
}
function helloWorld() {
    return 'helloworld';
}











//variables
const isRegistered = false;
const age = 20;
const username = 'myUsername';
const id = 12304;
const foo = 'immutable data'
let bar = 'can be changed';


















//array
const array = [];
const firstEl = array[0];
const len = array.length;
array.push(50);
array.pop();
















//object
const user = {
    name: 'Luke',
    balance: 1000,
};

















//key-value store
const users = {};
users[0] = {name: 'Luke', balance: 1000};
users[1] = {name: 'Brittney', balance: 2000};


















//control structures
const foo = true;
if(foo) {
    //do something
}
let i = 0;
for(i = 0; i < 10; i++) {
    //do something
}
while(foo) {
    //do something
}










//storing data long-term
//INSERT INTO table_name (column1, column2)
//VALUES (value1, value2);



















//api calls
const result = await fetch('https://api.someservice.com/users/1');
const payload = await result.json();
//do something with payload



















//send money
//1. Get API key from Paypal / Stripe
//2. Hit their API to execute transfer
const result = await fetch(
    'https://api.paypal.com/pay',
    {
        method: 'POST',   
        body: {
            apikey: 'Ajk782KRlll.....',
            amount: 1000,
            from: 'Alklkrwoi7882...',
            to: 'ioi89Kl...'
        }
    }
);







//error - throw
function add(a, b) {
    if (a <= 0 || b <= 0) {
        throw new Error('arguments should be > 0')
    }
}
















//errors - try/catch
try {
    const call = await api.call();
} catch(e) {
    //do something with error
}










