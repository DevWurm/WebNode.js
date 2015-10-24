# WebNode.js
Basic, hackable/extendible, configurable Node.js Webserver.<br>
With WebNode.js you can set up a webserver, delivering files on request, easily.<br>
You can configure and run the server completely without programming.<br>
Because of the configuration infrastructure its easy for developers to extend the
server with their own
modules and additions.

##modules
WebNode.js uses the Node.js core modules <code>fs</code> and <code>http</code>, as well
as the local modules <code>FileSender.js</code>, <code>ServerConfigReader.js</code> and
<code>ContentTypesConfigReader.js</code>.

##Running the server
###Configure the server
Before starting the server you have to configure it. The config files of the server are
located in the subfolder 'config'. By default WebNode.js uses the two config files
<code>server-config.json</code> and <code>content-types-config.json</code>.<br>
Two example files are included in the repository.

###Starting the server
For starting the server run the <code>Node.js</code> command on the <code>Server.js</code>
with system administrator privilege.<br>
On Linux run:
<pre><code>
sudo node ./Server.js
</code></pre>
After that the server is reachable under the configured IP address and port (or localhost:80). The path behind the
host in the request will specify the path relative to the configured publicPath (or ./public/). If no path
is given the configured defaultFile (or index.html) is returned.<br>
If the file ending of the requested file is configured with a MIME content-type in the
<code>content-types-config.json</code> file, the correct content-type is set in the response. Otherwise the
configured default (or text/plain) is used.

##Access
You can access the current (developement) source on <a href="https://github.com/DevWurm/WebNode.js/">GitHub</a>. The
current stable version is provided in the latest <a href="https://github.com/DevWurm/WebNode.js/releases">GitHub Release</a>.

##Documentation
There is no documentation yet. (Email me if you have any questions)

##License
Copyright 2015 DevWurm<br>
'WebNode.js' is offered under MIT License (Read LICENSE)

##Authors
DevWurm<br>
Email: <a href='mailto:devwurm@gmx.net'>devwurm@gmx.net</a><br>
Feel free to contact me, if you have any questions or ideas about the project :)

##Collaborating
You can use the GitHub issue tracker for bugs and feature requests or create a pull request to submit
changes and forks are welcome, too.
If you don't want to use these possibilities, you can also write me an email at
<a href='mailto:devwurm@gmx.net'>devwurm@gmx.net</a>.
