export async function POST(request: Request) {
   
    const response = await request.json()


    const res = await fetch('http://localhost:8888/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(response),
    })
   
    const data = await res.json()
   
    return Response.json(data)
  }