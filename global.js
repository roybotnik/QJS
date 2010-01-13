// section: Global
// desc: Global functions.

// func: Function.prototype.functionalize()
// desc: Takes a function from an object and creates a new function that can take an object
//		   as its first parameter.  Allows functions to be pulled off of objects and used.
// returns: A new function that can take a context (this).
(function () {
	var slice = Array.prototype.slice;

	Function.prototype.functionalize = function () {
		var fn = this;
		return function (ctx) {
			return fn.apply(ctx,slice.call(arguments,1));
		};
	};
})();

// func: shift(obj)
// desc: Shift from Array.prototype.shift.
shift = Array.prototype.shift.functionalize();

// func: slice(obj)
// desc: Slice from Array.prototype.slice.
slice = Array.prototype.slice.functionalize();

// func: reverse(obj)
// desc: Reverse from Array.prototype.reverse.
reverse = Array.prototype.reverse.functionalize();

// func: isArray(obj)
// desc: Determines whether or not an object is an array.
// returns: A boolean indicating whether or not the specified object is an array.
isArray = function (obj) {
	return obj instanceof Array;
};

// func: isUndefined(obj)
// desc: Determines whether something is undefined.
// returns: A boolean indicating whether the input was undefined.
isUndefined = function (obj) {
	return typeof obj === 'undefined';
};

// func: isDefined(obj)
// desc: Determines whether something is defined.
// returns: A boolean indicating whether the input was defined.
isDefined = function (obj) {
	return typeof obj !== 'undefined';
}

// func: toArray(obj)
// desc: Converts an iterable object to an array.
// returns: An array containing all of the fields of the object.
toArray = function (obj) {
	return slice(obj);
};

// func: hasOwnProperty(obj) 
// desc: hasOwnProperty taken from Object.prototype.
// returns: A boolean indicating whether the input has a specified property.
hasOwnProperty = Object.prototype.hasOwnProperty.functionalize();

// func: eql(a, b)
// desc: Tests if the two params are equal.
eql = function (a, b) {
	return a === b;
};

// func: isNull(obj)
// desc: Tests if the object is null.
isNull = function (obj) {
	return obj === null;
};

// func: isNotNull(obj)
// desc: Tests if the object is not null.
isNotNull = function (obj) {
	return !isNull();
}

// func: isFalse(obj)
// desc: Tests if an object is false.
isFalse = function (obj) {
	return obj === false;
};

// func: object(obj)
// desc: Allows you to create a new object that has another object as its prototype.
// param: obj: The object to inherit from.
(function () {
	var C = function () {};
	object = function (obj) {
		C.prototype = obj;
		return new C();
	};
})();

// func: each(obj, fn, ctx)
// desc: Iterates over each property in obj and calls function fn. Context for the function will
//		 : be obj, but it can be overridden by passing in ctx.
// returns: The modified object after running the function on each property.
each = function (obj, fn, ctx) {
	var ctx = ctx || obj;
	for (var propertyName in obj) {
		hasOwnProperty(obj, propertyName) && fn.call(ctx, obj[propertyName], propertyName, obj);
	}
	return obj;
};

// func: map(obj, fn, ctx)
// desc: This is basically the same as each, but returns a new object and doesn't modify
//		 : the existing one.
// returns: A new object with the function applied to each field.
map = function (obj, fn, ctx) {
	var result = isArray(obj) ? [] : {};
	each(obj, function (element, propertyName, obj) {
				 result[propertyName] = fn.call(this, element, propertyName, obj)
			 }, ctx);
	return result;
};

// func: absorb(dest, src, more)
// desc: Copies all the properties of src to dest.
// returns: The modified destination object.
absorb = function (dest, src, more) {
	each(src, function (element, propertyName) {
		dest[propertyName] = element;
	});

	return isDefined(more) ? arguments.callee.apply(this, [dest].concat(slice(arguments, 2))) : dest;
};

// func: pred(value)
// desc: Returns the predecessor to the value.
pred = function (value) {
	if (typeof value === 'number') {
		return value - 1;
	} else {
		throw Error('pred is not fully implemented');
	}
};

// func: succ(value)
// desc: Returns the successor to the value.
succ = function (value) {
	if (typeof value === 'number') {
		return value + 1;
	} else {
		throw Error('succ is not fully implemented');
	}
};

// func: range(from, to)
// desc: Builds an object that can be used to do an each over a range (range(1, 10).each()).
range = function (from, to) {
	return object({
		from: from,
		to: to,
		each: function (fn,ctx) {
			var current = from;
			var i = 0;
			iterator = this.to < this.from ? pred : succ;
			while (current !== to) {
				if (fn.call(ctx, current, i, this) === false) {
					return false;
				}
				current = iterator(current);
				i++;
			}
			return this;
		}
	});
};

