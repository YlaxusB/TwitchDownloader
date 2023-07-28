# TwitchDownloader

# How to use:

Change Livestream URL:  
    Change the url on the index.js of twitchPuppeteer  

Download:  
    Start the upload server with: node index.js  
    Start the Puppeteer with: node index.js  

Merge .ts Files into a MP4:  
    Run in the cmd: node tsToM3u8.js
    Start a http server inside the uploadServer->downloads->tsFiles with: http-server   
    Merge the tsFiles with: ffmpeg -protocol_whitelist "file,http,https,tcp,tls,crypto" -i output.m3u8 -c copy output.mp4  
