var React = require("react/addons"),
    CommonRequire = require("./components/commonRequire.jsx");
    

require("./css/common.css");
require("./css/indexContent.css");

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
                  gameList:[]
              };
      },
      componentWillMount: function() {
          
      },
      componentDidMount: function() {
          this.getGameData();
      },
      getGameData: function() {
          var that = this;
          var url = this.props.getGameurl + "?status=1";
          var parameter;
          CommonRequire.ApiConnectionMixins.postApi(url, parameter, function(data) {
              var dataTitle = data["data"];
              var gameList = [];
              for (j = 0; j < dataTitle.length; j++) {
                  var temp = [];
                  for (i = 0; i < dataTitle[j].subForums.length; i++) {
                      temp.push({
                          gameContentId:dataTitle[j].subForums[i].id,
                          gameContentName:dataTitle[j].subForums[i].name,
                          gameContentDate:CommonRequire.CommonFunctionsMixin.convertDate(dataTitle[j].subForums[i].updatedAt,"slash")
                      });
                  }
                  gameList.push({
                      gameName:dataTitle[j].name,
                      gameContent:temp
                  });
              }
              console.log(gameList);
              that.setState({gameList:gameList});
          });
          
      },
      render: function() {
        var that = this;
          
        var gameListNode = this.state.gameList.map(function(data,index){
           return (
                <div className="game-wrapper row">
                    <div className="game-topbar">
                        <img className="game-img" src="./img/test_img.jpg"/>
                        <div className="game-title">{data.gameName}</div>
                    </div>
                    <div className="game-content row equal-height-column">
                        <div className="col-xs-12">
               {data.gameContent.map(function(data,index) {
                        return (
                            <div className="game-subcontent col-xs-4">
                                <a href={"thread.html?sf=" + data.gameContentId} ><img className="subcontent-img" src="./img/speech_bubble.png"/></a>

                                <div className="subcontent-title col-xs-6"><a href={"thread.html?sf=" + data.gameContentId} > {data.gameContentName}</a></div> 
                            
                                <div className="subcontent-description col-xs-12">
                                    <div>Last Posted: Loerum Ipsum Loerum </div>
                                    <div>{data.gameContentDate}</div>
                
                                </div>
                            </div>
                            );
                    })
                }
                        </div>
                    </div>
                </div>
               )
        });
          
        return (
        <div>
            {gameListNode}
            
        </div>);
      }
    });

    React.render(<Application l20n = {document.l10n}
                 getGameurl = "http://localhost:3000/api/CardGames/get"
                 />, document.getElementById('content'));

  });