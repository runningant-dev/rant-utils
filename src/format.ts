import pluralize from "pluralize";
import { isString, isValidDate } from "./validate-convert";

export function formatDate(val: string | Date) {
	if (!val) return "";
	
	let dt = val;
	if (isString(val)) {
		const parts = (val as string).split("-");
		const s = [];
		for(let p of parts) {
			if (p.length === 1) p = "0" + p;
			s.push(p);
		}

		dt = new Date(s.join("-"));
	}
	if (isValidDate(dt)) {
		return (dt as Date).toLocaleDateString();
	} else {
		return "";
	}
}
export function formatTime(val: string | Date) {
	const dt: Date = isString(val) ? new Date(val) : val as Date;
    return dt.toLocaleTimeString();
}
export function formatDateTime(val: string | Date) {
	const dt: Date = isString(val) ? new Date(val) : val as Date;
    return dt.toLocaleDateString() + " " + dt.toLocaleTimeString();
}
export function formatHistoricalDate(val: string | Date) {
	if (!val) return "";
	
	const dt: Date = isString(val) ? new Date(val) : val as Date;
	const now = new Date();

	// not concerned about precision - this formatting is a general guide
	const duration = now.valueOf() - dt.valueOf();
	const seconds = duration / 1000;
	const minutes = seconds / 60;
	const hours = minutes / 60;
	const days = hours / 24;
	const months = days / 30;
	const years = days / 365.25;
	
	let text = "";
    if (years >= 1) {
        text = pluralize(" year", Math.floor(years), true) + " ago";
    } else if (months >= 1) {
        text = pluralize(" month", Math.floor(months), true) + " ago";
    } else if (days >= 1) {
        text = pluralize(" day", Math.floor(days), true) + " ago";
    } else if (hours >= 1) {
        text = pluralize(" hour", Math.floor(hours), true) + " ago";
    } else if (minutes >= 1) {
        text = pluralize(" minute", Math.floor(minutes), true) + " ago";
    } else {
        text = "Just now";
    }

	return text;
}

export function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


export function decimalToWords(number: number): string {
    if (number === 0) {
        return "zero";
    }

    if (number < 0) {
        return "minus " + decimalToWords(Math.abs(number));
    }

    let words = "";

    const intPortion = Math.floor(number);
    const fraction = number - intPortion;

    words = numberToWords(intPortion);

    if (fraction > 0) {
        if (intPortion === 0) {
            words += " point";
        }

        const map = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
        const frac = fraction.toString();
        const p = frac.indexOf(".");

        let i = p + 1;
        let lastSigDigit = -1;
        while (i < frac.length) {
            const n = parseInt(frac.charAt(i));
            words += " " + map[n];

            if (n > 0) lastSigDigit = words.length;

            i++;
        }

        if (lastSigDigit > 0 && lastSigDigit < (words.length - 1)) {
            words = words.substring(0, lastSigDigit);
        }
    }

    return words;
}

export function numberToWords(number: number): string {
    if (number === 0) return "zero";

    if (number < 0) return "minus " + numberToWords(Math.abs(number));

    let words = "";

    if (Math.floor(number / 1000000) > 0) {
        words += numberToWords(Math.floor(number / 1000000)) + " million";
        number %= 1000000;
    }

    if (Math.floor(number / 1000) > 0) {
        if (words.length > 0) words += ", ";
        words += numberToWords(Math.floor(number / 1000)) + " thousand";
        number %= 1000;
    }

    if (Math.floor(number / 100) > 0) {
        if (words.length > 0) words += ", ";
        words += numberToWords(Math.floor(number / 100)) + " hundred";
        number %= 100;
    }

    if (number > 0) {
        if (words !== "") words += " and ";

        const unitsMap = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
        const tensMap = ["zero", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

        if (number < 20) {
            words += unitsMap[number];
        } else {
            words += tensMap[Math.floor(number / 10)];
            if ((number % 10) > 0) {
                words += "-" + unitsMap[number % 10];
            }
        }
    }

    return words;
}


export function currencyToWords(number: number) {
    const intPortion = Math.floor(number);
    const fraction = number - intPortion;
    const cents = Math.round(fraction * 100);

    let result = "";

    if (intPortion !== 0) {
        result = decimalToWords(intPortion) + pluralize(" dollar", intPortion);
    }

    if (cents > 0) {
        if (result.length > 0) result += " and ";
        result += decimalToWords(cents) + pluralize(" cent", cents);
    }

    return result;
}