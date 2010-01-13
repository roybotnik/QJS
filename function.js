// section: Function.prototype
// desc: Additions to the function prototype.

// func: bind(context, args)
// desc: Returns a new function that is bound to a new context and the provided arguements.
Function.prototype.bind = function (ctx) {
	var args = slice(arguments,1);
	var	fn = this;
	return function () {
		return fn.apply(ctx, args.concat(toArray(arguments)));
	};
};

// func: curry(args)
// desc: returns a new function that is bound to the provided arguements.
Function.prototype.curry = function () {
	return this.bind.apply(this,[null].concat(toArray(arguments)));
};

// func: not()
// desc: Negates the results of calling this function.
Function.prototype.not = function () {
	var fn = this;
	return function () {
		return !fn.apply(this,arguments);
	};
};

// func: getArity()
// desc: Gets the arity (number of args) of this function.
Function.prototype.getArity = function () {
	return this.arity || this.length;
};

// endsection
