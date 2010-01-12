console.log('testing');

if (!isArray([]) || isArray({'0': 0, '1': 1, length: 2})) {
	throw 'isArray doesnt work';
}

(function (a,b,c,d) {
	var args = toArray(arguments);
	if (!isArray(args) || args[0] !== a || args[1] !== b) {
		throw 'toArray doesnt work';
	}
})(1,2,3,4);

if ([1,2,3,4].reduce(function (a,b) {return a + b}) !== 10) {
	throw 'reduce doesnt work';
}
if ([1,2,3,4].reduce(function (memo,element) {
	memo = isArray(memo) ? memo : [memo];
	memo.push(element);
 	return memo;
},0)[0] !== 0) {
	throw 'memo isnt set right';
}

(function () {
	var sum = 0;
	[1,2,3,4].each(function (element) {
		sum += element;
	});
	if (sum !== 10) {
		throw 'Array.prototype.each doesnt work';
	}
})();

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

if (!isUndefined(undefined) || isUndefined(true)) {
	throw 'isUndefined doesnt work';
}

if (isDefined(undefined) || !isDefined(true)) {
	throw 'not doesnt work';
}


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

(function () {
	var a = {a: 1}, b = {b: 2}, ab = {};
	result = absorb(ab,a,b);
	if (!result === ab || ab.a !== 1 || ab.b !== 2) {
		throw 'absorb doesnt work';
	};
})();

(function () {
	var a = {a: 1}, b = {b: 2}, ab = {};
	result = absorb(ab,a,b);
	if (!result === ab || ab.a !== 1 || ab.b !== 2) {
		throw 'absorb doesnt work';
	};
})();

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

(function () {
	var result = 'a\nb'.lines(),
		message = 'lines doesnt work';
	if (result[0] !== 'a' || result[1] !== 'b') {
		throw message;
	}
	result = 'a\rb'.lines();
	if (result[0] !== 'a' || result[1] !== 'b') {
		throw message;
	}
	result = 'a\fb'.lines();
	if (result[0] !== 'a' || result[1] !== 'b') {
		throw message;
	}
})();

(function () {
	var phrase = 'oh no you didnt',
	words = phrase.words();
	if (words[0] !== 'oh' || words[1] !== 'no') {
		throw 'words didnt work';
	}
})();

if ((3).constrain(1,3) !== 3 || (3).constrain(4,5) !== 4 || (3).constrain(1,2) !== 2) {
	throw 'constrain didnt work';
}

(function () {
var format = function (from,to) {
	return 'from: ' + from + ', to: ' + to;
};
if (format('here','there') !== 'from: here, to: there' || format.swap()('here','there') !== 'from: there, to: here') {
	throw 'swap didnt work';
}
})();

(function () {
	var add = function () {
		return reduce(arguments,function (a,b) {return a + b;});
	};
	var add2 = add.taking(2);
	if (add(1,2,3) !== 6 || add2(1,2,3) !== 3) {
		throw 'taking didnt work';
	}
})();

(function () {
	var doubleMe = function (a) {
		return a * 2;
	},
	bangMe = function (a) {
		return a.toString() + '!!';
	};
	if (doubleMe(2) !== 4 || bangMe(4) !== '4!!' || doubleMe.compose(bangMe)(2) !== '4!!') {
		throw 'compose doesnt work';
	}
})();

(function () {
	var isOdd = function (n) {
		return n % 2 !== 0;
	};
	if ([2,4,6].any(isOdd) !== false || [2,4,6,7].any(isOdd) !== true) {
		throw 'any doesnt work';
	}
})();

(function () {
	if ([0,1,2].indexOf(0) !== 0 || [0,1,2,3,4].indexOf(4) !== 4) {
		throw 'indexOf doesnt work right';
	}
})();

(function () {
	if ([0,0,1,1,2,2].unique().length !== 3) {
		throw 'unique doesnt work';
	}
})();

(function () {
	if ([1,5,2,5,3,5,4,5].removeAll(5).length !== 4) {
		throw 'removeAll doesnt work';
	}
})();

(function () {
	var get = function (obj,propertyName) {
		return obj[propertyName];
	}.curried();
	var myObj = {
		'1': 2
	};
	if (get(myObj,1) !== 2 || get(myObj)(1) !== 2) {
		throw 'curried doesnt work'
	}
})();
