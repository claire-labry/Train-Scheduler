// Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyA4q8acgkEvZF1623DXF4VaNdnJpWUWURo",
        authDomain: "train-scheduler-dfff0.firebaseapp.com",
        databaseURL: "https://train-scheduler-dfff0.firebaseio.com",
        projectId: "train-scheduler-dfff0",
        storageBucket: "train-scheduler-dfff0.appspot.com",
        messagingSenderId: "946340879207",
        appId: "1:946340879207:web:ccc36590757b027c33adc2"
    };
  
    firebase.initializeApp(firebaseConfig);

// Variable that links to Firebase

    var database = firebase.database();

// On click function to add trains 

   $("#add-train-btn").on("click", function(event){
       event.preventDefault();

       var trainName = $("#train-name-input").val().trim();
       var trainDest = $("#destination-input").val().trim();
       var firstTrainTime = $("#first-train-input").val().trim();
       var trainFreq =  $("#frequency-input").val().trim();

       var newTrain ={

        name: trainName,
        destination: trainDest,
        firstTime: firstTrainTime,
        frequency: trainFreq,

       };

       database.ref().push(newTrain);

// Console logs to check the values that were pushed into Firebase

       console.log(newTrain.name)
       console.log(newTrain.destination)
       console.log(newTrain.firstTime)
       console.log(newTrain.frequency)

       alert("New Train Added!")

       $("#train-name-input").val("")
       $("#destination-input").val("")
       $("#first-train-input").val("")
       $("#frequency-input").val("")

   });

   database.ref().on("child_added", function(childSnapshot){
       console.log(childSnapshot.val());
    
       var trainName = childSnapshot.val().name;
       var trainDest = childSnapshot.val().destination;
       var firstTrainTime = childSnapshot.val().firstTime;
       var trainFreq =  childSnapshot.val().frequency;

       console.log(trainName);
       console.log(trainDest);
       console.log(firstTrainTime);
       console.log(trainFreq);


    // calculating next trains arriving 
    
    var firstTrainTimeCurr = moment(firstTrainTime, "hh:mm a").subtract(1, "years")
   
    var currentTime = moment().format("hh:mm a");
    console.log(currentTime)
    
    var trainTimeDiff = moment().diff(moment(firstTrainTimeCurr), "minutes");
    
    var timeLeft = trainTimeDiff % trainFreq;
    
    var minAway = trainFreq - timeLeft;
    
    var nextArr = moment().add(minAway, "minutes").format("hh:mm a")
    console.log(nextArr);


    // creating a new train row

    var newTrainRow = $("<tr>").append(
        $("<th>").text(trainName),
        $("<th>").text(trainDest),
        $("<th>").text(trainFreq),
        $("<th>").text(nextArr),
        $("<th>").text(minAway),
      );

    // // Append the new train row
    
    $("#table > tbody").append(newTrainRow);

   }); // end syntax