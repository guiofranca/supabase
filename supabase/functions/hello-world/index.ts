import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

console.log("Hello from Functions!")

serve(async (req: Request) => {
  let name = '';
  await req.json().then((value) => {
    name = value.name;
  }).catch(reason => {
    console.log(reason);
    name = 'John Doe';
  });

  const data = {
    message: `Hello ${name}! Yeah`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})
