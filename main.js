(function(window){
    //I recommend this
    'use strict';
    function define_library(){
        var Library = {};
        var name = "Timmy";
        Library.greet = function(){
            alert("Hello from the " + name + " library.");
        }
        return Library;
    }
    //define globally if it doesn't already exist
    if(typeof(Library) === 'undefined'){
        window.Library = define_Library();
    }
    else{
        console.log("Library already defined.");
    }
})(window);