const song1 = document.querySelector("#song")
let btnsongs = [];
let audios = [];
let currplayaudio = null;
let numberofsongs = 10;
let playingsongicon = null;
let songsall;
let currnum;
const main = async() =>{
        let p = await fetch("songs.json")
        songsall = await p.json()
        console.log("Loaded Successfully")
        console.log(songsall[0])
        console.log(songsall.length)
    for (let i=1;i<=songsall.length;i++) {
        let new1 = document.createElement("div")
        new1.classList.add(`song`)
        new1.classList.add(`song${i}`)
        new1.innerHTML = 
        `<div class="songpic">
        <img src="${songsall[i-1].songpicurl}" alt="">
        <button type="button" class="picplaybutton button${i}"><img class="picplayicon" src="picplayicon.svg" alt="picplayicon"> </button>
        </div>
        <div class="songname">
            <div class="songname1">${songsall[i-1].songname}</div>
            <div class="songartist">${songsall[i-1].artistname}</div>
        </div>`
        document.querySelector(".songscard").appendChild(new1)
    let songx = document.getElementsByClassName(`song${i}`)[0]
    let currplaybtn = document.querySelector(`.song${i} .picplaybutton`)
    songx.addEventListener("mouseover", function () {
            currplaybtn.style.display ="block"
            currplaybtn.style.animation = "picplaybutton 0.1s forwards"
            currplaybtn.style.cursor = "pointer"
    });
    songx.addEventListener("mouseout", function () {
            currplaybtn.style.display = "none"
    });
            audios[i] = new Audio(`${songsall[i-1].songurl}`)
            
            btnsongs[i] = document.querySelector(`.song${i} .button${i}`)
                btnsongs[i].addEventListener("click", function () {
                     if (currplayaudio !== audios[i] && currplayaudio !== null) {
                        currplayaudio.pause()
                     }
                    document.querySelector(".playareaseekbar").style.display = "flex"
                    audios[i].play()
                    currnum = i
                    document.querySelector(".bar .circle").style.display = "block"
                    currplayaudio = audios[i]
                    console.log(`${songsall[i-1].songname}`)
                    document.querySelector('.songname2').innerHTML = `${songsall[i-1].songname}`
                    document.querySelector('.songartist1').innerHTML = `${songsall[i-1].artistname}`
                    if(document.querySelector(`.button${i} .picplayicon`).src.includes("picplayicon.svg")) {
                        document.querySelector(`.button${i} .picplayicon`).src = "picpauseicon.svg"
                        document.querySelector(".playarea .pause").style.display = "block"
                        document.querySelector(".playarea .play").style.display = "none"
                        document.querySelector(".playarea .reset").style.display = "none"
                        let playicons = document.querySelectorAll(".picplayicon")
                        playicons.forEach(playicon =>{
                            if (playicon.src.includes("picpauseicon.svg") && playicon !== document.querySelector(`.button${i} .picplayicon`)) {
                                playicon.src = "picplayicon.svg"
                            }
                        })
                    }
                    else if(document.querySelector(`.button${i} .picplayicon`).src.includes("picpauseicon.svg")) {
                        audios[i].pause()
                        document.querySelector(".bar .circle").style.display = "none"
                        document.querySelector(`.button${i} .picplayicon`).src = "picplayicon.svg"
                        document.querySelector(".playarea .pause").style.display = "none"
                        document.querySelector(".playarea .play").style.display = "block"
                    }
                    playingsongicon = document.querySelector(`.button${i} .picplayicon`)
                    
                })
                audios[i].addEventListener("timeupdate", function () {
                    document.querySelector(".bar .seekbar").style.width = `${(audios[i].currentTime/audios[i].duration)*100}%`
                    document.querySelector(".bar .circle").style.left = `${(audios[i].currentTime/audios[i].duration)*100-1}%`
                    let currentdur = null;
                    if (Math.floor(currplayaudio.currentTime%60) < 10) {
                        currentdur = `0${Math.floor(currplayaudio.currentTime/60)}:0${Math.floor(currplayaudio.currentTime%60)}`
                    }
                    else if (Math.floor(currplayaudio.currentTime/60) >=10 && Math.floor(currplayaudio.currentTime%60)<10) {
                        currentdur = `0${Math.floor(currplayaudio.currentTime/60)}:0${Math.floor(currplayaudio.currentTime%60)}`
                    }
                    else if (Math.floor(currplayaudio.currentTime/60) >=10) {
                        currentdur = `0${Math.floor(currplayaudio.currentTime/60)}:${Math.floor(currplayaudio.currentTime%60)}`
                    }
                    else {
                        currentdur = `0${Math.floor(currplayaudio.currentTime/60)}:${Math.floor(currplayaudio.currentTime%60)}`
                    }
                    document.querySelector('.songduration').innerHTML = `${currentdur} / ${Math.floor(currplayaudio.duration/60)}:${Math.floor(currplayaudio.duration%60)}`
                
                //12 feb 2024--start
                if (currplayaudio.currentTime == currplayaudio.duration) {
                    document.querySelector(".playarea .pause").style.display = "none"
                    document.querySelector(".playarea .reset").style.display = "block"
                    document.querySelector(`.button${i} .picplayicon`).src = "picplayicon.svg"
                }

                let reset = document.querySelector('.playarea .reset')
                reset.addEventListener('click', ()=>{
                    document.querySelector(".playarea .pause").style.display = "block"
                    document.querySelector(".playarea .reset").style.display = "none"
                    document.querySelector(`.button${i} .picplayicon`).src = "picpauseicon.svg"
                    currplayaudio.currentTime = 0
                    currplayaudio.play()
                    let zx = document.querySelectorAll(`.picplaybutton .picplayicon`)
                    console.log(zx)
                    // .src.includes("picpauseicon.svg")
                    zx.forEach((element)=>{
                        if (element.src.includes("picpauseicon.svg")) {
                            element.src = "picplayicon.svg"
                            document.querySelector(`.button${currnum} .picplayicon`).src = "picpauseicon.svg"
                        }
                    })
                })
                //12 feb 2024--end
                
                })
                let progressbar = document.querySelector(".bar")
                document.querySelector(".bar").onclick = function(e) {
                    console.log(Math.floor((e.offsetX/progressbar.offsetWidth)*audios[i].duration))
                    let clickedtime = (e.offsetX/progressbar.offsetWidth)*currplayaudio.duration
                    currplayaudio.currentTime = clickedtime;
                    console.log(currplayaudio.duration)
                    console.log(currplayaudio.currentTime)
                }
                

                let hoversong = document.querySelector(`.song${i}`)
                hoversong.addEventListener("mouseover", function() {
                    document.querySelector(`.song${i} .songname`).style.backgroundColor = "#282828"
                    document.querySelector(`.song${i} .songname`).style.transition = "all 0.2s"
                    hoversong.style.backgroundColor = "#282828"
                    hoversong.style.transition = "all 0.2s"
                })
                hoversong.addEventListener("mouseout", function() {
                    document.querySelector(`.song${i} .songname`).style.backgroundColor = "#121212"
                    document.querySelector(`.song${i} .songname`).style.transition = "all 0.2s"
                    hoversong.style.backgroundColor = "#121212"
                    hoversong.style.transition = "all 0.2s"
                })

}


let playareaplaybtn = document.querySelector(".playarea .play")
let playareapausebtn = document.querySelector(".playarea .pause")
playareapausebtn.addEventListener("click", function () {
    currplayaudio.pause()
    document.querySelector(".bar .circle").style.display = "none"
    playareapausebtn.style.display = "none"
    playareaplaybtn.style.display = "block"
    playingsongicon.src = "picplayicon.svg"
})
playareaplaybtn.addEventListener("click", function () {
    currplayaudio.play()
    document.querySelector(".bar .circle").style.display = "block"
    playareaplaybtn.style.display = "none"
    playareapausebtn.style.display = "block"
    playingsongicon.src = "picpauseicon.svg"
})
console.log(document.querySelector(".songname1").innerHTML)
console.log(currplayaudio)

}

main()
