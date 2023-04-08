import nunjucks from "nunjucks";
export function Image() {
  this.tags = ["Image"];
  this.parse = function (parser, nodes) {
    var tok = parser.nextToken();

    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    return new nodes.CallExtension(this, "run", args);
  };
  this.run = function (context, url, alt) {
    const image = new nunjucks.runtime.SafeString(
      `<picture><img src="${url}" alt="${alt}" /></picture>`
    );
    return image;
  };
}
