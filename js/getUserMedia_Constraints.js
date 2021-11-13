

var qvgaButton = document.querySelector("button#qvga");
var vgaButton = document.querySelector("button#vga");
var hdButton = document.querySelector("button#hd");

var video = document.querySelector("video");

//local stream media to play with
var stream;

navigator.getUserMedia= navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

function successCallBack(gotStream){

    //make the stream available to the console for introspection
    window.stream = gotStream;

    //attach the stream to the vidoe element
    if(window.URL)
    {
        //Chrome Case: URL.createObjectURL() converts a MediaStream to a blob URL
        video.srcObject = gotStream; 
    }
    else
    {
            //Firefox and Opera: the src of the video can be set directly from the stream
            video.src = gotStream;
    }

//start playing the video

video.play();

}

function errorCallBack(error){
    console.error("navigator.getUserMedia error: " + error);
}

//Constraints object for low resolution video
var qvgaConstraint = {
    video:{
        mandatory:{
            maxWidth:320,
            maxHeight:240
        }
    }
};

//Constraints object for standard resolution video
var vgaConstraint = {
    video:{
        mandatory:{
            maxWidth:640,
            maxHeight:480
        }
    }
};

//Constraints object for high resolution video
var hdConstraint = {
    video:{
        mandatory:{
            maxWidth:1280,
            maxHeight:960
        }
    }
};


//Associate actions with Buttons

qvgaButton.onclick= function(){getMedia(qvgaConstraint)};
vgaButton.onclick= function(){getMedia(vgaConstraint)};
hdButton.onclick= function(){getMedia(hdConstraint)};

function getMedia(constraints){
    if(!!stream){
        const tracks = stream.getTracks();
console.log(tracks);
        tracks.forEach(function(track) {
          track.stop();
        });
      
        video.srcObject = null;
    }

    navigator.getUserMedia(constraints,successCallBack,errorCallBack);
}