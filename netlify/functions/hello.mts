import type { Context } from "@netlify/functions";



export default async (req: Request, context: Context) => {
  const stream = new ReadableStream({
    start(controller) {
      // TextEncoder to convert strings to Uint8Array
      const encoder = new TextEncoder();
      
      // Enqueue chunks of data
      controller.enqueue(encoder.encode('Hello '));
      controller.enqueue(encoder.encode('World!'));
  
      // Close the stream when done
      controller.close();
    }
  });
  
  return new Response(stream);
}

