export default async function updateUserStatus(newStatus) {
  const res = await fetch('/update-status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newStatus),
    credentials: 'include',
  });
  return res.json();
}
