/**
 * Created by Maurice on 3/24/2015.
 */

function otherStuff(){
    console.log('otherStuff')
}

utils.inject='otherStuff'
function utils(otherStuff){
    console.log('In utils')
}

doStuff.inject = 'utils'
function doStuff(utils){
    console.log('In doStuff')
    //utils();
}

//doStuff(utils)


function factory(fn){
    //return doStuff(utils);
    var result = window[fn];
    var injectable =undefined;
    if (result.inject){
       injectable= factory(result.inject)
    }
    return new result(injectable);
}


var f= factory('doStuff')
//f();