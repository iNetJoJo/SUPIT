var text = 'Budi izvrstan u onome sto vidis!';
var i = 0;

var typeTimings = [];

function generateTypingTimings(){
    for (let j = 0; j < text.length; j++) {
        let randomNumber = Math.floor(Math.random() * 500);
        typeTimings.push(randomNumber);
    }
}

generateTypingTimings();

function Typer() {
    let currentText = $("#inputText").text();
    console.log(currentText);

        $("#inputText").append(text[i]);

        i++;
    if( i < text.length ){
        setTimeout( Typer,typeTimings[i]);
    }
}

Typer();

console.log(';tha0ugrhds9uasdg9saydg');