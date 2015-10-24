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
