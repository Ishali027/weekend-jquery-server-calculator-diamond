const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
app.use(express.static('server/public'));
app.use(bodyParser .urlencoded({extended: true}));

//global empty array
let mathHistory = [];




//  created my app.post which recieves data sent from the client side via ajax.post and receives via
// app.post and stores it in an array I created called mathHistory.
app.post('/inputs', function(req,res){
    // rename my req.body so I can manipulate to do what I need
    let inputData = req.body
    console.log('Post my data', inputData);
    
    let total = mathSolution((inputData.inputOne/1),(inputData.inputTwo/1), inputData.operator)
    console.log(total);


    mathHistory.push({inputOne:inputData.inputOne,inputTwo:inputData.inputTwo, operator:inputData.operator, total})
    res.sendStatus(201);




})

// app.get lets me use and send data stored and send it to the client/side. 
app.get(mathHistory, function(req,res){
    res.send(mathHistory);
    console.log('my server is sending what is in my array', mathHistory);
}) 





app.listen(port, () => {
    console.log('listening to port', port);
})

// created a function that finds the solution according to which data valies match. 
//created firstValue and second value and gave back the total depending on which operator is used. 
function mathSolution(inputOne, inputTwo, symbol){
    total = 0
    if('-' === symbol){
        total = inputOne - inputTwo
    }
    else if('+' === symbol){
        total = inputOne + inputTwo
    }
    else if('*' === symbol){
        total = inputOne * inputTwo
    }
    else if( '/' === symbol){
        total = inputOne / inputTwo

    } return total
}

