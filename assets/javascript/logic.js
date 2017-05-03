/**
 * Created by rpaulin on 4/17/17.
 */

var config = {
    apiKey: "AIzaSyAJS4YQWU5DmESeYueG1qH1NGkjv3DncEY",
    authDomain: "fir-click-counter-7cdb9.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-f3977.firebaseio.com/",
    storageBucket: "rps-multiplayer-f3977"
};

firebase.initializeApp(config);

var database = firebase.database();

var playersRef = database.ref().child("players");

var turnRef = database.ref().child("turn");

var playerNumber;

var namePlayer;

var choice1;
var choice2;

var winner;
var winnerName;

var wins1;
var wins2;
var losses1;
var losses2;

var name1;
var name2;

var tie = false;

turnRef.onDisconnect().remove();
database.ref().child("chat").onDisconnect().remove();

playersRef.on("child_added",function(snapshot){

    var key = snapshot.key;

    $("#player"+ key + "BoxName").text(snapshot.val().name);

});

playersRef.on('child_removed', function(snapshot) {

    var key = snapshot.key;

    $("#player"+ key + "BoxName").text("waiting for player " + key + " to join");

    if(key == 1){
        playersRef.child("2").update({
            wins: 0,
            losses: 0
        });
    }else if(key == 2){
        playersRef.child("1").update({
            wins: 0,
            losses: 0
        });
    }


});

turnRef.on("value",function(snapshot){

    var turn = snapshot.val();

    if(turn == 1){

        playersRef.once("value",function(snapshot){
            wins1 = snapshot.val()["1"].wins;
            wins2 = snapshot.val()["2"].wins;
            losses1 = snapshot.val()["1"].losses;
            losses2 = snapshot.val()["2"].losses;
        });

        $("#winningBox").empty();
        $("#results1").html("wins: " + wins1 + " | losses: " + losses1);
        $("#results2").html("wins: " + wins2 + " | losses: " + losses2);

        if(playerNumber === 1) {
            // show options to player 1
            $("#messageDiv").text("make your pick");
            $("#status1").text("choose an option below");
            $("#status2").empty();
            $("#options1").css("display", "block");

        }else if(playerNumber === 2){
            // player 2 waits for player 1 to choose
            $("#messageDiv").text("waiting for player 1 to choose");
            $("#status1").empty();
            $("#status2").empty();
        }
    }

    if(turn == 2){

        if(playerNumber === 2) {
            // show options to player 2
            $("#status2").text("choose an option below");
            $("#options1").css("display", "none");
            $("#status1").empty();
            $("#options2").css("display", "block");
            $("#messageDiv").text("make your pick");
        }else if(playerNumber === 1){
            // player 2 waits for player 1 to choose
            $("#options1").css("display", "none");
            $("#status1").empty();
            $("#messageDiv").text("waiting for player 2 to choose");
        }
    }

    if(turn == 3){
        $("#options2").css("display", "none");
        $("#status2").empty();

        determineWinner();

        setTimeout(function(){
            turnRef.set(1);
        },5000);
        // compute results
        // show results for a few seconds
        // empty results div
        // make turn = 1
    }

});

// adding a new player
var determinePlayer = function(){

    database.ref().once("value",function(snapshot){

        var numberOfPlayers = snapshot.child("players").numChildren();

        console.log("numberOfPlayers: " + numberOfPlayers);
        console.log("playerNumber: " + playerNumber);

        // checking if there are no players connected yet
        if(numberOfPlayers == 0){

            playerNumber = 1;
            wins1 = 0;
            losses1 = 0;

            $("#player1BoxName").empty();
            $("#player1BoxName").text(namePlayer);

            $("#nameInputDiv").css("display","none");
            $("#messageDiv").text("Welcome " + namePlayer + ", you are player #" + playerNumber);

            playersRef.child(playerNumber).onDisconnect().remove();

            playersRef.child(playerNumber).set({

                name: namePlayer,
                wins: 0,
                losses: 0

            });

        }

        // checking if there is a #2 player but not #1
        else if(numberOfPlayers == 1 && snapshot.child("players").val()[2] !== undefined){

            playerNumber = 1;
            wins1 = 0;
            losses1 = 0;

            $("#player1BoxName").empty();
            $("#player1BoxName").text(namePlayer);

            $("#nameInputDiv").css("display","none");
            $("#messageDiv").text("Welcome " + namePlayer + ", you are player #" + playerNumber);

            playersRef.child(playerNumber).onDisconnect().remove();

            playersRef.child(playerNumber).set({

                name: namePlayer,
                wins: 0,
                losses: 0

            });

            turnRef.set(1);

        }

        // if player 1 exists but there is no player 2 yet
        else if(numberOfPlayers == 1){

            playerNumber = 2;
            wins2 = 0;
            losses2 = 0;

            $("#player2BoxName").empty();
            $("#player2BoxName").text("Welcome " + namePlayer + ", you are player #" + playerNumber);

            $("#nameInputDiv").css("display","none");
            $("#messageDiv").text("Welcome " + namePlayer + ", you are player #" + playerNumber);

            playersRef.child(playerNumber).onDisconnect().remove();

            playersRef.child(playerNumber).set({

                name: namePlayer,
                wins: 0,
                losses: 0

            });

            turnRef.set(1);

        }

        console.log("playerNumber: " + playerNumber);

    })

};


