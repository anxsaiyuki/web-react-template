var React = require("react/addons"),
    CommonRequire = require("./components/commonRequire.jsx");
    

require("./css/common.css");
require("./css/postContent.css");

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
                  postContent:[],
                  threadId:"",
                  exist:1
              };
      },
      componentWillMount: function() {
          var threadId = CommonRequire.CommonFunctionsMixin.getUrlParam("th");
          this.setState({threadId:threadId});
      },
      componentDidMount: function() {
          var that = this;
            $(".pagination-holder").pagination({
                items: 100,
                itemsOnPage: 10,
                cssStyle: 'light-theme',
                onPageClick : function(){
                    that.paginationPage();   
                }
            });
            var dataUrl = this.props.getPostUrl + "?th=" + this.state.threadId;
            this.queryData(dataUrl);
          
            var myEditor = new YAHOO.widget.Editor('msgpost', {
                height: '300px',
                width: '100%',
                dompath: true, //Turns on the bar at the bottom
                animate: true //Animates the opening, closing and moving of Editor windows
            });
            myEditor.render();
          
          $(".create-post").click(function() {
              myEditor.saveHTML();
              var html = myEditor.get('element').value;
              console.log(html);
              that.createPost(html);
          });
          
      },
      queryData: function(url) {
          var that = this;
          var postDataList = [];
          CommonRequire.ApiConnectionMixins.getApi(url,function(data) {
                if (data["data"] == "100") {
                    that.setState({exist:0});
                }
                else {
                  var dataTitle = data["data"];
                  for (i = 0; i < dataTitle.length; i++) {
                        postDataList.push({
                            postId:dataTitle[i].id,
                            postContent:dataTitle[i].content,
                            postUserId:dataTitle[i].user.username,
                            postDate:CommonRequire.CommonFunctionsMixin.convertDate(dataTitle[i].createdAt,"Slash")
                        });
                    }
                }
              that.setState({postContent:postDataList})
          });
      },
      paginationPage:function() {
             alert($(".pagination-holder").pagination('getCurrentPage'));
      },
      createPost: function(html) {
          var that = this
          var that = this;
          var url = this.props.createPostUrl + "?access_token=" + CommonRequire.Cookie.load("auth");
          
                var parameters = JSON.stringify({
                    userId:CommonRequire.Cookie.load("userId"),
                    tId:this.state.threadId,
                    content:html
                });
          
          CommonRequire.ApiConnectionMixins.postApi(url,parameters,function(data) {
              alert("created");
              var dataUrl = that.props.getPostUrl + "?th=" + that.state.threadId;
              that.queryData(dataUrl);
          });
      },
      render: function() {
          
        
        var postContentNode = this.state.postContent.map(function(data,index){
           return (
                <div className="post-single-content row equal-height-column">
               
                    <div className="post-single-right col-xs-3">
                        <div className="userName-text">{data.postUserId}</div>
                        <div className="user-flavor-text">lorem ipsum lorem ipsum</div>
                        <img className="user-portrait" src="./img/test_img.jpg"/>
                    </div>
               
                    <div className="post-single-left col-xs-9">
                        <div className="post-single-top col-xs-12">
                            <div className="post-date col-xs-6">{data.postDate}</div>
                            <div className="post-count col-xs-1 col-xs-offset-5">#{index + 1}</div>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: data.postContent}}></div>
                      
                        
                    </div>
                    
                </div>
           );
        });
        
        if (this.state.exist == 1) {
        return (

            <div className="content-wrapper">
                <div className="row">
                </div>
                <div className="row">
                    <div className="pagination-holder"></div>
                </div>
                <div className="post-title-box row">
                    <div className="post-title">This is the Post Title</div>
                    <div className="post-total">Post: {this.state.postContent.length}</div>
                </div>
                <div className="post-content">
                    {postContentNode}
                </div>
                <div className="post-form row">
                    <div className="border col-sm-1"></div>
                    <div className="post-area col-xs-12 col-sm-10">
                        <div className="yui-skin-sam col-xs-12">
                            <textarea name="msgpost" id="msgpost" cols="50" rows="10">

                        </textarea>
                    </div>
                    </div>
                    <div className="border col-sm-1"></div>
                </div>
                <div className="row row-content">
                    <button className="create-post btn btn-primary col-xs-6 col-xs-offset-3 col-md-4 col-md-offset-4">Post</button>
                </div>
            </div>
            );
        }
        else {
                return (
                <div>Not Found</div>
                    );
            }
      }
    });

    React.render(<Application l20n = {document.l10n}
                 getPostUrl = "http://localhost:3000/api/Posts/get"
                 createPostUrl = "http://localhost:3000/api/Posts/createNew"
                 />, document.getElementById('content'));

  });