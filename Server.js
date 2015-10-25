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
var http = require('http'); //http socket
var https = require('https'); //https socket
var FileDeliverer = require('./FileDeliverer.js'); //filesender class
var ServerConfigReader = new (require('./ServerConfigReader.js'))();

//creating http server
if (ServerConfigReader.httpEnabled) {
	var server = http.createServer((new FileDeliverer).deliver); //set reaction function
	server.listen(ServerConfigReader.httpPort, ServerConfigReader.serverHost); //bind server
}


//creating https server
if (ServerConfigReader.httpsEnabled) {
	var certificateOptions = {
	  key: fs.readFileSync(ServerConfigReader.httpsPrivateKeyPath),
	  cert: fs.readFileSync(ServerConfigReader.httpsCertificatePath)
	};

	var HTTPSServer = https.createServer(certificateOptions, (new FileDeliverer).deliver); //set reaction function
	HTTPSServer.listen(ServerConfigReader.httpsPort, ServerConfigReader.serverHost); //bind server
}
