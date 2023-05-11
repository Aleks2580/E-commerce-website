export default async function getItemsFieldsForAdmin() {
  const res = await fetch('/get-fields', {
    method: 'GET',
    credentials: 'include',
  });
  return res.json()
}
