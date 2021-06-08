prediction_1="";
prediction_2="";
Webcam.set({
    width: 300,
    height: 300,
    image_format:"png",
    png_quality: 90
})
Webcam.attach("#camera")
function capture(){
    Webcam.snap(function(data_URI){
        document.getElementById("snapshot_img").innerHTML="<img src='"+data_URI+"' id='captured_img'>"
    })
}
console.log(ml5.version)
var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/trid3KF88/model.json", modelLoaded)
function modelLoaded(){
    console.log("Model is working");
}
function speak(){
    var synth=window.speechSynthesis;
    first_data="The first prediction is" + prediction_1
    second_data="The second prediction is" + prediction_2
    var utter_this=new SpeechSynthesisUtterance(first_data+second_data)
    synth.speak(utter_this);
}
function predict(){
    var display_img=document.getElementById("captured_img");
    classifier.classify(display_img, gotResult)
}
function gotResult(error, result){
    if(error){
        console.log(error)
    }
    else{
        console.log(result)
        document.getElementById("emo1_name").innerHTML=result[0].label;
        prediction1=result[0].label;
        prediction2=result[1].label;
        document.getElementById("emo2_name").innerHTML=result[1].label;
        if(result[0].label=="Sad"){
            document.getElementById("emoji1").innerHTML="&#128577"
        }
        if(result[0].label=="Happy"){
            document.getElementById("emoji1").innerHTML="&#128512"
        }
        if(result[0].label=="Angry"){
            document.getElementById("emoji1").innerHTML="&#128545"
        }
        if(result[0].label=="Crying"){
            document.getElementById("emoji1").innerHTML="&#128546"
        }
        if(result[1].label=="Sad"){
            document.getElementById("emoji2").innerHTML="&#128577"
        }
        if(result[1].label=="Happy"){
            document.getElementById("emoji2").innerHTML="&#128512"
        }
        if(result[1].label=="Angry"){
            document.getElementById("emoji2").innerHTML="&#128545"
        }
        if(result[1].label=="Crying"){
            document.getElementById("emoji2").innerHTML="&#128546"
        }
        speak();
    }
}
