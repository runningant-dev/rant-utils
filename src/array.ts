
// if there is an array provided and it has at least 1 element the first is returned
// otherwise if its not an array but is an object then its returned as-is

import { isObject } from "./validate-convert";

// otherwised undefined
export function first(array: any) {
    if (!array) return undefined;

	if (Array.isArray(array)) {
		if (array.length > 0) return array[0];
		return undefined;
	} else if (isObject(array)) {
		return array;
	}

    return undefined;
}
