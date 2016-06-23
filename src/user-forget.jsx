var React = require("react/addons"),
    CommonRequire = require("./components/commonRequire.jsx");
    

require("./css/common.css");
require("./css/userForgetContent.css");

var TopBarChunck=require("bundle?lazy!./components/topBar.jsx");
var MenuChunck=require("bundle?lazy!./components/menu.jsx");
var FooterChunck=require("bundle?lazy!./components/footer.jsx");
var ADChunck=require("bundle?lazy!./components/ads.jsx");
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
          
      },
      render: function() {
        return (
        <div>
            <div className="register-container col-xs-12">
                <div className="row row-content">
                    <div className="register-title col-xs-12">{this.l20nt("ForgetTitle")}</div>
                </div>
                <div class="radio">
                  <label><input type="radio" name="optradio"/>I forgot my username</label>
                </div>
                <div class="radio">
                  <label><input type="radio" name="optradio"/>I forgot my password</label>
                </div>
                <div className="row row-content">
                    <button className="register-btn col-xs-6 col-xs-offset-3 col-md-4 col-md-offset-4" onClick={this.register}>{this.l20nt("SignUp")}</button>
                </div>

            </div>
        </div>);
      }
    });

    React.render(<Application l20n = {document.l10n}/>, document.getElementById('content'));

  });