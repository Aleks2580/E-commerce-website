export default async function checkItem(obj) {
    const res = await fetch('/check-one-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
      credentials: 'include',
    });
    return res.json();
  }
  