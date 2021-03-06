console.log('Testing global.js');

console.log('test: global isArray');
if (!isArray([]) || isArray({'0': 0, '1': 1, length: 2})) {
	throw 'isArray doesnt work';
}

console.log('test: global toArray');
(function (a,b,c,d) {
	var args = toArray(arguments);
	if (!isArray(args) || args[0] !== a || args[1] !== b) {
		throw 'toArray doesnt work';
	}
})(1,2,3,4);

console.log('test: global each');
(function () {
	var sum = 0,
		obj = {'0': 1, 'a': 2, 'z': 3, 'werwefa': 4};

	each(obj,function (element) {
		if (this !== obj) {
			throw 'each doesnt work';
		}
		sum += element;
	});

	if (sum !== 10) {
		throw 'each doesnt work';
	}

	obj = {'a': 'b'};
	var obj2 = {};
	each(obj,function () {
		if (this !== obj2) {
			throw 'each doesnt work';
		}
	},obj2);

})();

console.log('test: global isUndefined');
if (!isUndefined(undefined) || isUndefined(true)) {
	throw 'isUndefined doesnt work';
}

console.log('test: global isDefined');
if (isDefined(undefined) || !isDefined(true)) {
	throw 'isDefined doesnt work';
}

console.log('test: global map');
(function () {
	var obj = {
		doIt: function (a) {return a * 2;}
	}, 
		ra = [1,2,3],
		fn = function (a) {return this.doIt(a);},
		result = map(ra,fn,obj);

	if (result[0] !== 2 || result[1] !== 4) {
		throw 'map doesnt work';
	}
})();

console.log('test: global absorb');
(function () {
	var a = {a: 1}, b = {b: 2}, ab = {};
	result = absorb(ab,a,b);
	if (!result === ab || ab.a !== 1 || ab.b !== 2) {
		throw 'absorb doesnt work';
	};
})();

console.log('test: global object');
(function () {
	var obj = {
		a: 1,
		b: 2
	},
	message = 'object doesnt work',
	obj2 = object(obj);
	if (obj2.a !== obj.a || obj2.b !== obj.b) {
		throw message;
	}
	obj.a = 3;
	if (obj2.a !== obj.a) {
		throw message;
	}
})();
