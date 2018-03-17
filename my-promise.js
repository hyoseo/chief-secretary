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

    this.then = function(onFulfilled, onRejected) {
        handle({ onFulfilled: onFulfilled, onRejected: onRejected });
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

    doResolve(fn, fulfill, reject);
}