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
