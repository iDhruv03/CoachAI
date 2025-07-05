import { httpRouter, httpAction } from "convex/server";

import api from "./_generated/api"
import {Webhook} from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

const http = httpRouter();

http.route({
    path:"/clerk-webhook",
    method: "POST",
    handler: httpAction(async(ctx:any, request:Request) => {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET; 
        if (!webhookSecret) {
            throw new Error("CLERK_WEBHOOK_SECRET is not set");
        }
        const svix_id = request.headers.get("svix-id");
        const svix_timestamp = request.headers.get("svix-timestamp");
        const svix_signature = request.headers.get("svix-signature");

        if (!svix_id || !svix_timestamp || !svix_signature) {
            throw new Error("Missing svix headers");
        }
        const payload = await request.json();
        const body = JSON.stringify(payload); 
        const wh = new Webhook(webhookSecret);
        let evt: WebhookEvent;

        try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occurred", { status: 400 });
    }

    const eventType = evt.type;
    if(eventType === "user.created") {
        const {id,first_name,last_name,image_url,email_addresses} = evt.data;
        const email = email_addresses[0].email_address;
        const name = `${first_name || ""} ${last_name || ""}`.trim();
        try {
            await ctx.runMutation(api.users.syncUser, {
                email,
                name,
                image: image_url,
                clerkId: id,
            })
        } catch (error) {
            
        }
    } else if(eventType === "user.updated") {
        
    }
    })
})