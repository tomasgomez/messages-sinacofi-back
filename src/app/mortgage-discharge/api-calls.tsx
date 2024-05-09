export async function getForeClosureDataCards(filters?: any[]) {
  const baseUrl = window.location.origin;
  let url = `${baseUrl}/api/message/foreclosure`;
  const newFilters = filters?.slice() || [];
  if (newFilters && newFilters.length > 0) {
    url = url + `?${newFilters[0].label}=${newFilters[0].value}`;
    newFilters.shift();
    newFilters.forEach((filter) => (url += `&${filter.label}=${filter.value}`));
  }
  const response = await fetch(url);
  return await response.json();
}

export async function updateForeClosureMessage(
  cukCode?: string,
  status?: string
) {
  try {
    const baseUrl = window.location.origin;
    (
      await fetch(`${baseUrl}/api/message/foreclosure`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cukCode: cukCode, status: status }),
      })
    ).json();
  } catch (error) {
    console.error("Error al enviar el mensajes", error);
  }
}
