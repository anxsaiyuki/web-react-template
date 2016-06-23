var React = require("react/addons"),
    CommonRequire = require("./components/commonRequire.jsx"),
    ReCATPCHA = require("react-google-recaptcha");

require("./css/common.css");
require("./css/threadContent.css");

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
                  tableHeader:[this.l20nt("TopicTitle"), this.l20nt("Created"), this.l20nt("LastPostTitle"),this.l20nt("PostsTitle"),this.l20nt("ViewsTitle"),this.l20nt("RatingTitle")],
                  threadData:[],
                  subForum:"",
                  subForumName:"",
                  pageNumber:"",
                  exist:1
              };
      },
      componentWillMount: function() {
          var subForum = CommonRequire.CommonFunctionsMixin.getUrlParam("sf");
          this.setState({subForum:subForum});
      },
      componentDidMount: function() {
          
            var that = this;
          
            
            var pageNumberUrl = CommonRequire.CommonFunctionsMixin.getUrlParam("page");
            /*var countUrl = this.props.getThreadTotalCount + "?sf=" + this.state.subForum;
            CommonRequire.ApiConnectionMixins.getApi(countUrl,function(data) {
                
                $(".pagination-holder").pagination({
                    items: data.totalCount,
                    itemsOnPage: 20,
                    currentPage: pageNumberUrl == "" ? 1 : pageNumberUrl,
                    cssStyle: 'light-theme',
                    onPageClick : function(){
                        that.paginationPage();   
                    }
                });
                
            });*/

            var dataUrl = this.props.getThreadData + "?sf=" + this.state.subForum + "&page=" + pageNumberUrl;
            this.queryData(dataUrl,pageNumberUrl);
            
      },
      queryData: function(url,page) {
          var that = this;
          var threadDataList = [];
            CommonRequire.ApiConnectionMixins.getApi(url,function(data) {
                if (data["data"] == "100") {
                    that.setState({exist:0});
                }
                else {
                    var dataTitle = data["data"];
                    for (i = 0; i < dataTitle.length - 1; i++) {
                        threadDataList.push({
                            threadId:dataTitle[i].id,
                            threadUserId:dataTitle[i].user.username,
                            threadName:dataTitle[i].name,
                            threadViews:dataTitle[i].views,
                            threadRating:dataTitle[i].rating,
                            threadLastPost:CommonRequire.CommonFunctionsMixin.convertDate(dataTitle[i].updatedAt,"dash"),
                            threadPosts:dataTitle[i].posts
                        });
                    }
                    $(".pagination-holder").pagination({
                        items: dataTitle[dataTitle.length-1].totalCount,
                        itemsOnPage: 20,
                        currentPage: page == "" ? 1 : page,
                        cssStyle: 'light-theme',
                        onPageClick : function(){
                            that.paginationPage();   
                        }
                    });
                
                    that.setState({threadData:threadDataList});
                    var subForumName = dataTitle[dataTitle.length-1].name;
                    that.setState({subForumName:subForumName});
                }
            });
      },
      paginationPage:function() {
            var that = this;
            var page = $(".pagination-holder").pagination('getCurrentPage');
            var dataUrl = this.props.getThreadData + "?sf=" + this.state.subForum + "&page=" + page;
            this.setState({pageNumber:page});
            console.log(page);
            this.queryData(dataUrl,page);
             
      },
      openModal: function() {
          if (CommonRequire.Cookie.load("auth") != undefined && CommonRequire.Cookie.load("userId") != undefined && CommonRequire.Cookie.load("userName") != undefined) {
              var options = {hashTracking: false};
              var inst = $('.threadModel').remodal(options);
              inst.open();
          }
          else {
              alert("Please Login First");   
          }
      },
      createThread: function() {
          CommonRequire.Cookie.save('sfId', this.state.subForum);
      },
      sort: function(index) {   
          if ($("#header_" + index).hasClass("sort-icon") || $("#header_" + index).hasClass("sort-icon_up"))
          {
              $("#header_" + index).removeClass("sort-icon");
              $("#header_" + index).removeClass("sort-icon_up");
              $("#header_" + index).addClass("sort-icon_down");
          }
          else {
              $("#header_" + index).removeClass("sort-icon_down");
              $("#header_" + index).addClass("sort-icon_up");
          }
      },
      render: function() {
        var that = this;
          
        var tableHeaderNode = this.state.tableHeader.map(function(data,index){
            return (
                <th onClick={that.sort.bind(that,index)}>{data}<span id={"header_" + index} className="sort-icon"></span></th>
            );
        });
        
        var threadDataNode = this.state.threadData.map(function(data,index){
            return (
                <tr>
                    <td><a href={"post.html?th="+data.threadId}>{data.threadName}</a></td>
                    <td>{data.threadUserId}</td>
                    <td>{data.threadLastPost}</td>
                    <td>{data.threadPosts}</td>
                    <td>{data.threadViews}</td>
                    <td>{data.threadRating}</td>
                </tr>
            );
        });
        
        if (this.state.exist == 1) {
            return (
            <div className="content-wrapper">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><a href="index.html">{this.l20nt("HomeBreadCrumb")}</a></li>
                        <li class="active">{this.state.subForumName}</li>
                    </ol>
                </div>

                <div className="row">
                     <a href="create.html"><button className="create-thread btn btn-primary" onClick={this.createThread}>Create Thread</button></a>
                </div>
                <div id="threadModalWrapper">
                    <div className="remodal threadModel" data-popup-wrapper="threadModalWrapper" data-remodal-id="thread-modal">
                          <button key="1" data-remodal-action="close" className="remodal-close"></button>
                            <div className="modal-border col-xs-12">
                                <h1 className="modal-title">{this.l20nt("NewThread")}</h1>
                                <p className="row login-box-row">
                                    <p className="box-user-title">{this.l20nt("ThreadName")}</p>
                                    <input type="text" className="thread-name-input col-xs-8 col-xs-offset-2" />
                                </p>
                                <button className="box-login-btn col-xs-8 col-xs-offset-2" onClick={this.createThread}>{this.l20nt("Create")}</button>
                            </div>
                    </div>
                </div>


                <div className="row">
                    <div className="pagination-holder"></div>
                </div>

                <div className="row">
                    <table id="result" className="table table-striped table-bordered" cellspacing="0" width="100%"> 
                        <col className="width1"/>
                        <col className="width2"/>
                        <col className="width2"/>
                        <col className="width2"/>
                        <col className="width2"/>
                        <col className="width2"/>
                        <thead className="table-header">
                            <tr>
                                {tableHeaderNode}
                            </tr>
                        </thead>
                        <tbody className="result-table">
                            {threadDataNode}
                        </tbody>
                    </table>
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
                 getThreadData = "http://localhost:3000/api/Threads/get"
                 getThreadTotalCount = "http://localhost:3000/api/Threads/countFilter"
                 createNewThread = "http://localhost:3000/api/Threads/createNew"
                 />, document.getElementById('content'));

  });