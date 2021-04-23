import Cookies from "js-cookie";

export async function csrfFetch(url, options = {}) {
  // set method to get if no method
  options.method = options.method || "GET";
  // set headers to empty object if no headers
  options.headers = options.headers || {};

  // if method is not get, then set content type header to
  // application/json, and set xsrf token header to value of
  // the xsrf-token cookie

  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";
    options.headers["XSRF-Token"] = Cookies.get("XSRF-TOKEN");
  }
  // default window fetch with url and options passed in
  const res = await window.fetch(url, options);
  // if 400 or higher, throw res / error
  if (res.status >= 400) throw res;

  // if under 400 return the res

  return res;
}

// call this to get the 'xsrf-token' cookie, should only be used in development
export function restoreCSRF() {
  return csrfFetch("/api/csrf/restore");
}
