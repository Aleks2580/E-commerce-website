export async function checkItemFromInputInDB(value) {
  const response = await fetch('/check-item', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value }),
    credentials: 'include',
  });
  return response.json();
}
