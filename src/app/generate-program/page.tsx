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
    const handleMessage = () => {}
    const handleError = () => {}

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

  return (
    <div>GenerateProgramPage</div>
  )
}

export default GenerateProgramPage