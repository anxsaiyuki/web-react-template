var React = require("react/addons"),
    L20nMixins=require("../mixins/L20nMixins");


require("../css/menu.css");

module.exports = React.createClass({
  displayname:"menu",
  mixins: [L20nMixins],
  render: function() {
    return (
    <div>
        <div className="menu-content col-md-12">
            <ul className="menu-list">
                <a href="register.html"><li>{this.l20nt("Register")}</li></a>
                <a href="#"><li>{this.l20nt("FAQ")}</li></a>
                <a href="#"><li>{this.l20nt("Calender")}</li></a>
            </ul>
        </div>
    </div>);
  }
});      