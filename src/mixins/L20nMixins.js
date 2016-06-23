"use strict";
var React=require("react");
module.exports = {
  propTypes: {
    l20n:React.PropTypes.any.isRequired
     
  },
  l20nt:function(id){

      return this.props.l20n.getEntitySync(id).value;    
  },
  componentDidMount:function(){
    
    this.props.l20n.localizeNode(this.getDOMNode());
  
  }
};