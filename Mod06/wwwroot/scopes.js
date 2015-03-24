/**
 * Created by Maurice on 3/24/2015.
 */

var scope = {x: 1, child: {a: 1}};

//Object.observe(scope, function(changes){
//    console.table(changes);
//})
//
//scope.x = 2;
//scope.y=7;
//
//scope.child.a = 2;


scope.watchers = [];
scope.watch = function (watchFn, updatedFn) {
    if (typeof watchFn === 'string') {
        watchFn = new Function('return scope.' + watchFn);
    }

    this.watchers.push({
        watchFn: watchFn,
        updatedFn: updatedFn
    })
}


scope.watch(function () {
        return scope.x;
    },
    function (newValue) {
        //scope.x++;
        console.log('X', newValue);
    });

scope.watch(function () {
        return scope.y;
    },
    function (newValue) {
        console.log('Y', newValue);
    });

scope.watch('x', function (newValue) {
    console.log('X', newValue);
})

scope.digest = function () {
    for (var ttl = 0; ttl < 10; ttl++) {
        var updated = false;
        this.watchers.forEach(function (watch) {
            var newValue = watch.watchFn();

            if (newValue !== watch.oldValue) {
                updated = true;
                watch.updatedFn(newValue)
                watch.oldValue = newValue;
            }

        })

        if (!updated) {
            return;
        }
    }

    throw new Error('Max ttl count reached')
}


scope.apply = function (cb) {
    cb();
    this.digest();
}

scope.apply(function () {
    scope.x = 2;
})

scope.apply(function () {
    scope.x = 3;
})
scope.apply(function () {
    scope.y = 2;
})

