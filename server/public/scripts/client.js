$(document).ready(onReady);





function onReady(){
    console.log("jquery is loaded");
    $('#input-form').on('submit', postCalculations);// for the equal button
    $('.operator-btn').on('click', postOperators)/// for the operators
    getCalcs();


}
let operator; // defined global variable to be used in postCalculation function




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
    })
}

function getCalcs(){

    $.ajax({
        method: 'GET',
        url: '/inputs'
    }).then(function(response){
        console.log('my get is working', response);
    })
}
