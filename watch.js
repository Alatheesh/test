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

const bufferLoader=
document.getElementById(
  "bufferLoader"
);

// START STREAMING

function startStreaming(){

  const params=
  new URLSearchParams(
    location.search
  );

  const link=
  params.get("link");

  if(!link){

    showToast(
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

// SKIP FORWARD

function skipForward(){

  player.currentTime(
    player.currentTime() + 10
  );

  showToast(
    "+10 Seconds"
  );

}

// SKIP BACKWARD

function skipBackward(){

  player.currentTime(
    player.currentTime() - 10
  );

  showToast(
    "-10 Seconds"
  );

}

// PLAY / PAUSE

function togglePlay(){

  if(player.paused()){

    player.play();

    showToast(
      "Playing"
    );

  }

  else{

    player.pause();

    showToast(
      "Paused"
    );

  }

}

// FULLSCREEN

function toggleFullscreen(){

  const wrapper=
  document.querySelector(
    ".player-card"
  );

  if(wrapper.requestFullscreen){

    wrapper.requestFullscreen();

  }

}

// PLAYBACK SPEED

document
.getElementById("speedControl")
.addEventListener(
  "change",
  (e)=>{

    player.playbackRate(
      Number(e.target.value)
    );

    showToast(
      "Speed: " +
      e.target.value + "x"
    );

  }
);

// COPY STREAM LINK

function copyStreamLink(){

  navigator.clipboard.writeText(
    location.href
  );

  showToast(
    "Stream link copied"
  );

}

// OPEN EXTERNAL PLAYER

function openExternalPlayer(){

  const params=
  new URLSearchParams(
    location.search
  );

  const link=
  params.get("link");

  window.open(link);

}

// VIDEO EVENTS

player.on(
  'loadedmetadata',
  ()=>{

    loadingScreen.style.display=
    "none";

  }
);

// BUFFERING START

player.on(
  "waiting",
  ()=>{

    bufferLoader.classList.add(
      "show"
    );

  }
);

// BUFFERING END

player.on(
  "playing",
  ()=>{

    bufferLoader.classList.remove(
      "show"
    );

  }
);

// KEYBOARD SHORTCUTS

document.addEventListener(
  "keydown",
  (e)=>{

    // SPACE

    if(e.code === "Space"){

      e.preventDefault();

      togglePlay();

    }

    // RIGHT ARROW

    if(e.code === "ArrowRight"){

      skipForward();

    }

    // LEFT ARROW

    if(e.code === "ArrowLeft"){

      skipBackward();

    }

    // FULLSCREEN

    if(e.key.toLowerCase() === "f"){

      toggleFullscreen();

    }

  }
);

// PREMIUM TOAST

function showToast(text){

  const toast=
  document.createElement(
    "div"
  );

  toast.innerText=
  text;

  toast.style.position=
  "fixed";

  toast.style.bottom=
  "30px";

  toast.style.left=
  "50%";

  toast.style.transform=
  "translateX(-50%)";

  toast.style.padding=
  "14px 22px";

  toast.style.borderRadius=
  "14px";

  toast.style.background=
  "rgba(0,0,0,0.7)";

  toast.style.backdropFilter=
  "blur(10px)";

  toast.style.color=
  "white";

  toast.style.zIndex=
  "9999";

  toast.style.fontSize=
  "14px";

  toast.style.boxShadow=
  "0 0 20px rgba(0,0,0,0.5)";

  document.body.appendChild(
    toast
  );

  setTimeout(()=>{

    toast.remove();

  },1500);

}

// AUTO START

window.addEventListener(
  "DOMContentLoaded",
  startStreaming
);
