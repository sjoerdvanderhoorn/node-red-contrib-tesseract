var Tesseract = require('tesseract.js');
var request = require('request');
var fs = require('fs');

module.exports = function(RED)
{
	function TesseractNode(config)
	{
		RED.nodes.createNode(this, config);
		var node = this;
		node.on('input', function(msg)
		{
			// Download URL
			if (/^http(s?):\/\//.test(msg.payload))
			{
				node.status({fill: "blue", shape: "dot", text: "downloading image"});
				request({url:msg.payload, encoding: null}, function(err, res, body)
				{
					if (err)
					{
						node.error("Encountered error while downloading image file. " + err.message);
					}
					msg.payload = body;
					Recognize(msg);
				});
			}
			// Open file on local file system
			else if (typeof msg.payload == "string")
			{
				if (fs.existsSync(msg.payload))
				{
					Recognize(msg);
				}
				else
				{
					node.error("Referenced image file does not exist.");
				}
			}
			// Buffer
			else
			{
				Recognize(msg);
			}
		});
		function Recognize(msg)
		{
			// Update status - Starting
			node.status({fill: "blue", shape: "dot", text: "performing ocr"});
			// Initiate Tesseract.js
			Tesseract = new Tesseract.create(
			{
				langPath: __dirname + "/langs/"
			});
			// Perform OCR
			Tesseract.recognize(msg.payload, {lang: "eng"}).then(function(result)
			{
				msg.payload = result.text;
				msg.tesseract = 
				{
					text: result.text,
					confidence: result.confidence,
					lines: result.lines.map(l => l = 
					{
						text: l.text,
						confidence: l.confidence,
						words: l.words.map(w => w = 
						{
							text: w.text,
							confidence: w.confidence
						})
					})
				};
				node.send(msg);
				// Update status - Done
				node.status({});
			});
		}
	}
	RED.nodes.registerType("tesseract", TesseractNode);
}