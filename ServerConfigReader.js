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
var fs = require("fs"); //file system access

module.exports = function () {
  if (fs.existsSync(__dirname + "/config/server-config.json")) { //check if config file is existing
    var data = fs.readFileSync(__dirname + "/config/server-config.json", {"encoding":"utf-8"}); //read config file; sync. reading is important
                                                                                                //because data need to be exported immediately

    if (data != undefined) {
      data = JSON.parse(data); //parse data
      var keys = Object.getOwnPropertyNames(data); //get data keys

      for (var i = 0; i <= keys.length-1; i++) { //move data into current object
        this[keys[i]] = data[keys[i]];
      }
    }
    else {
      throw new Error("Error while reading config File");
    }
  }
  else { //set default values if config file is missing
    this.serverPort = 80;
    this.serverHost = "localhost";
    this.publicPath = __dirname + "/public/";
  }
}
