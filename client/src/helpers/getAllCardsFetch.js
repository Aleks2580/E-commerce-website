export async function getAllCardsFetch(categoryId) {
  const res = await fetch(`/get-items/${categoryId}`, {
    credentials: "include",
  });

  return res.json();
}
