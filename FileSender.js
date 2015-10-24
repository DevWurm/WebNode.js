/*
	 * License

	 * This software is distributed under MIT License

	 Copyright (c) 2015 DevWurm

	 Permission is hereby granted, free of charge, to any person obtaining a copy
	 of this software and associated documentation files (the "Software"), to deal
	 in the Software without restriction, including without limitation the rights
	 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 copies of the Software, and to permit persons to whom the Software is
	 furnished to do so, subject to the following conditions:

	 The above copyright notice and this permission notice shall be included in
	 all copies or substantial portions of the Software.

	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
		THE SOFTWARE.
*/

//module imports
var fs = require('fs'); //file system access
var ContentTypesConfigReader = new (require('./ContentTypesConfigReader.js'))(); //get configured (MIME) content types
var ServerConfigReader = new (require('./ServerConfigReader.js'))(); //configuration data

//class definition
module.exports = function (path, globalResponse) {

  //handle empty path
  if (path == "/" ) {
    if (ServerConfigReader.defaultFile != undefined) {
      path += ServerConfigReader.defaultFile;
    }
    else {
      path += "index.html";
    }
  }

  //properties
  this.path = ServerConfigReader.publicPath + path; //file path to requested file
  this.response = globalResponse; //binded response object

  //methods
  this.send = function () { //send response
    if (fs.existsSync(this.path)) { //send file as response if file exists
      this.sendFileResponse();
    }
    else { //send 404 error if file doesn't exist
      this.response.writeHead(404, {"Content-Type":"text/html"});
      this.response.end("<h1>404: File not found!</h1>");
    }
  }

  this.sendFileResponse = function () {  //send file as response
    this.response.writeHead(200, {"Content-Type":this.getContentType()}); //set response head
    fs.readFile(this.path, {encoding: 'utf-8'}, this.sendFile.bind(this)) //read given file and send afterwards
  }

  this.sendFile = function (err, data) { //send file data and end response
    if (err) {
      throw err;
    }
    else { //send file and end request
      this.response.write(data);
      this.response.end();
    }
  }

  this.getContentType = function getContentType() { //get content-type of requested file
    //get configured content-type by file ending
    var ending = this.path.split('.');
    ending = ending[ending.length-1];

    if (ContentTypesConfigReader.types[ending] != undefined) {
      return ContentTypesConfigReader.types[ending];
    }
    else { //use default if given ending isn't configured
      return ContentTypesConfigReader.types["default"];
    }
  }
}
