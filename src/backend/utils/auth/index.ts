export const parseCookies = (name: string) => {
    const cookies: {[key: string]: string } = {};
    name.split(';').forEach(cookie => {
        const [name, ...rest] = cookie.split('=');
        const value = rest.join('=').trim();
        if (name && value) {
          cookies[name.trim()] = decodeURIComponent(value);
        }
      });

    return cookies;
}
