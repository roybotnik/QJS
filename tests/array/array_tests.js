// test: Array.prototype.reduce
if ([1,2,3,4].reduce(function (a,b) {return a + b}) !== 10) {
	throw 'reduce doesnt work';
}

// test: Array.prototype.reduce
if ([1,2,3,4].reduce(function (memo,element) {
	memo = isArray(memo) ? memo : [memo];
	memo.push(element);
 	return memo;
},0)[0] !== 0) {
	throw 'memo isnt set right';
}

// test: Array.prototype.each
(function () {
	var sum = 0;
	[1,2,3,4].each(function (element) {
		sum += element;
	});
	if (sum !== 10) {
		throw 'Array.prototype.each doesnt work';
	}
})();

// test: Array.prototype.map
(function () {
	var obj = {
		doIt: function (a) {return a * 2;}
	}, 
		ra = [1,2,3],
		fn = function (a) {return this.doIt(a);},
		result = ra.map(fn,obj);

	if (result[0] !== 2 || result[1] !== 4) {
		throw 'Array.prototype.map doesnt work';
	}
})();

// test: Array.prototype.any
(function () {
	var isOdd = function (n) {
		return n % 2 !== 0;
	};
	if ([2,4,6].any(isOdd) !== false || [2,4,6,7].any(isOdd) !== true) {
		throw 'any doesnt work';
	}
})();

// test: Array.prototype.indexOf
(function () {
	if ([0,1,2].indexOf(0) !== 0 || [0,1,2,3,4].indexOf(4) !== 4) {
		throw 'indexOf doesnt work right';
	}
})();

// test: Array.prototype.unique
(function () {
	if ([0,0,1,1,2,2].unique().length !== 3) {
		throw 'unique doesnt work';
	}
})();

// test: Array.prototype.removeAll
(function () {
	if ([1,5,2,5,3,5,4,5].removeAll(5).length !== 4) {
		throw 'removeAll doesnt work';
	}
})();
