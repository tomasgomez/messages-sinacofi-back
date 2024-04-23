export async function getForeClosureDataCards(filters?: any[]) {
  let url = "/api/message/foreclosure";
  if (filters && filters.length > 0) {
    url = url + `?${filters[0].name}=${filters[0].value}`;
    filters.shift();
    filters.forEach((filter) => (url += `&${filter.name}=${filter.value}`));
  }
  const response = await fetch(url);
  return await response.json();
}
