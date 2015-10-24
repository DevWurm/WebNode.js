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
  if (fs.existsSync(__dirname + "/config/content-types-config.json")) { //check if content-types config file is existing

    fs.readFile(__dirname + "/config/content-types-config.json", //read config file

    //callback:
    function (err, data) {
      if (err) {
        throw err;
      }

      else {
        data = JSON.parse(data); //parse config file (JSON)

        if (data.types != undefined) { //check if types property is set

          if(data.types["default"] != undefined) { //set default value for default type
            data.types["default"] = "text/plain";
          }

          this.types = data.types; //export content-types
        }
        else { //export default value for default type if no types are defined
          this.types = {default: "text/plain"};
        }

      }

    }.bind(this));
  }
  else { //export default if no config file is existing
    this.types = {default: "text/plain"};
  }
}
