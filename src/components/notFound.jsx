var React = require("react/addons"),
    L20nMixins=require("../mixins/L20nMixins");

module.exports = React.createClass({
  displayname:"notFound",
  mixins: [L20nMixins],  
  render: function() {
    return (
        <div>
                Not Exist
        </div>
    );
  }
});