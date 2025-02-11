//====================================
// Server setup
//====================================
export function createServer() {
    const server = sinon.fakeServer.create();
    server.fakeHTTPMethods = true;
    server.getHTTPMethod = function (xhr) {
        return xhr.requestHeaders['X-HTTP-Method-Override'] || xhr.method;
    }
    server.autoRespond = true;
    server.autoRespondAfter = 80;
    server.xhr.useFilters = true;
    server.xhr.addFilter(function (method, url, async, username, password) {
        return url === "/" || url.indexOf("http") === 0;
    })
    return server;
}

//====================================
// Request Handling
//====================================

function parseParams(str) {
    var re = /([^&=]+)=?([^&]*)/g;
    var decode = function (str) {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    };
    var params = {}, e;
    if (str) {
        if (str.substr(0, 1) == '?') {
            str = str.substr(1);
        }
        while (e = re.exec(str)) {
            var k = encodeHTML(decode(e[1]));
            var v = encodeHTML(decode(e[2]));
            if (params[k] !== undefined) {
                if (!Array.isArray(params[k])) {
                    params[k] = [params[k]];
                }
                params[k].push(v);
            } else {
                params[k] = v;
            }
        }
    }
    return params;
}

function getQuery(url) {
    var question = url.indexOf("?");
    var hash = url.indexOf("#");
    if (hash == -1 && question == -1) return "";
    if (hash == -1) hash = url.length;
    return question == -1 || hash == question + 1 ? url.substring(hash) :
            url.substring(question + 1, hash);
}

function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function params(request) {
    if (server.getHTTPMethod(request) == "GET") {
        return parseParams(getQuery(request.url));
    } else {
        return parseParams(request.requestBody);
    }
}
function headers(request) {
    return request.getAllResponseHeaders().split("\r\n").filter(h => h.toLowerCase().startsWith("hx-")).map(h => h.split(": ")).reduce((acc, v) => ({ ...acc, [v[0]]: v[1] }), {})
}

//====================================
// Routing
//====================================

export function init(path, response) {
    onGet(path, response);
    let content = response(null, {});
    let canvas = document.getElementById("demo-canvas");
    if (canvas) {
        canvas.innerHTML = content;
    }
}

export function onGet(path, response) {
    server.respondWith("GET", path, function (request) {
        let headers = {};
        let body = response(request, params(request), headers);
        request.respond(200, headers, body);
    });
}

export function onPut(path, response) {
    server.respondWith("PUT", path, function (request) {
        let headers = {};
        let body = response(request, params(request), headers);
        request.respond(200, headers, body);
    });
}

export function onPost(path, response) {
    server.respondWith("POST", path, function (request) {
        let headers = {};
        let body = response(request, params(request), headers);
        request.respond(200, headers, body);
    });
}

export function onDelete(path, response) {
    server.respondWith("DELETE", path, function (request) {
        let headers = {};
        let body = response(request, params(request), headers);
        request.respond(200, headers, body);
    });
}

