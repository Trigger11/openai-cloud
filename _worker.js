export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const actualUrlStr =
      url.pathname.replace("/proxy/", "") + url.search + url.hash;
    const actualUrl = new URL(actualUrlStr);
    const modifiedRequest = new Request(actualUrl, {
      headers: request.headers,
      method: request.method,
      body: request.body,
      redirect: "follow",
    });
    const response = await fetch(modifiedRequest);
    const modifiedResponse = new Response(response.body, response);
    modifiedResponse.headers.set("Access-Control-Allow-Origin", "*");
    return modifiedResponse;
  },
};
