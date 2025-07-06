"use client"
import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react"
const GenerateProgramPage = () => {

  const[callActive, setCallActive] = useState(false);
  const[connecting, setConnecting] = useState(false);
  const[isSpeaking, setIsSpeaking] = useState(false);
  const[messages, setMessages] = useState([]);
  const[callEnded, setCallEnded] = useState(false);

  const {user} = useUser();
  const router = useRouter();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // auto-scroll messages
  useEffect(() => {
    if(messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // navigate user to profile page after the call ends
  useEffect(() => {
    if(callEnded){
      const redirectTimer = setTimeout(() => {
        router.push("/profile"); 
      }, 1500);
      return () => clearTimeout(redirectTimer);
      
    }
  }, [callEnded,router]);

  //setup event listeners for vapi
  useEffect(() => {

    const handleCallStart = () => {
      console.log("Call started");
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    }
    const handleCallEnd = () => {
      console.log("Call ended");
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    }
    const handleSpeechStart = () => {
      console.log("AI started speaking");
      setIsSpeaking(true);
    }
    const handleSpeechEnd = () => {
      console.log("AI stopped speaking");
      setIsSpeaking(false);
    }
    const handleMessage = () => {

    }
    const handleError = (error:any) => {
      console.log("vapi error", error);
       setConnecting(false);
       setCallActive(false);

    }

    vapi.on("call-start", handleCallStart)
    .on("call-end", handleCallEnd)
    .on("speech-start", handleSpeechStart)
    .on("speech-end", handleSpeechEnd)
    .on("message", handleMessage)
    .on("error", handleError)

    // cleanup event listeners on unmount
    return () =>{
     vapi.off("call-start", handleCallStart)
     .off("call-end", handleCallEnd)
     .off("speech-start", handleSpeechStart)
     .off("speech-end", handleSpeechEnd)
     .off("message", handleMessage)
     .off("error", handleError)
    }
  }, [])

  const toggleCall = async () => {
    if(callActive) vapi.stop();
    else{
      try {
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);
        
         const fullName = user?.firstName
          ? `${user.firstName} ${user.lastName || ""}`.trim()
          : "There";

        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues:{
            full_name: fullName,
            //TODO: need to send user_id as well
          }
        });
      } catch (error) {
        console.log("Failed to start call", error);
        setConnecting(false);
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden pb-6 pt-24">
      <div className="container mx-auto px-4 h-full max-w-5xl">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-mono">
            <span>Generate Your </span>
            <span className="text-primary uppercase">Fitness Program</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Have a voice conversation with our AI assistant to create your personalized plan
          </p>
        </div>

      </div>
    </div>
  )
}

export default GenerateProgramPage