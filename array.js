// section: Array.prototype
// desc: Additions to the array prototype. 

// func: reduce(fn, current)
// desc: Runs the function against all the items in the array sequentially.  Starting value can be specified optionally.
// example: myArray.reduce(mySumFunc(a, b)) -> returns the sum of all items in myArray.
Array.prototype.reduce = function (fn, current) {
	var length = this.length;
	var i = 0;
	// If current isn't set, set it to the first item in the array and increment i.
	if (typeof current === 'undefined') {
	  current = this[i];
		i++;
	}
	// Loop through each item in the array, running function against the current result and the next item.
	for (; i < length; i++) {
		if (this.hasOwnProperty(i)) {
			current = fn.call(this, current, this[i], i, this);
		}
	}
	return current;
};

// func: each(fn, ctx)
// desc: Runs the function against each item in the array.  Context can be specified optionally.
// returns: A modified version of the original array.
Array.prototype.each = function (fn, ctx) {
	ctx = ctx || this;
	for (var i = 0; i < this.length; i++) {
		if (fn.call(ctx, this[i], i, this) === false) {
			break;
		}
	}
	return this;
};

// func: eachr(fn, ctx)
// desc: Runs the function against each item in the array.  Starts at the end of the array.
// returns: A modified version of the original array.
Array.prototype.eachr = function (fn, ctx) {
	ctx = ctx || this;
	for (var i = this.length - 1; i < -1; i--) {
		if (fn.call(ctx, this[i], i, this) === false) {
			break;
		}
	}
	return this;
};

// func: map(fn, ctx)
// desc: Runs the function against each item in the array.  Creates a new array.
// returns: A new array containing the result.
Array.prototype.map = function (fn, ctx) {
	var result = [];
	this.each(function (element, index, array) {
		result.push(fn.call(this, element, index, array));
	}, ctx);
	return result;
};

// func: filter(fn, ctx)
// desc: Runs a filter function against each item in the array.
// returns: A new array with the items that pass the filter.
Array.prototype.filter = function (fn, ctx) {
	var result = [];
	var original = this;
	this.map(fn, ctx).each(function (element, index) {
		element && result.push(original[index]);
	});
	return result;
};

// func: last()
// desc: Gets the last item in an array.
Array.prototype.last = function () {
	return this[this.length - 1];
};

// func: first()
// desc: Gets the first item in an array.
Array.prototype.first = function () {
	return this[0];
};

// func: sum()
// desc: Gets the sum of all items in the array.
Array.prototype.sum = function () {
	return this.reduce(function (a, b) { return a + b; });
};

// func: any(fn) 
// desc: Returns true if the array contains any values that pass the specified filter function.
Array.prototype.any = function (fn) {
	return this.filter(fn).length > 0;
};

// func: unique()
// desc: Returns a new array with only unique values from the current array.
Array.prototype.unique = function () {
	return this.reduce(function (current, element) {
		current.indexOf(element) === -1 && current.push(element);
	}, []);
};

// func: removeAll(element)
// desc: Removes matching elements from the array.
// return: The modified array with the matching elements removed.
Array.prototype.removeAll = function (element) {
	var newArray = [];
	this.each(function (current) {
		current !== element && newArray.push(current);
	});
	this.splice.apply(this,[0,this.length].concat(newArray));
	return this;
};

// func: areSame
// desc: Determines if all elements in the array are the same.
(function () {
	var fail = {};
	Array.prototype.areSame = function () {
		return this.reduce(function (a,b) {
			return a !== b ? fail : a;
		}) !== fail;
	};
})();
// endsection
