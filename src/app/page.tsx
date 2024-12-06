"use client"

import * as twilio from "twilio-client"
import { useEffect, useState } from "react";
import Login from "./components/Login";
import styles from "./page.module.css";
import axios from "./utils/axios";
import socket from "./utils/socket";
import CallCenter from "./components/CallCenter/CallCenter";
import useAuthGuard from "./hooks/useAuthGuard";

export default function Home() {
  const [calls, setCalls] = useState([] as any[]);
  const [storedToken, setStoredToken, isAuthenticated] = useAuthGuard(null);
  const [twilioToken, setTwilioToken] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      socket.addToken(storedToken);
    } else {
      socket.removeToken();
    }
  }, [isAuthenticated, storedToken]);

  useEffect(() => {
    if (twilioToken) {
      connectTwilioVoiceClient(twilioToken);
    }
  }, [twilioToken]);

  useEffect(() => {
    socket.client.on("connect", () => {
      console.log("Socket connected");
    })
    socket.client.on("disconnect", () => {
      console.log("Socket disconnected");
    })
    socket.client.on("twilio-token", (data: any) => {
      setTwilioToken(data.token);
    })
    socket.client.on("call-new", (data: any) => {
      setCalls((prevState: any) => {
        const callFound = prevState.findIndex((call: any) => call.CallSid === data.CallSid);
        if (callFound === -1) {
          return [...prevState, data];
        } else {
          return [...prevState];
        }
      })
    })
    socket.client.on("enqueue-call", (data: any) => {
      setCalls((prevState: any) => {
        console.log(prevState)
        const callFound = prevState.findIndex((call: any) => call.CallSid === data.CallSid);
        if (callFound !== -1) {
          prevState[callFound].CallStatus = "enqueue";
        }
        return [...prevState];
      })
    })
    socket.client.on("answered-call", (data: any) => {
      setCalls((prevState: any) => {
        const callFound = prevState.findIndex((call: any) => call.CallSid === data.CallSid);
        if (callFound !== -1) {
          prevState[callFound].CallStatus = "in-progress";
        }
        return [...prevState];
      })
    })
    socket.client.on("call-completed", (data: any) => {
      setCalls((prevState: any) => {
        const callFound = prevState.findIndex((call: any) => call.CallSid === data.CallSid);
        if (callFound !== -1) {
          prevState[callFound].CallStatus = "completed";
        }
        return [...prevState];
      })
    })
    return () => {}
  }, [socket.client]);

  const [user, setUser] = useState({
    userName: "",
    phoneNumber: "",
    verificationCode: "",
    isVerificationCodeSend: false,
  });

  const sendVerification = async (event: any) => {
    event.preventDefault();
    const resp = await axios.post("/verification-code", user)
    if (resp.status === 200 && resp.data.status && resp.data.status === "pending") {
      setUser((prevState) => ({
        ...prevState,
        isVerificationCodeSend: true,
      }));
    }
  }

  const verifyCode = async (event: any) => {
    event.preventDefault();
    const resp = await axios.post("/verify", {
      userName: user.userName,
      phone: user.phoneNumber,
      code: user.verificationCode
    })
    if (resp.status === 200 && resp.data.status && resp.data.status === "approved") {
      setStoredToken(resp.data.token);
    }
  }

  const connectTwilioVoiceClient = async (twilioToken: string) => {
    const device = new twilio.Device(twilioToken, { debug: true });
    device.on("error", (error) => {
      console.log("Twilio device error", error);
    })
    device.on("incoming", (connection) => {
      console.log("Incoming call", connection);
      connection.accept();
    });
  }

  return (
    <div className={styles.page}>
      {
        isAuthenticated ? (
          <CallCenter calls={calls} />
        ) : (
          <Login
            user={user}
            setUser={setUser}
            sendVerification={sendVerification}
            verifyCode={verifyCode}
          />
        )
      }
    </div>
  );
}
