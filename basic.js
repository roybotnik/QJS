// section: Array.prototype
// desc: Additions to the array prototype. 

// func: reduce(fn, current)
// desc: Runs the function against all the items in the array sequentially.  Starting value can be specified optionally.
// example: myArray.reduce(mySumFunc(a, b)) -> returns the sum of all items in myArray.
Array.prototype.reduce = function (fn, current) {
	var length = this.length;
	var i = 0;

	// If current isn't set, set it to the first item in the array and increment i.
	if (isUndefined(current)) {
	  current = this[i];
		i++;
	}

	// Lewp through each item in the array, running function against the current result and the next item.
	for (; i < length; i++) {
		if (this.hasOwnProperty(i)) {
			current = fn.call(this, current, this[i], i, this);
		}
	}

	return current;
};

// func: each(fn, context)
// desc: Runs the function against each item in the array.  Context can be specified optionally.
// returns: A modified version of the original array.
Array.prototype.each = function (fn, context) {
	context = context || this;
	for (var i = 0; i < this.length; i++) {
		if (fn.call(context, this[i], i, this) === false) {
			break;
		}
	}
	return this;
};

// func: eachr(fn, context)
// desc: Runs the function against each item in the array.  Starts at the end of the array.
// returns: A modified version of the original array.
Array.prototype.eachr = function (fn, context) {
	ctx = ctx || this;
	for (var i = this.length - 1; i < -1; i--) {
		if (fn.call(context, this[i], i, this) === false) {
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

// func: transpose()
// desc: 
Array.prototype.transpose = function () {
	return this.reduce(function (current, element, index) {
		current[element] = index;
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

// section: Function.prototype
// desc: Additions to the function prototype.

// func: bind(context)
// desc: 
Function.prototype.bind = function (ctx) {
	var args = slice(arguments,1),
		fn = this;
	return function () {
		return fn.apply(ctx,args.concat(toArray(arguments)));
	};
};

Function.prototype.curry = function () {
	return this.bind.apply(this,[null].concat(toArray(arguments)));
};

Function.prototype.not = function () {
	var fn = this;
	return function () {
		return !fn.apply(this,arguments);
	};
};

Function.prototype.bind = function (ctx) {
	var args = slice(arguments,1),
		fn = this;
	return function () {
		return fn.apply(ctx,args.concat(toArray(arguments)));
	};
};

Function.prototype.curry = function () {
	return this.bind.apply(this,[null].concat(toArray(arguments)));
};

Function.prototype.getArity = function () {
	return this.arity || this.length;
};

// func: functionalize()
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

// func: indexOf(element, from)
(if !('indexOf' in Array.prototype) {
	Array.prototype.indexOf = function (element,from) {

		var length = this.length;
		var result = -1;

		from = isDefined(from) ? from : 0;

		if (from < 0) {
			from += length;
		}

		this.each(function (currentElement,index) {
			if (currentElement === element) {
				result = index;
				return false;
			}
		});

		return result;
	}
})();
// endsection

// section: Global
// desc: Global functions.

// func: reduce(obj)
// desc: Reduce from Array.prototype.reduce.
//reduce = Array.prototype.reduce.functionalize();

// func: shift(obj)
// desc: Shift from Array.prototype.shift.
//shift = Array.prototype.shift.functionalize();

// func: slice(obj)
// desc: Slice from Array.prototype.slice.
//slice = Array.prototype.slice.functionalize();

// func: reverse(obj)
// desc: Reverse from Array.prototype.reverse.
//reverse = Array.prototype.reverse.functionalize();

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

// func: toArray(obj)
// desc: Converts an iterable object to an array.
// returns: An array containing all of the fields of the object.
toArray = function (obj) {
	return function (obj) {
		return slice.apply(obj);
	};
};


// func: hasOwnProperty(obj) 
// desc: hasOwnProperty taken from Object.prototype.
// returns: A boolean indicating whether the input has a specified property.
hasOwnProperty = Object.prototype.hasOwnProperty.functionalize();

// func: each(obj, fn, ctx)
// desc: Iterates over each property in obj and calls function fn. Context for the function will
//		 : be obj, but it can be overridden by passing in ctx.
// returns: The modified object after running the function on each property.
//each = function (obj, fn, ctx) {
//	var ctx = ctx || obj;
//
//	for (var propertyName in obj) {
//		hasOwnProperty(obj, propertyName) && fn.call(ctx, obj[propertyName], propertyName, obj);
//	}
//	
//	return obj;
//};

// func: map(obj, fn, ctx)
// desc: This is basically the same as each, but returns a new object and doesn't modify
//		 : the existing one.
// returns: A new object with the function applied to each field.
//map = function (obj, fn, ctx) {
//	var result = isArray(obj) ? [] : {};
//
//	each(obj, 
//			 function (element, propertyName, obj) {
//				 result[propertyName] = fn.call(this, element, propertyName, obj)
//			 }, 
//			 ctx);
//
//	return result;
//};

// func: isDefined(obj)
// desc: Determines whether something is defined.
// returns: A boolean indicating whether the input was defined.
isDefined = isUndefined.not();

// func: eql(a, b)
// desc: Tests if the two params are equal.
eql = function (a, b) {
	return a === b;
};

// func: isNull(obj)
// desc: Tests if the object is null.
isNull = function(obj) {
	return obj === null;
};

// func: isNotNull(obj)
// desc: Tests if the object is not null.
isNotNull = isNull.not();

// func: isFalse(obj)
// desc: Tests if an object is false.
isFalse = eql.curry(false);

// func: absorb(dest, src, more)
// desc: Copies all the properties of src to dest.
// returns: The modified destination object.
absorb = function (dest, src, more) {
	each(src, function (element, propertyName) {
		dest[propertyName] = element;
	});

	return isDefined(more) ? arguments.callee.apply(this,[dest].concat(slice(arguments,2))) : dest;
};

pred = function (value) {
	if (typeof value === 'number') {
		return value - 1;
	} else {
		throw Error('pred is not fully implemented');
	}
};

succ = function (value) {
	if (typeof value === 'number') {
		return value + 1;
	} else {
		throw Error('succ is not fully implemented');
	}
};

range = function (from,to) {
	return object({
		from: from,
		to: to,
		each: function (fn,ctx) {
			var from = this.from,
				to = this.to,
				current = from,
				i = 0,
				iterator = to < from ? pred : succ;
			while (current !== to) {
				if (fn.call(ctx,current,i,this) === false) {
					return false;
				}
				current = iterator(current);
				i++;
			}
			return this;
		}
	});
};

absorb(String.prototype,
			{
				lines: function () {
					return this.split(/[\f\n\r]/);
				},
				words: function () {
					return this.split(/\s*\b\s*/);
				}
			});

absorb(Number.prototype,{
	constrain: function (l,u) {	return this.reduce(function (current, element) {
											 current.indexOf(element) === -1 && current.push(element);
										 }, []);
		return this > l && this < u ? this : this < l ? l : u;
	}
});

absorb(Function.prototype,{
	swap: function () {
		var fn = this;
		return function () {
			return fn.apply(this,reverse(arguments));
		};
	},
	taking: function (n) {
		var fn = this;
		return function () {
			return fn.apply(this,slice(arguments,0,n));
		};
	},
	compose: function () {
		var fns = [this].concat(toArray(arguments));
		return function (arg) {
			var ctx = this;
			return fns.reduce(function (arg,fn) {
				return fn.call(ctx,arg);
			},arg);
		};
	}
});
