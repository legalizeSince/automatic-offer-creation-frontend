export async function POST(request: Request) {
  const offer = await request.json();

  const res = await fetch(
    "https://price-locator.stromee.de/priceForPostalCode",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offer),
    }
  );

  const data = await res.json();

  return Response.json(data);
}
