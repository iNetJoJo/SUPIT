$(document).ready(function() {
    var text = 'Budi izvrstan u onome sto volis!';
    var i = 0;

    var typeTimings = [];

    function generateTypingTimings(){
        for (let j = 0; j < text.length; j++) {
            let randomNumber = Math.floor(Math.random() * 500);
            typeTimings.push(randomNumber);
        }
    }

    function Typer() {
        let currentText = $("#inputText").text();
        console.log(currentText);

        $("#inputText").append(text[i]);

        i++;
        if( i < text.length ){
            setTimeout( Typer,typeTimings[i]);
        }
    }


    generateTypingTimings();
    Typer();
});
