# Tesseract
Tesseract.js is a pure Javascript port of the popular Tesseract OCR engine. It performs all OCR tasks locally without requiring a connection to any external service.

Tesseract was originally developed at Hewlett-Packard Laboratories Bristol and at Hewlett-Packard Co, Greeley Colorado between 1985 and 1994, with some more changes made in 1996 to port to Windows, and some C++izing in 1998. In 2005 Tesseract was open sourced by HP. Since 2006 it is developed by Google.

![Tesseract flow](https://github.com/sjoerdvanderhoorn/node-red-contrib-tesseract/raw/master/tesseract-flow.png)

This [Node-RED implementation of Tesseract.js](https://github.com/sjoerdvanderhoorn/node-red-contrib-tesseract) has been provided by Sjoerd van der Hoorn.

# Settings

* Language - Code ([List of available language codes](https://github.com/naptha/tesseract.js/blob/master/docs/tesseract_lang_list.md)).

# Input

* `msg.payload` - Local filename, URL, or image buffer.

# Output
* `msg.payload` - String with recognized text.
* `msg.tesseract` - Object with recognized text split out per line and word, plus confidence information.

```js
{
	text: "Text from image\nSecond line",
	confidence: 87,
	lines: 
	[
		{
			text: "Text from image",
			confidence: 93,
			words:
			[
				{
					text: "Text",
					confidence: 97
				},
				{
					...
				}
			]
		},
		{
			...
		}
	]
}
```

# Additional information
* [node-red-contrib-tesseract GitHub](https://github.com/sjoerdvanderhoorn/node-red-contrib-tesseract)
* [Tesseract.js GitHub](https://github.com/naptha/tesseract.js)
* [Tesseract demo](http://tesseract.projectnaptha.com/)
* [Original Tesseract OCR engine](https://github.com/tesseract-ocr/tesseract)
* [Language files](https://github.com/naptha/tessdata/tree/gh-pages/3.02)
