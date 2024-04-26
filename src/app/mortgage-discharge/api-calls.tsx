export async function getForeClosureDataCards(filters?: any[]) {
  let url = "/api/message/foreclosure";
  const newFilters = filters?.slice() || [];
  if (newFilters && newFilters.length > 0) {
    url = url + `?${newFilters[0].label}=${newFilters[0].value}`;
    newFilters.shift();
    newFilters.forEach((filter) => (url += `&${filter.label}=${filter.value}`));
  }
  const response = await fetch(url);
  return await response.json();
}
