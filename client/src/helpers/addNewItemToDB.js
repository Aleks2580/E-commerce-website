export default async function addNewItemToDB(newItem) {
  await fetch('/add-new-item', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newItem }),
    credentials: 'include',
  });
}
