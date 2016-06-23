var React = require("react/addons"),
    Cookie = require('react-cookie'),
    L20nMixins=require("../mixins/L20nMixins");
    ApiConnectionMixins=require("../mixins/apiConnectionMixins");

require("../css/topBar.css");

module.exports = React.createClass({
  displayname:"topBar",
  mixins: [L20nMixins,ApiConnectionMixins],
  getInitialState: function() {
      return {
          currentLangIndex: "",
          language: ["en-US","zh-TW"],
          languageName: ["English","中文"],
          loginState: 0
      };
  },
  componentWillMount: function() {
      if (Cookie.load("auth") != undefined && Cookie.load("userId") != undefined && Cookie.load("userName") != undefined) {
          this.setState({loginState:1});
      }
  },
  componentDidMount: function() {
        var that = this;
        Cookie.load("languageId") != undefined ? document.l10n.requestLocales(this.state.language[Cookie.load("languageId")]) : "";
      
        $("#language-selection").on("change",function () {
            var langName = that.state.language[$(this).val()];
            document.l10n.requestLocales(langName);
            Cookie.save('languageId', $(this).val());
        });
        
    },
  loginBox: function() {
      		// Add the mask to body
		//$("#mask").fadeIn(300);
        //$("#login-box").fadeIn(300);
        var options = {hashTracking: false};
        var inst = $('.loginModal').remodal(options);
        inst.open();
        if (!$(".invalidLogin").hasClass("off")) {
            $(".invalidLogin").addClass("off");
        }
        if (!$(".emptyLogin").hasClass("off")) {
            $(".emptyLogin").addClass("off");
        }
        $(".box-user-input").val("");
        $(".box-password-input").val("");

  },
  login: function() {
        var that = this;
        var IuserName = $(".box-user-input").val();
        var Ipassword = $(".box-password-input").val();
        if (IuserName == "" || Ipassword == "") {
             $(".emptyLogin").removeClass("off");
        }
        else {
            //alert("Login Successful");
            //$('#mask').fadeOut(300);
            //$('#login-box').fadeOut(300);
            //$('.box-login-error').fadeIn(300);
            var url = "http://localhost:3000/api/Users/login"
            var parameters = JSON.stringify({
                username:IuserName,
                password:Ipassword
            });
            ApiConnectionMixins.postApi(url,parameters,function(data) {
              if (data == 401) {
                  if (!$(".emptyLogin").hasClass("off")) {
                        $(".emptyLogin").addClass("off");
                    }
                  $(".invalidLogin").removeClass("off");
              } 
              else {
                  alert("Login Successful")
                  Cookie.save('auth', data.id);
                  Cookie.save('userId', data.userId);
                  Cookie.save('userName', IuserName);
                  that.setState({loginState:1});
                  $('.loginModal').remodal().close();
              }
            });
        }
      //Cookie.save('my-auth', "test");
  },
  logout: function() {
        var that = this;
          var url = "http://localhost:3000/api/Users/logout?access_token=" + Cookie.load('auth');
          var parameters;
          ApiConnectionMixins.postApi(url,parameters,function(data) {
              alert("You have logged Out");
              Cookie.remove('auth');
              Cookie.remove('userId');
              Cookie.remove('userName');
              that.setState({loginState:0});
              console.log(data);
          });

  },
  render: function() {
      
      var that = this;
      
      var languageNameListNodes=this.state.languageName.map(function(data,index){
           return (
               <option value={index}>{data}</option>
           );   
      });
      
      return (
            <div>
            
                <div className="row">
                    <div className="col-xs-12 top-bar-menu">
                        <a href="index.html" className="home-link">
                            <img className="home-icon" src="../img/home.png"/>
                        </a>
                        <select id="language-selection" defaultValue={Cookie.load("languageId")}>
                            {languageNameListNodes}
                        </select>

                        {this.state.loginState == 0 ? 
                            <a className="login-link" onClick={this.loginBox}>Login</a> 
                            : 
                            <a className="logout-link" onClick={this.logout}>Logout</a> 
                        }
                        {this.state.loginState == 0 ? 
                            "" 
                            : 
                            <div className="welcome-user">{"Welcome " + Cookie.load("userName")}</div> 
                        }
                        <a href="message.html"><img className="message-mail" src="../img/mail.png"/></a>
                    </div>
                </div>

                <div className="row">
                    <div className="banner col-xs-10 col-xs-offset-1">
                        Banner
                    </div>
                </div>
                <div id="loginModalWrapper">
                    <div className="remodal loginModal" data-popup-wrapper="loginModalWrapper" data-remodal-id="login-modal">
                      <button data-remodal-action="close" className="remodal-close"></button>
                        <div className="modal-border col-xs-12">
                            <h1 className="modal-title">{this.l20nt("LoginTitle")}</h1>
                            <div className="row login-box-row">
                                <div className="box-user-title">{this.l20nt("UserNameTitle")}</div>
                                <input type="text" className="box-user-input col-xs-8 col-xs-offset-2" />
                            </div>
                            <div className="row login-box-row">
                                <div className="box-password-title">{this.l20nt("PasswordTitle")}</div>
                                <input type="password" className="box-password-input col-xs-8 col-xs-offset-2" />
                            </div>
                            <button className="box-login-btn col-xs-8 col-xs-offset-2" onClick={this.login}>{this.l20nt("SignIn")}</button>
                            <div className="invalidLogin box-login-error off col-xs-12">{this.l20nt("Invalid")}</div>
                            <div className="emptyLogin box-login-error off col-xs-12">{this.l20nt("Empty")}</div>
                            <a href="user-forget.html" className="box-forget-login col-xs-12">{this.l20nt("ForgetLogin")}</a>
                        </div>
                    </div>
                </div>
                
            </div>
        );

    }
});      