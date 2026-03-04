const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function nestAPI(path: string, body: unknown) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}
