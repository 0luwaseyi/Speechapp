if ("webkitSpeechRecognition" in window){
    let speechRecognition = new webkitSpeechRecognition();
    let final_transcript = "";
    

    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;


    speechRecognition.onstart = () =>{
        console.log("speech recognition has started!")
    
        document.querySelector("#status").style.display = "block";
    };
    speechRecognition.onerror = () =>{
        recognizing = false;
        document.querySelector("#status").style.display = "none";
        console.log("speech Recognition Error!");
    };
    speechRecognition.onend = () =>{
        document.querySelector("#status").style.display = "none";
        console.log("speech Recognition ended");
    };
    speechRecognition.onresult = (event) => {
        let interim_transcript = "";
        for (let i = event.resultIndex; i < EventSource.results.length; ++i){
            if(event.results[i].isFinal){
                final_transcript += event.results[i][0].transcript;
            }
            else{
                interim_transcript += event.results[i][0].transcript;
            }
        }
        document.querySelector("#final").innerHTML = final_transcript;
        document.querySelector("interim").innerHTML = interim_transcript;

    };
    document.querySelector("#start").onclick = () =>{
        speechRecognition.start();
    };
    document.querySelector("#stop").onclick = () =>{
        speechRecognition.stop();
    };
}
else{
    console.log("speech Recognition Not Available!")
}