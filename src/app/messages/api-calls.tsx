export async function updateMessage(id: string) {
  try {
    return await fetch(
      `/api/message?id=null&family=null&areaCode=null&institutionCode=null&type=null&date=null`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, status: "05" }),
      }
    ).then((res) => res.json());
  } catch (error) {
    console.error("Error al enviar el mensajes", error);
  }
}
