const path = require("path");
const fs = require("fs");

const { spawn, exec } = require("child_process");

const directory = "./downloads/tsFiles";
const outputDir = "./";
const outputFile = "./output.mp4";

let videoStitch = require("video-stitch");

let videoConcat = videoStitch.concat;

//const Exec = require("exec")

var fluent_ffmpeg = require("fluent-ffmpeg");

const inputs = [];
const fullPath = path.join(__dirname, "./downloads/tsFiles");
console.log(fullPath);
fs.readdir(fullPath, (error, files) => {
  const clips = [];
  console.log("reading");
  if (error) console.log(error);
  files.forEach((file, index) => {
    clips.push(file);
  });

  var mergedVideo = fluent_ffmpeg();

  clips.forEach(function (videoName) {
    console.log(__dirname + "/downloads/tsFiles/" + videoName);
    mergedVideo = mergedVideo.addInput(__dirname + "/downloads/tsFiles/" + videoName);
  });

  mergedVideo = mergedVideo.addInput("./all_videos.txt");

  mergedVideo
    //.input("./all_videos.txt")
    .mergeToFile("./mergedVideo.mp4", "./tmp/")
    .complexFilter([
      "[0:v]scale=400:300[0scaled]",
      "[1:v]scale=400:300[1scaled]",
      "[0scaled]pad=800:300[0padded]",
      "[0padded][1scaled]overlay=shortest=1:x=400[output]" ///////// here
    ])
    .on("error", function (err) {
      console.log("Error " + err.message);
    })
    .on("end", function () {
      console.log("Finished!");
    });

  //   // List of input videos to merge
  //   console.log(__dirname); //[path.join(__dirname, "/file1.mp4"), path.join(__dirname, "/file2.mp4"), path.join(__dirname, "/file3.mp4")];
  //   console.log(inputs);

  //   // Get the directory name of the first input file
  //   const inputDirname = path.dirname(inputs[0]);

  //   // Build the output file path
  //   const outputPath = path.join(inputDirname, outputFile);
  //   console.log(outputPath);

  //   // Output file name
  //   const output = "output.mp4";
});

const concatVideos = (outputFile, inputs) => {
  // FFmpeg command to merge videos
  const ffmpegCommand = `C:/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe -i  "concat:${inputs.join("|")}" -c copy ${outputFile}`;

  // Spawn a new FFmpeg process
  const ffmpegProcess = spawn(ffmpegCommand, { shell: true });

  // Log FFmpeg output to console
  ffmpegProcess.stderr.on("data", (data) => {
    console.error(`FFmpeg output: ${data}`);
  });

  // Handle FFmpeg process exit
  ffmpegProcess.on("close", (code) => {
    if (code === 0) {
      console.log("Videos merged successfully!");
    } else {
    }
  });
};
