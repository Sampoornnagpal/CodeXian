const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = 'public/libs';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const file = fs.createWriteStream(path.join(dir, 'kicanvas.js'));
const url = "https://unpkg.com/kicanvas@0.4.3/kicanvas.js?module";

https.get(url, function(response) {
  if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
      // Handle redirect
      https.get(response.headers.location, function(res) {
          res.pipe(file);
          console.log("Downloaded kicanvas.js");
      });
  } else {
      response.pipe(file);
      console.log("Downloaded kicanvas.js");
  }
});
