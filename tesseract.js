var Tesseract = require('tesseract.js');

module.exports = function(RED)
{
	function TesseractNode(config)
	{
		RED.nodes.createNode(this,config);
		var node = this;
		node.on('input', function(msg)
		{
			// Update status - Starting
			node.status({fill:"blue",shape:"dot",text:"performing ocr"});
			// Initiate Tesseract.js
			Tesseract = new Tesseract.create(
			{
				langPath: __dirname + "/langs/"
			});
			// Perform OCR
			Tesseract.recognize(msg.payload).then(function(result)
			{
				msg.payload = result.text;
				node.send(msg);
				// Update status - Done
				node.status({});
			});
		});
	}
	RED.nodes.registerType("tesseract",TesseractNode);
}