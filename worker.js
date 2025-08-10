export default {
  async fetch(request, env, ctx) {
    if (new URL(request.url).searchParams.get("full") == "true") {
      const response = new Response(JSON.stringify({
        ip: request.headers.get('CF-Connecting-IP'),
        agent: request.headers.get('User-Agent'),
        isp: request.cf.asOrganization,
        isEU: request.cf.isEUCountry,
        location: {
          latitude: request.cf.latitude,
          longitude: request.cf.longitude,

          city: request.cf.city,
          region: request.cf.region,
          country: request.cf.country,
          continent: request.cf.continent,
          postal: request.cf.postalCode,
          timezone: request.cf.timezone,
        }
      }));
      response.headers.set('Content-Type', 'application/json');
      return response;
    }
    return new Response(request.headers.get('CF-Connecting-IP'));
  },
};