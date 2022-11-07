import { async } from "regenerator-runtime";

import { TIME_OUT_SECOND } from "./config.js";



export const AJAX = async function (url, uploadData = undefined) {
    try {
        const fetchPro = uploadData ? fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(uploadData)

        }) : fetch(url);



        const res = await Promise.race([fetchPro, timeout(TIME_OUT_SECOND)]);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;

    } catch (err) {
        throw (err);

    }

};




const timeout = function () {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after  second`));
        }, 1000);
    });
};




export const numberToFraction = function (amount) {

    if (parseFloat(amount) === parseInt(amount)) {
        return amount;
    }

    const gcd = function (a, b) {
        if (b < 0.0000001) {
            return a;
        }
        return gcd(b, Math.floor(a % b));
    };
    const len = amount.toString().length - 2;
    let denominator = Math.pow(10, len);
    let numerator = amount * denominator;
    var divisor = gcd(numerator, denominator);
    numerator /= divisor;
    denominator /= divisor;
    let base = 0;

    if (numerator > denominator) {
        base = Math.floor(numerator / denominator);
        numerator -= base * denominator;
    }
    amount = Math.floor(numerator) + '/' + Math.floor(denominator);
    if (base) {
        amount = base + ' ' + amount;
    }
    return amount;
};
