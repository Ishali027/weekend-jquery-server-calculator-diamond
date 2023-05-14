// const { response } = require("express");

$(document).ready(onReady);





function onReady(){
    console.log("jquery is loaded");
    $('#input-form').on('submit', postCalculations);// for the equal button
    $('.operator-btn').on('click', postOperators)/// for the operators
    $('#clear-btn').on('click',clearTextBox)
    getCalcs();
    // renderToDom(response);


}
let operator; // defined global variable to be used in postCalculation function

function clearTextBox(){
    $('.text-box').val('');
}



function postOperators(event){
    
    event.preventDefault();
    operator = $(this).data().value;
    console.log('show our posted operator', operator);
    
}



function postCalculations(event){
    event.preventDefault();
    const inputOne = $('#integer-one').val();
    const inputTwo = $('#integer-two').val();
    // created my inputs to be able to show up on my server and then save the dta that is collected

    $.ajax({
        method: 'POST', 
        url: '/inputs', 
        data: {
            inputOne: inputOne,
            inputTwo: inputTwo,
            operator
    }
    }).then(function(response){
        console.log('success');
        getCalcs()
        
    }).catch(function(error){
        alert('error!', error);
    }) 
}

function getCalcs(){

    $.ajax({
        method: 'GET',
        url: '/inputs'
    }).then(function(response){
        console.log('Success', response);
        renderToDom(response);
        console.log('my get is working', response);
    })
}


function renderToDom(equations){
   $('#calculation-history').empty();
   $('#answer').empty();
   //for loop to loop through my mathHistory array
   for( equation of equations){
    $('#answer').text(`${equation.total}`)
    $('#calculation-history').append(`<li>${equation.inputOne} ${equation.operator} ${equation.inputTwo} = ${equation.total}</li>`)
   }
}
