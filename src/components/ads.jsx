var React = require("react/addons"),
    L20nMixins=require("../mixins/L20nMixins");

require("../css/ads.css");

module.exports = React.createClass({
  displayname:"ads",
  mixins: [L20nMixins],  
  render: function() {
    return (
        <div className="row">
            <div className="ad-box col-xs-12">
                Ads
            </div>
        </div>
    );
  }
});