const statusText=
document.getElementById("status");

const debugBox=
document.getElementById("debugBox");

// DEBUG LOGGER

function logDebug(text){

  console.log(text);

  debugBox.innerHTML +=
  "\n" + text;

}

// VIDEO JS PLAYER

const player=
videojs(
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

  const params=
  new URLSearchParams(
    location.search
  );

  const link=
  params.get("link");

  if(!link){

    alert(
      "No video link found ❌"
    );

    return;

  }

  debugBox.innerHTML="";

  statusText.innerText=
  "Loading stream...";

  logDebug(
    "Loading stream..."
  );

  logDebug(
    "VIDEO LINK:"
  );

  logDebug(link);

  let type=
  "video/mp4";

  if(link.includes(".m3u8")){

    type=
    "application/x-mpegURL";

  }

  else if(link.includes(".mpd")){

    type=
    "application/dash+xml";

  }

  else if(link.includes(".mkv")){

    type=
    "video/x-matroska";

  }

  logDebug(
    "Detected type: " +
    type
  );

  player.src({

    src:link,
    type:type

  });

  player.ready(()=>{

    statusText.innerText=
    "Video loaded ✅";

    logDebug(
      "Player ready."
    );

  });

  player.on('error',()=>{

    const error=
    player.error();

    statusText.innerText=
    "⚠ Video failed";

    logDebug(
      "Player Error: " +
      JSON.stringify(error)
    );

  });

}

// EVENTS

player.on('loadedmetadata',()=>{

  logDebug(
    "loadedmetadata fired."
  );

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

// AUTO START

window.addEventListener(
  "DOMContentLoaded",
  startStreaming
);
