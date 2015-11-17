import getUUID from "./uuid.es6";


export default function Enum(template) {
	let [string] = template;
	let keys = string.trim().split(separator);
	let enumeration = Object.create(null);

	keys.forEach(fill, enumeration);

	return Object.freeze(enumeration);
};

let separator = /\s+|(\s*,\s*)/;

function fill(key) {
	this[key] = getUUID();
}