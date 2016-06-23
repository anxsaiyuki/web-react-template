var React = require("react/addons"),
    CommonRequire = require("./components/commonRequire.jsx");
    

require("./css/common.css");
require("./css/registerContent.css");

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
                userCheck:"0"
              };
      },
      componentWillMount: function() {
          
      },
      componentDidMount: function() {
          $(".user-inputR").blur(function() {
                 
          });
      },
      userVerify: function() {
          var that = this;
         //$(".buttonMessage").addClass("off");
         // $(".loading").removeClass("off");
          var userInput = $(".user-inputR");
          var userInputValue = userInput.val();
          var url = this.props.postCheckUserUrl;
            var parameters = JSON.stringify({
                username:userInputValue
            });
          CommonRequire.ApiConnectionMixins.postApi(url,parameters,function(data) {
              userInput.removeClass("input-correct");
              userInput.removeClass("input-error");
              if (data.data == 1) {
                  that.setState({userCheck:"1"});
                  userInput.addClass("input-correct");
              } 
              else {
                  that.setState({userCheck:"0"});
                  userInput.addClass("input-error");
              }
                //$(".buttonMessage").removeClass("off");
                //$(".loading").addClass("off");
          });
          
      },
      emailVerify: function() {
          var verify = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
          var emailInput = $(".email-inputR");
          console.log(verify.test(emailInput.val()));
          if (emailInput.val() == "") {
              emailInput.removeClass("input-error");
              emailInput.removeClass("input-correct");
          }
          else {
              if (verify.test(emailInput.val())) {
                  if (emailInput.hasClass("input-error")) {
                      emailInput.removeClass("input-error");
                  }
                  emailInput.addClass("input-correct");
              }
              else {
                  emailInput.addClass("input-error");
              }
          }
      },
      passwordVerify: function() {
          var passwordInput = $(".password-inputR");
          if (passwordInput.val() != "") {
              passwordInput.addClass("input-correct");
          }
      },
      retypePasswordVerify: function() {
          var passwordInput = $(".password-inputR");
          var retypePasswordInput = $(".retype-password-inputR");
          if (retypePasswordInput.val() == passwordInput.val()) {
              retypePasswordInput.addClass("input-correct");
          }
          else {
              retypePasswordInput.addClass("input-error");
          }
      },
      register: function() {
          var that = this;
          var inputArray = [$(".user-inputR"),$(".email-inputR"),$(".password-inputR"),$(".retype-password-inputR")];
          var error = 0;
          for (i = 0; i < inputArray.length; i++) {
              if (inputArray[i].val() == "") {
                  inputArray[i].addClass("input-error");
                  error = 1;
              }
          }
          
          if (error == 0 && this.state.userCheck == 1) {
              var url = this.props.postRegisterUrl
              var rUser = $(".user-inputR").val();
              var rEmail = $(".email-inputR").val();
              var rPassword = $(".password-inputR").val();
                
                var parameters = JSON.stringify({
                    username:rUser,
                    email:rEmail,
                    password:rPassword
                });
                
              CommonRequire.ApiConnectionMixins.postApi(url, parameters, function(data) {
                  console.log(data);
                  alert("Register Successful");
              });
          }
          
      },
      render: function() {
        return (
        <div>
            <div className="register-container col-xs-12">
                <div className="row row-content">
                    <div className="register-title col-xs-12">{this.l20nt("RegisterTitle")}</div>
                </div>
                <div className="row row-content">
                    <div className="col-md-12">
                    <div className="user-group col-xs-12 col-md-4 col-md-offset-2">
                        <div className="row">
                            <input type="text" className="user-inputR col-xs-10 form-control-new" placeholder={this.l20nt("UserName")}/>
                            <button className="btn btn-primary col-xs-2" type="button" onClick={this.userVerify}>Check</button>
                        </div>
                    </div>
                    <input type="email" className="email-inputR col-xs-12 col-md-4 col-md form-control-new" onChange={this.emailVerify} placeholder={this.l20nt("Email")}/>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-md-12">
                    <input type="password" className="password-inputR col-xs-12 col col-md-4 col-md-offset-2 form-control-new" onChange={this.passwordVerify} placeholder={this.l20nt("Password")} />
                    <input type="password" className="retype-password-inputR col-xs-12 col col-md-4 form-control-new" onChange={this.retypePasswordVerify} placeholder={this.l20nt("RetypePassword")} />
                    </div>
                </div>
                <div className="row row-content">
                    <button className="register-btn col-xs-6 col-xs-offset-3 col-md-4 col-md-offset-4" onClick={this.register}>{this.l20nt("SignUp")}</button>
                </div>

            </div>
        </div>);
      }
    });

    React.render(<Application l20n = {document.l10n}
                 postRegisterUrl = "http://localhost:3000/api/Users"
                 postCheckUserUrl = "http://localhost:3000/api/CardGames/userExist"
                 />, document.getElementById('content'));

  });