import getUUID from "./uuid.es6";


export default function Enum(template) {
	let [string] = template;
	let keys = string.trim().split(separator);
	let types = Object.create(null);

	keys.forEach(fill, types);

	return Object.freeze(types);
};

let separator = /\s+|(\s*,\s*)/;

function fill(key) {
	this[key] = getUUID();
}