var launchEngine = require("teamsite-hyperloop");
var launchConfig = require("../teamsite.config.json");
var path = require("path");



var launch = function (env, filetype, launchConfig, launchEngine) {

    var fs = require("fs");
    var glob = require("glob");
    var pathPairList = launchConfig[env].path[filetype];

    pathPairList.forEach(function (pathPair) {

        var sourceFileFolder = path.join(launchConfig.localRoot, pathPair[0]);
        var remoteFileFolder = path.join(launchConfig.remoteRoot, pathPair[1]);
        //console.log(sourceFileFolder+"/*"+launchConfig.allowedExt[filetype]);                

        glob(sourceFileFolder + "/*" + launchConfig.allowedExt[filetype], function (er, files) {

            if (files.length === 0) {
                console.log("[Fail] No files in the folder: " + sourceFileFolder);
            }else{
            
                  files.forEach(function (sourceFilePath) {

                        //teamsite login information
                        var name = launchConfig.profile.name;
                        var password = launchConfig.profile.password;

                        //console.log(sourceFilePath);
                        //do launch               
                        launchEngine.start(name, password, sourceFilePath, remoteFileFolder);

                    });
            
            }

         
        });

    });


}

//
launch("stage", "img", launchConfig, launchEngine);

//
launch("stage", "js", launchConfig, launchEngine);

//
launch("stage", "css", launchConfig, launchEngine);