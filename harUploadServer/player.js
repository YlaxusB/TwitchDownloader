const currentVideo = document.getElementById('currentVideo');
const nextVideo = document.getElementById('nextVideo');

const currentSource = document.getElementById('currentSource');
const nextSource = document.getElementById('nextSource');

let nextVideoIndex = 1;

currentSource.src =   "http://127.0.0.1:8080/output.m3u8";