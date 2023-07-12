const fs = require('fs');
const express = require('express');
const router  = express.Router();
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
// console.log(ffmpegInstaller.path, ffmpegInstaller.version);

router.get('/', function(req, res) {
  let range = req.headers.range;
  console.log(range)
  res.set('Content-Type', 'video/mp4');

})

module.exports = router;