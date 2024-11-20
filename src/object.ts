import { isObject } from "./validate-convert";

// remove id from the object and add back in at the end
export function withoutID(objects: any[], fn: () => void) {
    const ids = [];
    
    // save ids
    for(let i=0;i<objects.length;i++) {
        const o = objects[i];
        ids.push(o.id);
        delete o["id"];
    }

    // run code
    fn();

    // restore ids
    for(let i=0;i<objects.length;i++) {
        const o = objects[i];
        o.id = ids[i];
    }
}

export function mergeObject(obj: any, into: any) {
    if (!into) into = {};
    if (!obj) return into;

    let src = obj;
    let dest = into;

    for(var m in src) {
        const vSrc = src[m];
        let vDest = dest[m];

		if (Array.isArray(vSrc)) {
			dest[m] = vSrc;
			continue;
		}

        if (isObject(vSrc)) {
            if (!isObject(vDest)) {
                vDest = {};
                dest[m] = vDest;
            }
            mergeObject(vSrc, vDest);
            continue;
        } 

        dest[m] = vSrc;
    }

    return into;
}

export function copyTo(src: any, dest: any) {
    for(var m in src) {
        dest[m] = src[m];
    }
}

export function isEqualShallow(a: any, b: any) {
    var key;

    for(key in a) {
        if(a[key] !== b[key]) {
            return false;
        }
    }
    for(key in b) {
        if(a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}

export function getValueFrom(obj: any, prop: string) {
	// prop could be e.g. "name", or ref to array element "cols[0]"
	let arrIndex;

	if (prop.endsWith("]")) {
		const i = prop.lastIndexOf("[");
		arrIndex = prop.substring(i+1, prop.length-1);
		prop = prop.substring(0, i);
	}

	let result = obj[prop];
	if (arrIndex !== undefined) {
		result = result[arrIndex];
	}

	return result;
}

export function getObjectValue(obj: any, prop: string) {
	if (prop.indexOf(".") > 0) {
		const parts = prop.split(".");
		let o: any = obj;
		for(let p of parts) {
			o = getValueFrom(o, p);
			if (o === undefined || o === null) return o;
		}
		return o;
	} else {
		return getValueFrom(obj, prop);
	}
}

interface PropInfo {
	arrayIndex?: number,
	name: string,
}

// find first occurence
export function getFirstObjectValue(obj: any, prop: string): any {

	function find(within: any, prop: PropInfo): any {
	
		const keys = Object.keys(within);

		// does the key exist within this object?
		if (keys.indexOf(prop.name) >= 0) {
			// check that its an array when it should be 
			const v = within[prop.name];
			if ((prop.arrayIndex !== undefined) && Array.isArray(v)) {
				return v[prop.arrayIndex];
			} else if (!prop.arrayIndex) {
				return v;
			}
		}

		// else keep looking through all props 
		for(let k of keys) {
			const v = within[k];
			if (Array.isArray(v)) {
				const a = v as any[];
				for(let item of a) {
					if (isObject(item)) {
						const result = find(item, prop);
						if (result !== undefined) return result;			
					}
				}

			} else if (isObject(v)) {
				const result = find(v, prop);
				if (result !== undefined) return result;	
			}
		}

		return undefined;
	}

	function parseProp(prop: string) {
		let arrayIndex;
		let name = prop;

		if (name.endsWith("]")) {
			const i = name.lastIndexOf("[");
			arrayIndex = Number(name.substring(i+1, prop.length-1));
			name = name.substring(0, i);
		}

		return {
			name,
			arrayIndex,
		};
	}

	const parts = prop.split(".");
	if (parts.length === 1) {
		const propInfo = parseProp(parts[0]);
		return find(obj, propInfo)

	} else {
		// find the first part
		const propInfo = parseProp(parts[0]);
		const start = find(obj, propInfo);
		if (!start) return undefined;

		// now expect exact match from this point on
		parts.splice(0, 1);
		return getObjectValue(start, parts.join("."));
	}

}

export function setObjectValue(obj: any, prop: string, value: any) {
	if (prop.indexOf(".") > 0) {
		const parts = prop.split(".");
		let o: any = obj ? obj : {};

		// NOTE: nav to 2nd last part (the parent)
		for(let i=0;i<parts.length-1;i++) {
			const p = parts[i];
			
			const tmp = getValueFrom(o, p);
			if (tmp === undefined || tmp === null) {
				const newObj = {};
				o[p] = newObj;
				o = newObj;
			} else {
				o = tmp;
			}
		}
		// now set value
		o[parts[parts.length-1]] = value;
	} else {
		obj[prop] = value;
	}
}
