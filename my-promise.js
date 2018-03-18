// Promise의 상태가 필요하다.
const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

module.exports.MyPromise = function(fn) {
    // 처음 생성되었을 때의 상태는 PENDING이다.
    let _state = PENDING;

    // 결과 값을 저장한다.
    let _value = null;

    function fulfill(result) {
        _state = FULFILLED;
        _value = result;
        _handlers.forEach(handle);
        _handlers = null;
    }

    function reject(error) {
        _state = REJECTED;
        _value = error;
        _handlers.forEach(handle);
        _handlers = null;
    }

    let _handlers = [];

    this.done = function (onFulfilled, onRejected) {
        handle({ onFulfilled: onFulfilled, onRejected: onRejected });
    }

    function resolve(result) {
        let then = getThen(result);
        if (then) {
            // then은 promise의 then함수이다. bind로 result를 this로 한다.
            doResolve(then.bind(result), resolve, reject)
            return
        }
        fulfill(result);
    }

    function getThen(value) {
        let t = typeof value;
        if (value && (t === 'object' || t === 'function')) {
            let then = value.then;
            if (typeof then === 'function') {
                return then;
            }
        }
        return null;
    }

    this.then = function (onFulfilled, onRejected) {
        return new module.exports.MyPromise((resolve, reject) => {
            this.done((result) => {
                // onFulfilled가 호출되어서 그 안에서 새로운 Promise가 만들어진것이다.
                // 그 새로운 Promise가 resolve한 값을 이 Promise가 resolve해야 한다.
                // 그렇다면 onFulfilled에서 만들어진 Promise의 then에다가 이 프로미스의 fulfill과 reject를 넘겨주면 된다.
                resolve(onFulfilled(result));
            }, (error) => {
                reject(onRejected(reject));
            });
        });
    }

    function handle(handler) {
        if (_state == PENDING) {
            _handlers.push(handler);
        } else if (_state == FULFILLED) {
            handler.onFulfilled(_value);
        } else if (_state == REJECTED) {
            handler.onRejected(_value);
        }
    }

    function doResolve(fn, onFulfilled, onRejected) {
    // promise를 이용하는 함수는 인자로 resolve와 reject를 받아들인다.
    // 따라서 resolve와 reject를 건내준다.
        fn(function (value) {
            onFulfilled(value);
        }, function (reason) {
            onRejected(reason);
        });
    }

    doResolve(fn, resolve, reject);
}