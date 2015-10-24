/*
	 * License

	 * Copyright 2015 DevWurm

	 * This file is part of WebNode.js.

	 *  WebNode.js is free software: you can redistribute it and/or modify
	    it under the terms of the GNU General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.

      WebNode.js is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU General Public License for more details.

	    You should have received a copy of the GNU General Public License
	    along with WebNode.js.  If not, see <http://www.gnu.org/licenses/>.

	    Diese Datei ist Teil von WebNode.js.

      WebNode.js ist Freie Software: Sie können es unter den Bedingungen
	    der GNU General Public License, wie von der Free Software Foundation,
	    Version 3 der Lizenz oder (nach Ihrer Wahl) jeder späteren
	    veröffentlichten Version, weiterverbreiten und/oder modifizieren.

      WebNode.js wird in der Hoffnung, dass es nützlich sein wird, aber
	    OHNE JEDE GEWÄHRLEISTUNG, bereitgestellt; sogar ohne die implizite
	    Gewährleistung der MARKTFÄHIGKEIT oder EIGNUNG FÜR EINEN BESTIMMTEN ZWECK.
	    Siehe die GNU General Public License für weitere Details.

	    Sie sollten eine Kopie der GNU General Public License zusammen mit diesem
	    Programm erhalten haben. Wenn nicht, siehe <http://www.gnu.org/licenses/>.
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
