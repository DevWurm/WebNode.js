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
var http = require('http'); //http socket
var FileDeliverer = require('./FileDeliverer.js'); //filesender class
var ServerConfigReader = new (require('./ServerConfigReader.js'))();

//creating server
var server = http.createServer((new FileDeliverer).deliver); //set reaction function
server.listen(ServerConfigReader.serverPort, ServerConfigReader.serverHost); //bind server
