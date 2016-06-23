var React = require("react/addons"),
    CommonRequire = require("./components/commonRequire.jsx");
    

require("./css/common.css");
require("./css/createContent.css");

var TopBarChunck=require("bundle?lazy!./components/topBar.jsx");
var MenuChunck=require("bundle?lazy!./components/menu.jsx");
var FooterChunck=require("bundle?lazy!./components/footer.jsx");
var ADChunck=require("bundle?lazy!./components/ads.jsx");
var TextBoxChunk=require("./components/textbox.jsx")
var apiConfig=require("./config/apiConfig.js");

document.l10n.ready(function(){
        

    
    TopBarChunck(function(TopBar) {
        React.render(<TopBar l20n={document.l10n}/>, document.getElementById('top_bar'));
    });

    MenuChunck(function(Menu) {
        React.render(<Menu l20n={document.l10n}/>, document.getElementById('menu'));
    });

    FooterChunck(function(Footer) {
        React.render(<Footer l20n={document.l10n}/>, document.getElementById('footer'));
    });
        
    ADChunck(function(Ad) {
        React.render(<Ad l20n={document.l10n}/>, document.getElementById('ad')); 
    });

 
        
    var Application = React.createClass({
      mixins: [CommonRequire.L20nMixins],
      getInitialState: function() {
              return {

              };
      },
      componentWillMount: function() {

      },
      componentDidMount: function() {
          var that = this;

          
//          $(".create-thread").click(function() {
//              myEditor.saveHTML();
//              var html = myEditor.get('element').value;
//              console.log(html);
//              that.createThread(html);
//          });
          

      },
      createThread: function(html) {
          var that = this;
          var url = this.props.createNewThread + "?access_token=" + CommonRequire.Cookie.load("auth");
          
                var parameters = JSON.stringify({
                    userId:CommonRequire.Cookie.load("userId"),
                    sfId:"1",
                    tName:$(".thread-content").val(),
                    content:html
                });
          
          CommonRequire.ApiConnectionMixins.postApi(url,parameters,function(data) {
              alert("created");
          });
      },
      render: function() {
        return (
        <div>
            
            <div className="thread-create-container col-xs-12">
                <div className="row row-content">
                    <div className="thread-create-title col-xs-12">Create Thread</div>
                </div>
                <div className="row row-content">
                    <div className="thread-create-subtitle col-xs-12">Thread Name:</div>
                </div>
                <div className="row row-content">
                    <input type="text" className="thread-content form-control-new col-xs-10 col-xs-offset-1"/>
                </div>
                <div className="row row-content">
                    <div className="thread-post-subtitle col-xs-12">Post:</div>
                </div>
                <div className="row row-content">
                    <TextBoxChunk onClick={this.createThread} class=".create-thread"/>
                </div>
                <div className="row row-content">
                    <button className="create-thread btn btn-primary col-xs-6 col-xs-offset-3 col-md-4 col-md-offset-4">Create</button>
                </div>
            </div>
        </div>);
      
      }
    });

    React.render(<Application l20n = {document.l10n}
                 getPostUrl = "http://localhost:3000/api/Posts/get"
                 createNewThread = "http://localhost:3000/api/Threads/createNew"
                 />, document.getElementById('content'));

  });