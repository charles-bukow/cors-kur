export default {
  async fetch(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Max-Age": "86400",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    const url = new URL(request.url);
    const target = url.searchParams.get("url");

    if (!target) {
      return new Response("Missing ?url=", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const response = await fetch(target);

    const modified = new Response(response.body, response);

    Object.entries(corsHeaders).forEach(([k, v]) => {
      modified.headers.set(k, v);
    });

    return modified;
  },
};