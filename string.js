// section: String.prototype
// desc: Methods added to all strings.

// func: capitalize()
// desc: returns a copy of the string with the first letter capitalized and the rest lowercase.
String.prototype.capitalize = function () {
	return this.substring(0,1).toUpperCase() + this.substring(1,this.length).toLowerCase();
};
// endsection
