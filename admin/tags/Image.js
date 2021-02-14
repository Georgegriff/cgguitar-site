function Image() {
    this.tags = ['Image'];
    this.parse = function(parser, nodes) {
    var tok = parser.nextToken();

    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    return new nodes.CallExtension(this, "run", args);
    };
    this.run = function(context, url, alt) {
       const image = new window.nunjucks.runtime.SafeString(`<picture><img src="${url}" alt="${alt}" /></picture>`);
       return image;
    };
}

// handling custom Tag

window.env.addExtension('Image', new Image());