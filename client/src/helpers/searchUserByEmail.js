export async function searchUserByEmail(email) {
  const res = await fetch('/search-by-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
    credentials: 'include',
  });
  return res.json();
}
