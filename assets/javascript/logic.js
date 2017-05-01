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
var player1Ref = database.ref().child("players").child("1");
var player2Ref = database.ref().child("players").child("2");


var playerNumber;

var namePlayer;

// adding a new player
var determinePlayer = function(){

    database.ref().once("value",function(snapshot){

        var numberOfPlayers = snapshot.child("players").numChildren();

        // chacking if there are no players connected yet
        if(numberOfPlayers == 0){

            playerNumber = 1;

            playersRef.child(playerNumber).set({

                name: namePlayer,
                wins: 0,
                losses: 0

            })

        }

        // checking if there is a #2 player but not #1
        else if(numberOfPlayers == 1 && snapshot.child("players").val()[2] !== "undefined"){

            playerNumber = 1;

            playersRef.child(playerNumber).set({

                name: namePlayer,
                wins: 0,
                losses: 0

            })

        }

        else if(numberOfPlayers == 1){

            playerNumber = 2;

            playersRef.child(playerNumber).set({

                name: namePlayer,
                wins: 0,
                losses: 0

            })

        }


    })

};


$("#playerNameBtn").on("click",function(event){

    event.preventDefault();

    namePlayer = $("#playerNameInpt").val();

    determinePlayer();

});





