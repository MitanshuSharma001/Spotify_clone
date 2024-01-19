const fs = require('fs')
const prompt = require('prompt-sync')()

let x;
let songname;
let artistname;
let songurl;
let songpicurl;
const readfile = ()=>{
   x = JSON.parse(fs.readFileSync("songs.json"))
   return x;
}
let newpic = fs.readFileSync("nodenewsongpic.txt").toString()
const change = async()=>{
    songname = prompt("SongName:  ")
    artistname = prompt("ArtistName:  ")
    songurl = prompt("SongURL:  ")
    songpicurl = newpic

}

const main=async() =>{
        await readfile()
        await change()
        const newobj = {
            "songname": `${songname}`,
            "artistname": `${artistname}`,
            "songurl": `${songurl}`,
            "songpicurl": `${songpicurl}`
    }
    x.splice(x.length, 0, newobj)
    let updated_data = JSON.stringify(x, null, 2)
    fs.writeFileSync("songs.json", updated_data)
    console.log("..........New Song as (Object) added successfully at ${x.length}..........")
    
} 
main()