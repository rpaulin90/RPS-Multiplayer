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

var trainRef = database.ref().child("players");
var trainRef1 = database.ref().child("players").child("player1");
var trainRef2 = database.ref().child("players").child("player2");

// WE WILL USE A COUNTER VARIABLE TO KNOW HOW MANY PLAYERS ARE CURRENTLY SIGNED IN

var game = {

    counter: 0,

    namePlayer1:"",

    namePlayer2:"",

    winsPlayer1: 0,

    lossesPlayer1: 0,

    winsPlayer2: 0,

    lossesPlayer2: 0,

    turn: 0
}

////////////////////////// NEW PLAYER INPUT/BUTTON ///////////////////////////////////

$("#playerNameBtn").on("click",function(event){

    event.preventDefault();

    if(game.counter === 1) {

        game.counter++;

        game.namePlayer2 = $("#playerNameInpt").val();

        // var name2 = $("<div>");
        //
        // var options2 = $("<div>");
        //
        // var results2 = $("<div>");
        //
        // name2.addClass("name2Div");
        //
        // options2.addClass("options2Div");
        //
        // results2.addClass("results2Div");
        //
        // name2.text(game.namePlayer2);
        //
        // results2.text("wins: " + game.winsPlayer2 + " losses: " + game.lossesPlayer2);
        //
        // $("#player2Box").empty();
        //
        // $("#player2Box").append(name2);
        //
        //
        // $("#player2Box").append(options2);
        //
        //
        // $("#player2Box").append(results2);

        trainRef.set ({

            player1: {
                name: game.namePlayer1,
                losses: game.lossesPlayer1,
                wins: game.winsPlayer1
            },

            player2: {
                name: game.namePlayer2,
                losses: game.lossesPlayer2,
                wins: game.winsPlayer2
            }

        });

        // trainRef.on("value", function(snapshot) {
        //
        //     var name2 = $("<div>");
        //
        //     var options2 = $("<div>");
        //
        //     var results2 = $("<div>");
        //
        //     name2.addClass("name2Div");
        //
        //     options2.addClass("options2Div");
        //
        //     results2.addClass("results2Div");
        //
        //     name2.text(snapshot.val().player2.name);
        //
        //     results2.text("wins: " + snapshot.val().player2.wins + " losses: " + snapshot.val().player2.losses);
        //
        //     $("#player2Box").empty();
        //
        //     $("#player2Box").append(name2);
        //
        //
        //     $("#player2Box").append(options2);
        //
        //
        //     $("#player2Box").append(results2);
        //
        // });

        game.turn = 1;
    }

    if(game.counter === 0) {
        game.counter++;

        game.namePlayer1 = $("#playerNameInpt").val();

        trainRef.set ({

            player1: {
                name: game.namePlayer1,
                losses: game.lossesPlayer1,
                wins: game.winsPlayer1
            }

        });

    }

    $("#playerNameInpt").val("");

});

////////////////////////// NEW PLAYER INPUT/BUTTON ///////////////////////////////////

//////////////////////// CHECK FOR CHILD ADDED ///////////////////////////////////////

    database.ref().on("value", function (snapshot) {

        if(game.counter === 1) {

            var name1 = $("<div>");

            var options1 = $("<div>");

            var results1 = $("<div>");

            name1.addClass("name1Div");

            options1.addClass("options1Div");

            results1.addClass("results1Div");

            console.log(snapshot.key);

            name1.text(snapshot.val().players.player1.name);

            results1.text("wins: " + snapshot.val().players.player1.wins + " losses: " + snapshot.val().players.player1.losses);

            $("#player1Box").empty();

            $("#player1Box").append(name1);


            $("#player1Box").append(options1);


            $("#player1Box").append(results1);

        }



    ////////////////////////////////////////////////////////

    else if(game.counter === 2) {
            var name2 = $("<div>");

            var options2 = $("<div>");

            var results2 = $("<div>");

            name2.addClass("name2Div");

            options2.addClass("options2Div");

            results2.addClass("results2Div");

            name2.text(snapshot.val().players.player2.name);

            results2.text("wins: " + snapshot.val().players.player2.wins + " losses: " + snapshot.val().players.player2.losses);

            $("#player2Box").empty();

            $("#player2Box").append(name2);


            $("#player2Box").append(options2);


            $("#player2Box").append(results2);
        }
    });






//////////////////////// CHECK FOR CHILD ADDED ///////////////////////////////////////













//////////////////////////////////// TURNS ///////////////////////////////////////////

// if(game.turn === 1){
//     $("#player1Box").html(
//         "<div>" + $("#playerNameInpt").val() + "</div>"  +
//         "<div> wins: " + game.winsPlayer1 + " losses: " + game.lossesPlayer1 + "  </div>"
//     );
// }
