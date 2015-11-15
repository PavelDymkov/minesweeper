export default () => `${ hex(8) }-${ hex(4) }-${ hex(4) }-${ hex(4) }-${ hex(12) }`;

function hex(count) {
	let hexString = Math.random().toString(16).substring(2);
	let length = hexString.length;

	if (count > length)
		return hexString + hex(count - length);

	return hexString.substring(0, count);
}