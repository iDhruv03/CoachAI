  "use client"

  import { ClerkProvider, useAuth } from "@clerk/nextjs";
  import { ConvexReactClient } from "convex/react";
  import { ConvexProviderWithClerk } from "convex/react-clerk";

  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  function ConvexClerkProvider({children}) {
    return(
        <ClerkProvider>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>

                </ConvexProviderWithClerk>
            </ClerkProvider>
    )
  }