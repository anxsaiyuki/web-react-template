var React = require("react/addons"),
    L20nMixins=require("../mixins/L20nMixins");


require("../css/textbox.css");

module.exports = React.createClass({
  var myEditor,
  componentDidMount: function() {
        var that = this;
        myEditor = new YAHOO.widget.Editor('msgpost', {
                height: '300px',
                width: '100%',
                dompath: true, //Turns on the bar at the bottom
                animate: true //Animates the opening, closing and moving of Editor windows
        });
        myEditor.render();  
      
        $(this.props.class).click(function() {
          myEditor.saveHTML();
          var html = myEditor.get('element').value;
          console.log(html);
          that.props.onClick(html);
        });
  },
  render: function() {
    return (
        <div className="yui-skin-sam col-xs-12">
            <textarea name="msgpost" id="msgpost" cols="50" rows="10">
                
            </textarea>
        </div>
    );
  }
});      