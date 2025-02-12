import type { Context } from "@netlify/functions";

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default async (req: Request, context: Context) => {
  const stream = new ReadableStream({

    async pull(controller) {
      const encoder = new TextEncoder();
      
      // Enqueue chunks of data
      controller.enqueue(encoder.encode('Hello '));

      await sleep(2000);

      controller.enqueue(encoder.encode('World!'));
  
      // Close the stream when done
      controller.close();
    }
    
  });
  
  return new Response(stream);
}

