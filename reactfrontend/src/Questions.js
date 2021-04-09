import React from "react";
var questions  = ["a","b","c"]
questions.filter(function(index){
    if (index !== 0){
        return true;
    }
    else {
        return false;
    }
})
