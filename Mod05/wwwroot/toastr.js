/**
 * Created by Maurice on 3/24/2015.
 */
var module = angular.module('toastr',[])
if (!window.toastr) throw new Error('We need window.toastr')

//module.constant('toastr', window.toastr);

module.provider('toastr', function(){
    return {
        setOption: function (options) {
            toastr.options = options;
        },
        $get: function () {
            return window.toastr;
        }
    }
})
