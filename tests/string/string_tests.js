console.log('Testing string.js');

console.log('test: String.prototype.capitalize');
if("this".capitalize() !== "This") {
	throw "capitalize didn't work";
}
if("123abc".capitalize() !== "123abc") {
	throw "capitalize didn't work";
}
if("tHis Is ALL wrONG".capitalize() !== "This is all wrong") {
	throw "capitalize didn't work";
}
