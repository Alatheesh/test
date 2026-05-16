const statusText =
document.getElementById("status");

const debugBox =
document.getElementById("debugBox");


// DEBUG LOGGER

function logDebug(text){

  console.log(text);

  debugBox.innerHTML +=
  "\n" + text;
}


// INIT PLAYER

const player = videojs(
  'videoPlayer',
  {
    controls:true,
    autoplay:false,
    preload:'auto',
    fluid:true,
    responsive:true
  }
);


// START STREAM

function startStreaming(){

  const params =
  new URLSearchParams(location.search);

  const link =
  params.get("link");

  if(!link){

    alert("No video link found ❌");

    return;
  }

  debugBox.innerHTML = "";

  statusText.innerText =
  "Loading stream...";

  logDebug("Loading stream...");
  logDebug("URL received.");

  let type = "video/mp4";

  if(link.includes(".m3u8")){

    type =
    "application/x-mpegURL";
  }

  else if(link.includes(".mpd")){

    type =
    "application/dash+xml";
  }

  else if(link.includes(".mkv")){

    type =
    "video/x-matroska";
  }

  logDebug(
    "Detected type: " + type
  );

  player.src({
    src:link,
    type:type
  });

  player.ready(()=>{

    statusText.innerText =
    "Video loaded ✅";

    logDebug("Player ready.");

    inspectTracks();
  });

  player.on('error',()=>{

    const error =
    player.error();

    statusText.innerText =
    "⚠ Video failed";

    logDebug(
      "Player Error: " +
      JSON.stringify(error)
    );
  });

}


// TRACKS

function inspectTracks(){

  try{

    const audioTracks =
    player.audioTracks();

    const textTracks =
    player.textTracks();

    logDebug(
      "AudioTracks object: " +
      (!!audioTracks)
    );

    logDebug(
      "TextTracks object: " +
      (!!textTracks)
    );

    if(audioTracks){

      logDebug(
        "Audio track count: " +
        audioTracks.length
      );

      for(let i=0;
          i<audioTracks.length;
          i++){

        const track =
        audioTracks[i];

        logDebug(
          "Track " + i +
          " | label: " +
          track.label +
          " | language: " +
          track.language
        );
      }

    }

    if(textTracks){

      logDebug(
        "Subtitle track count: " +
        textTracks.length
      );
    }

  }

  catch(error){

    logDebug(
      "Track inspection failed: " +
      error.message
    );
  }

}


// EVENTS

player.on('loadedmetadata',()=>{

  logDebug(
    "loadedmetadata fired."
  );

  inspectTracks();
});


player.on('play',()=>{

  logDebug(
    "Playback started."
  );
});


player.on('waiting',()=>{

  logDebug(
    "Buffering..."
  );
});


player.on('dispose',()=>{

  logDebug(
    "Player disposed."
  );
});
