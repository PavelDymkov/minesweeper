export default () => [
	getRandomHEX(8),
	getRandomHEX(4),
	getRandomHEX(4),
	getRandomHEX(4),
	getRandomHEX(12)
].join("-");

function getRandomHEX(count) {
	let hex = Math.random().toString(16).substring(2);
	let length = hex.length;

	if (count > length)
		return hex + getRandomHEX(count - length);

	return hex.substring(0, count);
}