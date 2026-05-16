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

const loadingScreen=
document.getElementById(
  "loadingScreen"
);

function startStreaming(){

  const params=
  new URLSearchParams(
    location.search
  );

  const link=
  params.get("link");

  if(!link){

    alert(
      "No stream link found"
    );

    return;

  }

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

  player.src({

    src:link,
    type:type

  });

}

function skipForward(){

  player.currentTime(
    player.currentTime() + 10
  );

}

function skipBackward(){

  player.currentTime(
    player.currentTime() - 10
  );

}

function togglePlay(){

  if(player.paused()){

    player.play();

  }

  else{

    player.pause();

  }

}

function toggleFullscreen(){

  if(player.requestFullscreen){

    player.requestFullscreen();

  }

}

document
.getElementById("speedControl")
.addEventListener(
  "change",
  (e)=>{

    player.playbackRate(
      Number(e.target.value)
    );

  }
);

function copyStreamLink(){

  navigator.clipboard.writeText(
    location.href
  );

  alert(
    "Stream link copied"
  );

}

function openExternalPlayer(){

  const params=
  new URLSearchParams(
    location.search
  );

  const link=
  params.get("link");

  window.open(link);

}

player.on('loadedmetadata',()=>{

  loadingScreen.style.display=
  "none";

});

window.addEventListener(
  "DOMContentLoaded",
  startStreaming
);
