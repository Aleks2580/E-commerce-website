export default async function geItemForBottomMainBlock() {
  const res = await fetch('/get-item-main-bottom', {
    method: 'GET',
    credentials: 'include',
  });
  return res.json()
}
