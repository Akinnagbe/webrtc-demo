//Calling the GetUserMedia Javascript function depends on the type of browser
//API method:
//Opera --> getUserMedia
//Chrome --> webkitGetUserMedia
//Firefox --> mozGetUserMedia


navigator.getUserMedia=navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//use contraints to ask for video-only mediastream:
var constraints = {audio:false,video:true};

var video = document.querySelector("video");

//callback to be called in case of success

function successCallback(stream){
    //NOTE: make the returned stream available to console for inspection
window.stream = stream;
console.log(stream);
if(window.URL){
//Chrome Case: URL.createObjectURL() converts a MediaStream to a blob URL
video.srcObject = stream; 
}else{
    //Firefox and Opera: the src of the video can be set directly from the stream
    video.src = stream;
}
//All set, play the video
video.play();
}


//Callback to be called in case of failures...

function errorCallback(error){
    console.log("navigator.getUserMedia error:", error);
}

navigator.getUserMedia(constraints,successCallback,errorCallback);



