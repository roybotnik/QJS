console.log('Testing function.js.');

var testAdd = function (a, b) {
	var second = b || this;
	return second + a;
};

// make sure our test function actually works.
if (testAdd(3, 2) !== 5) {
	throw "testAdd didn't work";
}

console.log('test: Function.prototype.bind');
( function () {
	var boundAdd = testAdd.bind(2);
		if (boundAdd(10) !== 12) {
		throw "bind didn't work";
	}

	var anotherBoundAdd = testAdd.bind(2, 3);
	if (anotherBoundAdd() !== 5)
	{
		throw "bind didn't work";
	}
})();

console.log('test: Function.prototype.curry');
( function () {
	var curriedAdd = testAdd.curry(10);
	if (curriedAdd(100) !== 110)
	{
		throw "curry didn't work";
	}

	var anotherCurried = testAdd.curry(10, 20);
	if (anotherCurried() !== 30)
	{
		throw "curry didn't work";
	}
})();

console.log('test: Function.prototype.not');
( function() {
	var func = function () { return true; };
	var opposite = func.not();
	if(opposite() !== false)
	{
		throw "not didn't work";
	}
})();

console.log('test: Function.prototype.getArity');
( function() {
	if (testAdd.getArity() !== 2)
	{
		throw "getArity doesn't work";
	}
})();

