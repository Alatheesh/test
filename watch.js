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

// START STREAMING

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

// SKIP FORWARD

function skipForward(){

  player.currentTime(
    player.currentTime() + 10
  );

}

// SKIP BACKWARD

function skipBackward(){

  player.currentTime(
    player.currentTime() - 10
  );

}

// PLAY / PAUSE

function togglePlay(){

  if(player.paused()){

    player.play();

  }

  else{

    player.pause();

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

// OPEN VLC / MX

function openExternalPlayer(){

  const params=
  new URLSearchParams(
    location.search
  );

  const link=
  params.get("link");

  window.open(link);

}

// HIDE LOADING

player.on('loadedmetadata',()=>{

  loadingScreen.style.display=
  "none";

});

// AUTO START

window.addEventListener(
  "DOMContentLoaded",
  startStreaming
);

// DOUBLE TAP SEEK

const leftZone=
document.getElementById(
  "leftZone"
);

const rightZone=
document.getElementById(
  "rightZone"
);

const leftAnim=
document.getElementById(
  "leftAnim"
);

const rightAnim=
document.getElementById(
  "rightAnim"
);

let lastLeftTap=0;
let lastRightTap=0;

// MOBILE LEFT

leftZone.addEventListener(
  "touchend",
  ()=>{

    const now=
    Date.now();

    if(now-lastLeftTap < 300){

      skipBackward();

      showTapAnimation(
        leftAnim
      );

    }

    lastLeftTap=now;

  }
);

// MOBILE RIGHT

rightZone.addEventListener(
  "touchend",
  ()=>{

    const now=
    Date.now();

    if(now-lastRightTap < 300){

      skipForward();

      showTapAnimation(
        rightAnim
      );

    }

    lastRightTap=now;

  }
);

// PC DOUBLE CLICK

leftZone.addEventListener(
  "dblclick",
  ()=>{

    skipBackward();

    showTapAnimation(
      leftAnim
    );

  }
);

rightZone.addEventListener(
  "dblclick",
  ()=>{

    skipForward();

    showTapAnimation(
      rightAnim
    );

  }
);

// TAP ANIMATION

function showTapAnimation(el){

  el.classList.add(
    "show"
  );

  setTimeout(()=>{

    el.classList.remove(
      "show"
    );

  },400);

}

// KEYBOARD SHORTCUTS

document.addEventListener(
  "keydown",
  (e)=>{

    // SPACE

    if(e.code === "Space"){

      e.preventDefault();

      togglePlay();

    }

    // RIGHT

    if(e.code === "ArrowRight"){

      skipForward();

      showTapAnimation(
        rightAnim
      );

    }

    // LEFT

    if(e.code === "ArrowLeft"){

      skipBackward();

      showTapAnimation(
        leftAnim
      );

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

  },2000);

}
