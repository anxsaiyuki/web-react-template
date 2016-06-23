var React = require("react/addons"),
    L20nMixins=require("../mixins/L20nMixins");

require("../css/footer.css");

module.exports = React.createClass({
  displayname:"footer",
  mixins: [L20nMixins],
  render: function() {
    return (
        <div className="footer-content">
        {this.l20nt("Footer")}
        </div> 
    );
  }
});      