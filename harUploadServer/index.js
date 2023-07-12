const express = require("express");
const bodyParser = require("body-parser");
const M3U8FileParser = require("m3u8-file-parser");
const fs = require("fs");
const readline = require("readline");
const { writeFile } = require("fs");
const { promisify } = require("util");
const writeFilePromise = promisify(writeFile);
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));


let dateTimes = [];

const https = require("https");

// Define a route to handle the POST request
let i = 0;
let j = 0;
let previousUrl;
app.post("/upload", (req, res) => {
  // Parse the JSON data from the request body
  const data = req.body.data;

  // Process the data as needed
  console.log("Received data:", data);
  if (data) {
    data.log.entries.forEach(async (element) => {
      //console.log(element.request.url);
      const url = element.request.url;
      console.log(url)
      if (url.endsWith(".m3u8")) {
        console.log("download");
        downloadFile3(url, "./downloads/file" + i + ".m3u8", (err, success) => {
          if (err) {
            console.error("Error downloading file:", err);
          } else {
            console.log("File downloaded successfully!");
            // Call your function here
            if (fs.existsSync("./downloads/file" + i + ".m3u8")) {
              const readStream = fs.createReadStream("./downloads/file" + i + ".m3u8", { encoding: "utf8" });

              readStream.on("data", function (chunk) {
                const lines = chunk.split("\n");

                let urlIndex = 0;
                lines.forEach(function (line) {
                  if (line.startsWith("https://video-")) {
                    if(!dateTimes.includes(lines[lines.indexOf(line) + 1])){
                      if(urlIndex != 0){
                        downloadFile(line, "./downloads/tsFiles/file" + j + ".ts");
                        dateTimes.push(lines[lines.indexOf(line) + 1])
                      }

                      urlIndex++;
                      j++;
                    }



                  }
                });
              });
            }

            i++;
          }
        });
        downloadFile(url, "./downloads/file" + i + ".m3u8");
        console.log("downloaded");

        console.log("reading");
      }
    });
  }

  // Send a response indicating that the data was received
  res.status(200).send("Data received successfully!");
});

// Start the server
app.listen(9000, () => {
  console.log("Server started on port 9000");
});

function downloadFile(url, outputPath) {
  return fetch(url)
    .then((x) => x.arrayBuffer())
    .then((x) => writeFilePromise(outputPath, Buffer.from(x)));
}

const downloadFile2 = (url, path, callback) => {
  fetch(url)
    .then((res) => {
      const dest = fs.createWriteStream(path);
      res.body.pipe(dest);
      dest.on("finish", () => {
        dest.close();
        callback(null);
      });
    })
    .catch((err) => {
      callback(err);
    });
};

const downloadFile3 = (url, path, callback) => {
  const file = fs.createWriteStream(path);
  https
    .get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close(() => {
          callback(null, true);
        });
      });
    })
    .on("error", (err) => {
      fs.unlink(path, () => {
        callback(err);
      });
    });
};
