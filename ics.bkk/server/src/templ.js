var TEMPL = {};

TEMPL.EMAIL_TO = [];
TEMPL.PARAMS = {};
TEMPL.SUBJECT = "";
TEMPL.ID = "";
TEMPL.log = "";
TEMPL.on_subject = false;


TEMPL.escapeHTML = str => str.replace(/[&<>'"]/g, 
  tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag]));

TEMPL.transParam = function(text){
  Logger.log(text);
  let params = this.PARAMS;
  let content = text;
  
  for (before in params) {
     after = params[before];
     let expr = RegExp('<<' + before + '>>','g');
     content = content.replace(expr,after);
  };
  //content = this.escapeHTML(content);
  return content;
}

TEMPL.ConvertGoogleDocToCleanHtml = function() {
  var document = DocumentApp.openById(this.ID);
  var body = document.getBody();
  var numChildren = body.getNumChildren();
  var output = [];
  var images = [];
  var listCounters = {};

  this.on_subject = true;
  // Walk through all the child elements of the body.
  for (var i = 0; i < numChildren; i++) {
    var child = body.getChild(i);
    output.push(this.processItem(child, listCounters, images));
  }
  MailApp.sendEmail({
    to : "lourenzoisthebest@gmail.com",
    subject: "debug convert",
    body : this.log
  });
  //var html = output.join('\r');
  //this.emailHtml(html, images);
  //createDocumentForHtml(html, images);
}

TEMPL.emailHtml = function(html, images) {
  var attachments = [];
  for (var j=0; j<images.length; j++) {
    attachments.push( {
      "fileName": images[j].name,
      "mimeType": images[j].type,
      "content": images[j].blob.getBytes() } );
  }

  var inlineImages = {};
  for (var j=0; j<images.length; j++) {
    inlineImages[[images[j].name]] = images[j].blob;
  }

  var name = DocumentApp.getActiveDocument().getName()+".html";
  attachments.push({"fileName":name, "mimeType": "text/html", "content": html});
  MailApp.sendEmail({
     to: this.EMAIL_TO.join(","),
     subject: name,
     htmlBody: html,
     inlineImages: processIteminlineImages,
     attachments: attachments
   });
}

TEMPL.createDocumentForHtml= function(html, images) {
  var name = DocumentApp.getActiveDocument().getName()+".html";
  var newDoc = DocumentApp.create(name);
  newDoc.getBody().setText(html);
  for(var j=0; j < images.length; j++)
    newDoc.getBody().appendImage(images[j].blob);
  newDoc.saveAndClose();
}

TEMPL.dumpAttributes = function(atts) {
  // Log the paragraph attributes.
  for (var att in atts) {
    Logger.log(att + ":" + atts[att]);
  }
}

