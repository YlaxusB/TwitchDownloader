const path = require("path");
const fs = require("fs");
const { exec } = require('child_process');


/* First works but sometimes its desynced */
/* Second works the best, but timestamps may be wrong */
/* Third takes too much time to make the output, havent tested the quality */

//const command = 'ffmpeg -protocol_whitelist "file,http,https,tcp,tls,crypto" -i output.m3u8 -c copy output.mp4'; // First
const command = 'ffmpeg -fflags +genpts -protocol_whitelist "file,http,https,tcp,tls,crypto" -i output.m3u8 -c copy output.mp4'; // Second
//const command = 'ffmpeg -fflags +genpts -protocol_whitelist "file,http,https,tcp,tls,crypto" -i output.m3u8 -c:v libx264 -c:a aac output.mp4' // Third
const filesURL = "http://127.0.0.1:8080/";
const outputDir = ".";
const outputFile = outputDir + "/output.m3u8";

let m3u8Content = "";
m3u8Content += "#EXTM3U\n\n"
m3u8Content += "#EXT-X-VERSION:3\n"
m3u8Content += "#EXT-X-TARGETDURATION:6\n"
m3u8Content += "#EXT-X-MEDIA-SEQUENCE:0\n\n"
m3u8Content += "#EXT-X-PLAYLIST-TYPE:VOD\n\n"

fs.readdir("./downloads/tsFiles", (err, files)=>{
    if(err){
        console.log(err)
    } else {
        const sorted = files.sort((a, b) => {
            const aAlpha = a.match(/[a-zA-Z]+/)[0];
            const bAlpha = b.match(/[a-zA-Z]+/)[0];
            const aNum = parseInt(a.match(/\d+/)[0]);
            const bNum = parseInt(b.match(/\d+/)[0]);
          
            if (aAlpha < bAlpha) return -1;
            if (aAlpha > bAlpha) return 1;
            if (aNum < bNum) return -1;
            if (aNum > bNum) return 1;
            return 0;
        });
        files = sorted;

        let sequence = 0;
        files.forEach(file => {
            console.log(fs.statSync("./downloads/tsFiles/" + file).size);
            if(fs.statSync("./downloads/tsFiles/" + file).size / (1024) > 500){
                m3u8Content += `#EXTINF:-1.000,live\n${filesURL}${file}\n`
                sequence++;
            }
        });

        m3u8Content += "#EXT-X-ENDLIST";
        fs.writeFileSync(outputFile, m3u8Content);
    }
})
//ffmpeg -protocol_whitelist "file,http,https,tcp,tls,crypto" -i output.m3u8 -c copy output.mp4

exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`ffmpeg stderr: ${stderr}`);
      return;
    }
    console.log(`ffmpeg stdout: ${stdout}`);
  });