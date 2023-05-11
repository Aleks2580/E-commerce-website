export async function loadFilterItemPagination(obj) {
  const response = await fetch("/get-next-filter-page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
    credentials: "include",
  });
  return response.json();
}
