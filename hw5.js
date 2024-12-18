//Made By: Shakib Tidjani - Contactable at: Shakib_Tidjani@student.uml.edu
//Sources: https://jqueryui.com/droppable/ - https://jqueryui.com/draggable/ - https://www.geeksforgeeks.org/jquery-ui-draggable-and-droppable-methods/ - class slides and exercises
var ScrabbleTiles = []; //Provided array of tiles
ScrabbleTiles["A"] = { "value": 1, "original-distribution": 9, "number-remaining": 9 };
ScrabbleTiles["B"] = { "value": 3, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["C"] = { "value": 3, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["D"] = { "value": 2, "original-distribution": 4, "number-remaining": 4 };
ScrabbleTiles["E"] = { "value": 1, "original-distribution": 12, "number-remaining": 12 };
ScrabbleTiles["F"] = { "value": 4, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["G"] = { "value": 2, "original-distribution": 3, "number-remaining": 3 };
ScrabbleTiles["H"] = { "value": 4, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["I"] = { "value": 1, "original-distribution": 9, "number-remaining": 9 };
ScrabbleTiles["J"] = { "value": 8, "original-distribution": 1, "number-remaining": 1 };
ScrabbleTiles["K"] = { "value": 5, "original-distribution": 1, "number-remaining": 1 };
ScrabbleTiles["L"] = { "value": 1, "original-distribution": 4, "number-remaining": 4 };
ScrabbleTiles["M"] = { "value": 3, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["N"] = { "value": 1, "original-distribution": 6, "number-remaining": 6 };
ScrabbleTiles["O"] = { "value": 1, "original-distribution": 8, "number-remaining": 8 };
ScrabbleTiles["P"] = { "value": 3, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["Q"] = { "value": 10, "original-distribution": 1, "number-remaining": 1 };
ScrabbleTiles["R"] = { "value": 1, "original-distribution": 6, "number-remaining": 6 };
ScrabbleTiles["S"] = { "value": 1, "original-distribution": 4, "number-remaining": 4 };
ScrabbleTiles["T"] = { "value": 1, "original-distribution": 6, "number-remaining": 6 };
ScrabbleTiles["U"] = { "value": 1, "original-distribution": 4, "number-remaining": 4 };
ScrabbleTiles["V"] = { "value": 4, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["W"] = { "value": 4, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["X"] = { "value": 8, "original-distribution": 1, "number-remaining": 1 };
ScrabbleTiles["Y"] = { "value": 4, "original-distribution": 2, "number-remaining": 2 };
ScrabbleTiles["Z"] = { "value": 10, "original-distribution": 1, "number-remaining": 1 };
ScrabbleTiles["_"] = { "value": 0, "original-distribution": 2, "number-remaining": 2 };
bag = []; //This represents the bag of tiles, will be filled when the site opens
function fillBag(ScrabbleTiles, bag) { //fillBag function
    for (letter in ScrabbleTiles) { //loops for all the letters in ScrabbleTiles
        quant = ScrabbleTiles[letter]["original-distribution"]; //We grab the quantity of the number of tiles per letter
        for (let i = 0; i < quant; i++) { //Once we have this quantity, we push 'quant' letters into the bag
            bag.push(letter);
        }
    }
    return bag; //return the bag
}//The reason that i'm filling the bag this way is to have an efficient way to grab a random letter with the appropriate distribution of letters
//If I create an array of 100 tiles, each with their proper distribution, i can just generate a random number from 0 to the current size of the bag and grab the letter at that index
bag = fillBag(ScrabbleTiles, bag); //fill the bag
$(document).ready(function () { //When the document is ready
    for (let i = 0; i < 7; i++) { //we add 7 random tiles to our tile div using append
        let randNum = Math.floor(Math.random() * bag.length); //this grabs a random index
        let randLetter = bag[randNum]; //we get the letter at that index
        //we append a div that changes depending on the letter that is at that index
        $("#tiles").append('<div id="draggable' + i + '" letter="' + randLetter + '" value="' + ScrabbleTiles[randLetter]["value"] + '" placement="false" class="draggable" style="background-image: url(' + "'graphics_data(1)/graphics_data/Scrabble_Tiles/Scrabble_Tile_" + randLetter + ".jpg'" + '); width: 161px; height: 174px; padding: 0; margin: 0;"></div>');
    }
});
$(function () {
    $("#button1").on("click", function (event) { //onclick function for the submit word button
        let quant = $('[placement="true"]').length; //we grab the number of tiles that have been placed on the board
        $('[placement="true"]').remove(); //then we delete them
        for (let i = 0; i < quant; i++) { //we then use the same logic as earlier to generate a number of new tiles equal to the number of tiles we just removed
            let randNum = Math.floor(Math.random() * bag.length);
            let randLetter = bag[randNum];
            $("#tiles").append('<div id="draggable' + i + '" letter="' + randLetter + '" value="' + ScrabbleTiles[randLetter]["value"] + '" placement="false" class="draggable" style="background-image: url(' + "'graphics_data(1)/graphics_data/Scrabble_Tiles/Scrabble_Tile_" + randLetter + ".jpg'" + '); width: 161px; height: 174px; padding: 0; margin: 0;"></div>');
        }
        $(".draggable").draggable({ //then we need to set the new tiles to draggable, or else they wont be draggable
            revert: function (Dropped) { //revert function so that they revert back to their last position if theyre dropped in an invalid location
                if (!Dropped) {
                    return true;
                }
            },
            snap: ".boardelement", //snap to the middle of our tiles
            snapMode: "inner",
            snapTolerance: 10,
        });
        var tiles = $("#TileCount"); //lines 68-73 reduce the tile count and set the word to be 7 underscores once again now that the board is cleared
        var tileCount = tiles.text();
        var newCount = parseInt(tileCount) - quant;
        tiles.text(newCount);
        var word = $("#word");
        word.text("_______");
        if (newCount <= 0) { //checks each time we click the submit button to see if we've used up all our tiles, if we have, make an alert that we won with our score and reload the page
            var score = $("#score");
            console.log("Win!")
            alert("You win! Score = " + score.text());
            location.reload(true);
        }
    });
    $("#button2").on("click", function (event) { //restart game on click function, just reloads the page
        location.reload(true);
    });
    $(".draggable").draggable({ //this is here to set the initial 7 tiles as draggable
        revert: function (Dropped) {
            if (!Dropped) {
                return true;
            }
        },
        snap: ".boardelement",
        snapMode: "inner",
        snapTolerance: 10,
    });
    $("#tiles").droppable({ //when a tile is dropped onto the rack, set its placement to false
        drop: function (event, ui) {
            $(this)
            ui.draggable.attr("placement", "false");
        }
    }),
    $(".boardelement").droppable({ //when we drop a tile onto the board we need to set the word and score properly
        drop: function (event, ui) {
            $(this)
            ui.draggable.attr("placement", "true"); //we start by setting the placement to true since its on the board
            if (parseInt($(this).attr("id")) == 1 || parseInt($(this).attr("id")) == 5) { //these two following statements set the score based on what kind of board section a tile is placed on
                var score = $("#score"); //if placed on a double letter tile, add the letter score to the maximum score but multiplied by 2
                var scoreText = score.text();
                var newScore = parseInt(scoreText) + (parseInt(ui.draggable.attr("value")) * 2)
                score.text(newScore);
            }
            else {
                var score = $("#score"); //otherwise we just add the normal letter score
                var scoreText = score.text();
                var newScore = parseInt(scoreText) + parseInt(ui.draggable.attr("value"))
                score.text(newScore);
            }
            var word = $("#word"); //grab the word text
            var words = word.text();
            if (parseInt($(this).attr("id")) == 0) { //the logic is different for the board pieces on the left and right, and all the ones in the middle because im using the substring function
                var newWord = ui.draggable.attr("letter") + words.substring(1, 7);
            }
            else if (parseInt($(this).attr("id")) == 6) {
                var newWord = words.substring(0, 6) + ui.draggable.attr("letter");
            }
            else {
                var newWord = words.substring(0, parseInt($(this).attr("id"))) + ui.draggable.attr("letter") + words.substring(parseInt($(this).attr("id")) + 1, 7);
            }
            word.text(newWord); //set the new word properly
        },
        out: function (event, ui) { //when a tile is taken off of a board piece, dictated by the out function, we need to undo the score and the text change
            $(this) //same exact logic as above but in reverse
            if (ui.draggable.attr("placement") == "true") {
                if (parseInt($(this).attr("id")) == 1 || parseInt($(this).attr("id")) == 5) {
                    var score = $("#score");
                    var scoreText = score.text();
                    var newScore = parseInt(scoreText) - (parseInt(ui.draggable.attr("value")) * 2)
                    score.text(newScore);
                }
                else {
                    var score = $("#score");
                    var scoreText = score.text();
                    var newScore = parseInt(scoreText) - parseInt(ui.draggable.attr("value"))
                    score.text(newScore);
                }
                var word = $("#word");
                var words = word.text();
                if (parseInt($(this).attr("id")) == 0) {
                    var newWord = "_" + words.substring(1, 7);
                }
                else if (parseInt($(this).attr("id")) == 6) {
                    var newWord = words.substring(0, 6) + "_";
                }
                else {
                    var newWord = words.substring(0, parseInt($(this).attr("id"))) + "_" + words.substring(parseInt($(this).attr("id")) + 1, 7);
                }
                word.text(newWord);
                ui.draggable.attr("placement", "false");
            }
        }
    });
});