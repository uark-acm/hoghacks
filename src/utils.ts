/**
 * src/utils.ts
 * 
 * Author: Alex Prosser 
 * Date: 4/9/2024
 */

/**
 * parses a cookie string, probably from document.cookie, into an object to be read/modified 
 */
const parseCookies = (cookies: string) => {
    let output: Record<string, any> = {};
    cookies.split(/\s*;\s*/).forEach(pair => {
        const tokens = pair.split(/\s*=\s*/);
        const name = decodeURIComponent(tokens[0]);
        const value = decodeURIComponent(tokens.splice(1).join('='));
        output[name] = value;
    });

    return output;
}

/**
 * writes an object, probably from parseCookies, to the DOM object
 */
const writeCookies = (document: Document, cookies: Record<string, any>) => {
    let cookie = '';
    Object.entries(cookies).forEach(([key, value]) => {
        cookie += `${key}=${value}`;
    });
    document.cookie = cookie;
}

export { parseCookies, writeCookies };