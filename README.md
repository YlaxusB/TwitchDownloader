# TwitchDownloader

# How to use:

Download: \n
    Start the upload server with: node index.js \n
    Start the Puppeteer with: node index.js \n

Merge .ts Files into a MP4: \n
    Start a http server inside the uploadServer->downloads->tsFiles with: http-server \n
    Merge the tsFiles with: ffmpeg -protocol_whitelist "file,http,https,tcp,tls,crypto" -i output.m3u8 -c copy output.mp4
