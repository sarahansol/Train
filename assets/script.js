

  // Initialize Firebase
  

  var config = {
    apiKey: "AIzaSyA6VOIey5q0X3UiKxnT59oG3rDbLnxNSNU",
    authDomain: "train-55dfb.firebaseapp.com",
    databaseURL: "https://train-55dfb.firebaseio.com",
    projectId: "train-55dfb",
    storageBucket: "train-55dfb.appspot.com",
    messagingSenderId: "300703575281"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(){
  		event.preventDefault();

  		var $name = $("#Train-name-input").val().trim();
  		var $destination = $("#Destination-input").val().trim();
  		var $arrival = $("#Arrival-input").val().trim();
  		var $freq = $("#type-input").val().trim();

  		var uTrain = {
  		uName: $name,
  		uDestination: $destination,
  		uArrival: $arrival,
  		uFreq: $freq
  		};

  		database.ref().push(uTrain);

  		alert("Train Succesfully Added")

  		$("#Train-name-input").val("");
  		$("#Destination-input").val("");
  		$("#Arrival-input").val("");
  		$("#type-input").val("");

  		return false;

   });

  
  	database.ref().on("child_added", function(childSnapshot){

  		console.log(childSnapshot.val());
 	 
  		var tName = childSnapshot.val().uName;
  		var tDestination = childSnapshot.val().uDestination;
  		var tArrival = childSnapshot.val().uArrival;
  		var tType = childSnapshot.val().uType;




  		var momentTime = moment(tArrival, "HH:mm");
  		console.log(momentTime)

  		var currentTime = moment();
  		var diffTime = moment().diff(moment(momentTime), "minutes");
  		var tRemainder = diffTime % tType;
 	

  		var Traintype =	tType - tRemainder;
  		var nextTrain = moment().add(minsAway, "minutes");
  		var nextTrainMoment = moment(nextTrain).format("hh:mm a");
 


  		  $("#table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
 	 		 tArrival + "</td><td>" + nextTrainMoment + "</td><td>" + Traintype + "</td></tr>");
	
  	});

  

// console.log("JS Link Check")