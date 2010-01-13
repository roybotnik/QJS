// section: Function.prototype
// desc: Additions to the function prototype.

// func: bind(context)
// desc: 
Function.prototype.bind = function (ctx) {
	var args = slice(arguments,1);
	var	fn = this;

	return function () {
		return fn.apply(ctx, args.concat(toArray(arguments)));
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
// desc: Implementation of indexOf for platforms that don't have it built in.
// returns: Index of the specified element in an array. -1 if the item isn't in the array.
(function () {
	if (!'indexOf' in Array.prototype) {
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
	}
})();
// endsection
