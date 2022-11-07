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
