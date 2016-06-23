"use strict";
var React=require("react");
module.exports = {
    convertDate: function(dateSec,style) {
        var newDate = new Date(dateSec);
        var dd = newDate.getDate(); 
        var mm = newDate.getMonth()+1; 
        var yyyy = newDate.getFullYear(); 
        var hh = newDate.getHours();
        var min = newDate.getMinutes();
        var ss = newDate.getSeconds();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        if (hh<10){
            hh='0'+hh;   
        }
        if (min<10){
            min='0'+min;   
        }
        if (ss<10){
            ss='0'+ss;   
        }
        
        if (style=="dash") {
            var convertedDate = yyyy + '-' + mm + '-' + dd + " " + hh + ":" + min + ":" + ss; 
            return convertedDate;
        }
        else if (style=="slash"){
            var convertedDate = yyyy + '/' + mm + '/' + dd + " " + hh + ":" + min + ":" + ss; 
            return convertedDate;
        }
        else {
            var convertedDate = yyyy + '/' + mm + '/' + dd + " " + hh + ":" + min + ":" + ss; 
            return convertedDate;
        }
    },
    getUrlParam: function(key) {
        var name = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        var value = results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        return value;
        
    }

};