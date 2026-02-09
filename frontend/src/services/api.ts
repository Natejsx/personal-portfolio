const BASE_URL = 'http://localhost:4000/api';

export async function getHello() {
  const res = await fetch(`${BASE_URL}/hello`);
  const data = await res.json();
  return data.message;
}
