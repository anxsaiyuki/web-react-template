var React = require("react/addons"),
    CommonRequire = require("./components/commonRequire.jsx");
    

require("./css/common.css");
require("./css/messageContent.css");

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
                 inboxData: [[],[]],
                 currentTabIndex: 0
              };
      },
      componentWillMount: function() {
          
      },
      componentDidMount: function() {
          
          var url = this.props.getMessageUrl + "?access_token=" + CommonRequire.Cookie.load("auth");
          this.getMessage(url,0);
      },
      showCurrentTab: function(index) {
          this.setState({currentTabIndex:index});
          var url = this.props.getMessageUrl + "?access_token=" + CommonRequire.Cookie.load("auth");
          this.getMessage(url,index);
      },
      getMessage: function(url,index) {
          var that = this;
          var parameters = JSON.stringify({
                userId:CommonRequire.Cookie.load("userId"),
                type:index
          });
          
          CommonRequire.ApiConnectionMixins.postApi(url,parameters,function(data) {
                var dataTitle = data["data"];
                var inboxData = that.state.inboxData;
                inboxData[index] = [];
                //var data = [];
                for (i = 0; i < dataTitle.length; i++) {
                    inboxData[index].push({
                        messageTitle:dataTitle[i].title,
                        messageContent:dataTitle[i].message,
                        messageSender:dataTitle[i].sender,
                        messageDate:CommonRequire.CommonFunctionsMixin.convertDate(dataTitle[i].createdAt,"slash")
                    });
                }
                //inboxData[index].push(data);
                that.setState({inboxData:inboxData});
          });
      },
      messagePopUp: function() {
                var options = {hashTracking: false};
                var inst = $('.messageModal').remodal(options);
                inst.open();
      },
      createMessage: function(html) {
            alert(html);
      },
      render: function() {
        var that = this;
        var inboxDataNode = this.state.inboxData.map(function(data,index) {
            return (
                <div className={that.state.currentTabIndex===index ? "": "hidden"}>                               
                {data.map(function(data,index) {
                    return (
                     <div className="row">
                        <div className="message-single col-xs-12">
                                <div className="message-user col-xs-4">
                                    {data.messageSender}
                                </div>
                                <div className="message-single-title col-xs-8">
                                    {data.messageTitle}
                                    <div className="message-date">
                                        {data.messageDate}
                                    </div>
                                </div>
                                <div className="message-single-content col-xs-12">
                                    {data.messageContent}
                                </div>
                        </div>
                    </div>
                    );
                })}
                </div>
            );
        });
          
        return (
        <div>
                <div className="row">
                    <button className="create-message-btn btn btn-primary" onClick={this.messagePopUp}>{this.l20nt("CreateMessage")}</button>
                </div>
                <div className="row">
                    <ul className="nav nav-tabs col-xs-12 col-md-10 col-md-offset-1">
                      <li id="control-tab" role="presentation" className={this.state.currentTabIndex===0 ? "active": ""}><a onClick={this.showCurrentTab.bind(this,0)}>Inbox</a></li>
                      <li id="control-tab" role="presentation" className={this.state.currentTabIndex===1 ? "active": ""}><a onClick={this.showCurrentTab.bind(this,1)}>Sent</a></li>
                    </ul>
                </div>
                <div id="messageModalWrapper">
                    <div className="remodal messageModal" data-popup-wrapper="messageModalWrapper" data-remodal-id="message-modal">
                      <button data-remodal-action="close" className="remodal-close"></button>
                        <div className="new-message-title">{this.l20nt("NewMessage")}</div>
                        <div className="modal-border col-xs-12">
                            <div className="row row-content">
                                <input className="message-subject col-xs-12" type="text"/>
                            </div>
                            <div className="row row-content">
                                <TextBoxChunk onClick={this.createMessage} class=".create-message" /> 
                            </div>      
                            <div className="row row-content">
                                <button className="create-message btn btn-primary col-xs-6 col-xs-offset-3 col-md-4 col-md-offset-4">Create</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="message-list col-xs-12 col-md-10 col-md-offset-1">
                        <div className="row">
                            <div className="message-top col-xs-12">
                                <div className="message-title col-xs-10">{this.l20nt("MessageTitle")}</div>
                                <img className="message-search" src="./img/search.png"/>
                            </div>
                        </div>  
                            {inboxDataNode}
                    </div>
                </div>
        </div>);
      }
    });

    React.render(<Application l20n = {document.l10n}
                 getMessageUrl = "http://localhost:3000/api/Messages/get"
                 />, document.getElementById('content'));

  });