TEMPL.processItem = function(item, listCounters, images) {
  var output = [];
  var prefix = "", suffix = "";
  this.log = this.log + item.getType() + "\n"; 
  
  let item_type=item.getType();
  let ELEMENT_TYPE = DocumentApp.ElementType;
  // PARSE SUBJECT 
  if (this.on_subject){
    if (item_type==ELEMENT_TYPE.TEXT){
      let subject = [];
      this.processText(item, subject);
      this.SUBJECT = subject.join(" ");
      return output;
    } else  if (item_type == ELEMENT_TYPE.HORIZONTAL_RULE){
      this.one_subject = false;
    }
  }
  
  if (item_type == DocumentApp.ElementType.PARAGRAPH) {
    switch (item.getHeading()) {
        // Add a # for each heading level. No break, so we accumulate the right number.
      case DocumentApp.ParagraphHeading.HEADING6: 
        prefix = "<h6>", suffix = "</h6>"; break;
      case DocumentApp.ParagraphHeading.HEADING5: 
        prefix = "<h5>", suffix = "</h5>"; break;
      case DocumentApp.ParagraphHeading.HEADING4:
        prefix = "<h4>", suffix = "</h4>"; break;
      case DocumentApp.ParagraphHeading.HEADING3:
        prefix = "<h3>", suffix = "</h3>"; break;
      case DocumentApp.ParagraphHeading.HEADING2:
        prefix = "<h2>", suffix = "</h2>"; break;
      case DocumentApp.ParagraphHeading.HEADING1:
        prefix = "<h1>", suffix = "</h1>"; break;
      default: 
        prefix = "<p>", suffix = "</p>";
    }

    if (item.getNumChildren() == 0)
      return "";
  }
  else if (item_type == DocumentApp.ElementType.INLINE_IMAGE)
  {
    this.processImage(item, images, output);
  }
  else if (item_type===DocumentApp.ElementType.LIST_ITEM) {
    var listItem = item;
    var gt = listItem.getGlyphType();
    var key = listItem.getListId() + '.' + listItem.getNestingLevel();
    var counter = listCounters[key] || 0;

    // First list item
    if ( counter == 0 ) {
      // Bullet list (<ul>):
      if (gt === DocumentApp.GlyphType.BULLET
          || gt === DocumentApp.GlyphType.HOLLOW_BULLET
          || gt === DocumentApp.GlyphType.SQUARE_BULLET) {
        prefix = '<ul class="small"><li>', suffix = "</li>";

          suffix += "</ul>";
        }
      else {
        // Ordered list (<ol>):
        prefix = "<ol><li>", suffix = "</li>";
      }
    }
    else {
      prefix = "<li>";
      suffix = "</li>";
    }

    if (item.isAtDocumentEnd() || item.getNextSibling().getType() != DocumentApp.ElementType.LIST_ITEM) {
      if (gt === DocumentApp.GlyphType.BULLET
          || gt === DocumentApp.GlyphType.HOLLOW_BULLET
          || gt === DocumentApp.GlyphType.SQUARE_BULLET) {
        suffix += "</ul>";
      }
    
      else {
        // Ordered list (<ol>):
        suffix += "</ol>";
      }

    }

    counter++;
    listCounters[key] = counter;
  }

  output.push(prefix);

  if (item_type == DocumentApp.ElementType.TEXT) {
    this.processText(item, output);
  }
  else {
    if (item.getNumChildren) {
      var numChildren = item.getNumChildren();

      // Walk through all the child elements of the doc.
      for (var i = 0; i < numChildren; i++) {
        var child = item.getChild(i);
        output.push(this.processItem(child, listCounters, images));
      }
    }

  }

  output.push(suffix);
  return output.join('');
}

TEMPL.processText = function(item, output) {
  var text = item.getText();
  var indices = item.getTextAttributeIndices();
  text = this.transParam(text);
  
  
  if (indices.length <= 1) {
    // Assuming that a whole para fully italic is a quote
    if(item.isBold()) {
      output.push('<b>' + text + '</b>');
    }
    else if(item.isItalic()) {
      output.push('<blockquote>' + text + '</blockquote>');
    }
    else if (text.trim().indexOf('http://') == 0) {
      output.push('<a href="' + text + '" rel="nofollow">' + text + '</a>');
    }
    else {
      output.push(text);
    }
  }
  else {

    for (var i=0; i < indices.length; i ++) {
      var partAtts = item.getAttributes(indices[i]);
      var startPos = indices[i];
      var endPos = i+1 < indices.length ? indices[i+1]: text.length;
      var partText = text.substring(startPos, endPos);
      

      //Logger.log(partText);

      if (partAtts.ITALIC) {
        output.push('<i>');
      }
      if (partAtts.BOLD) {
        output.push('<b>');
      }
      if (partAtts.UNDERLINE) {
        output.push('<u>');
      }

      // If someone has written [xxx] and made this whole text some special font, like superscript
      // then treat it as a reference and make it superscript.
      // Unfortunately in Google Docs, there's no way to detect superscript
      if (partText.indexOf('[')==0 && partText[partText.length-1] == ']') {
        output.push('<sup>' + partText + '</sup>');
      }
      else if (partText.trim().indexOf('http://') == 0) {
        output.push('<a href="' + partText + '" rel="nofollow">' + partText + '</a>');
      }
      else {
        output.push(partText);
      }

      if (partAtts.ITALIC) {
        output.push('</i>');
      }
      if (partAtts.BOLD) {
        output.push('</b>');
      }
      if (partAtts.UNDERLINE) {
        output.push('</u>');
      }

    }
  }
}


TEMPL.processImage = function(item, images, output)
{
  images = images || [];
  var blob = item.getBlob();
  var contentType = blob.getContentType();
  var extension = "";
  if (/\/png$/.test(contentType)) {
    extension = ".png";
  } else if (/\/gif$/.test(contentType)) {
    extension = ".gif";
  } else if (/\/jpe?g$/.test(contentType)) {
    extension = ".jpg";
  } else {
    throw "Unsupported image type: "+contentType;
  }
  var imagePrefix = "Image_";
  var imageCounter = images.length;
  var name = imagePrefix + imageCounter + extension;
  imageCounter++;
  output.push('<img src="cid:'+name+'" />');
  images.push( {
    "blob": blob,
    "type": contentType,
    "name": name});
}