$("#playerNameBtn").on("click",function(event){

    event.preventDefault();

    namePlayer = $("#playerNameInpt").val();

    determinePlayer();

});

$(".rock").on("click",function(){

    playersRef.child(playerNumber).update({

        choice: "rock"

    });
    if(playerNumber == 1){
        turnRef.set(2)
    }else if(playerNumber == 2){
        turnRef.set(3)
    }

});

$(".paper").on("click",function(){

    playersRef.child(playerNumber).update({

        choice: "paper"

    });
    if(playerNumber == 1){
        turnRef.set(2)
    }else if(playerNumber == 2){
        turnRef.set(3)
    }

});

$(".scissors").on("click",function(){

    playersRef.child(playerNumber).update({

        choice: "scissors"

    });
    if(playerNumber == 1){
        turnRef.set(2)
    }else if(playerNumber == 2){
        turnRef.set(3)
    }

});

var determineWinner = function(){
    tie = false;

    playersRef.once("value",function(snapshot){

        choice1 = snapshot.val()["1"].choice;
        choice2 = snapshot.val()["2"].choice;
        name1 = snapshot.val()["1"].name;
        name2 = snapshot.val()["2"].name;

        if ((choice1 === "rock") && (choice2 === "scissors")) {
            winner = 1;
            winnerName = name1;
            playersRef.child("1").update({
                wins: wins1 + 1
            });

            playersRef.child("2").update({
                losses: losses2 + 1
            });
        }
        else if ((choice1 === "rock") && (choice2 === "paper")) {
            winner = 2;
            winnerName = name2;
            playersRef.child("2").update({
                wins: wins2 + 1
            });

            playersRef.child("1").update({
                losses: losses1 + 1
            });
        }
        else if ((choice1 === "scissors") && (choice2 === "rock")) {
            winner = 2;
            winnerName = name2;
            playersRef.child("2").update({
                wins: wins2 + 1
            });

            playersRef.child("1").update({
                losses: losses1 + 1
            });
        }
        else if ((choice1 === "scissors") && (choice2 === "paper")) {
            winner = 1;
            winnerName = name1;
            playersRef.child("1").update({
                wins: wins1 + 1
            });

            playersRef.child("2").update({
                losses: losses2 + 1
            });
        }
        else if ((choice1 === "paper") && (choice2 === "rock")) {
            winner = 1;
            winnerName = name1;
            playersRef.child("1").update({
                wins: wins1 + 1
            });

            playersRef.child("2").update({
                losses: losses2 + 1
            });
        }
        else if ((choice1 === "paper") && (choice2 === "scissors")) {
            winner = 2;
            winnerName = name2;
            playersRef.child("2").update({
                wins: wins2 + 1
            });

            playersRef.child("1").update({
                losses: losses1 + 1
            });
        }
        else if (choice1 === choice2) {
            tie = true;
            winnerName = "It's a tie"
        }

        var img1 = $("<img>").attr("src","assets/images/"+ choice1 + ".png");
        var img2 = $("<img>").attr("src","assets/images/"+ choice2 + ".png");

        $("#status1").html(img1);
        $("#status2").html(img2);

        if(tie === true){
            $("#winningBox").html(winnerName);
        }else{
            $("#winningBox").html("The winner is " + winnerName);
        }

    });

};

$("#chatBtn").on("click",function(){

    var message = $("#chatInput").val();

    $("#chatInput").val("");

    if(namePlayer == undefined){

        database.ref().child("chat").push({
            message: "Outsider: " + message
        });

    }else{
        database.ref().child("chat").push({
            message: namePlayer + ": " + message
        });
    }

});

database.ref().child("chat").orderByKey().on("child_added",function(snapshot) {

    var newMessage = $("<p>").html(snapshot.val().message);

    $("#chat").append(newMessage);

});






