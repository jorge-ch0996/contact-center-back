import Navbar from "../NavBar/NavBar";
import sharedStyles from "../../sharedStyles.module.css";
import style from "./CallCenter.module.css";
import socket from "../../utils/socket";

export default function CallCenter({
  calls
}: any) {
  const answerCall = (callSid: string) => {
    socket.client.emit("answer-call", { callSid });
  }
  return (
    <>
      <Navbar />
      <div className={sharedStyles.container}>
        {
          calls.map((call: any) => (
            <div key={call.CallSid} className={style.call}>
              <div className={
                call.CallStatus === "ringing" ? style.callItemActive : style.callItemInactive
              }>
                <h3>Ringing</h3>
                <p>{call.From}</p>
              </div>
              <div className={
                call.CallStatus === "enqueue" ? style.callItemActive : style.callItemInactive
              }>
                <h3>In queue</h3>
                <p>User waiting in queue</p>
                {
                  call.CallStatus === "enqueue" && (
                    <button className={sharedStyles.successBtn} onClick={(e) => answerCall(call.CallSid)}>Answer call!</button>
                  )
                }
              </div>
              <div className={
                call.CallStatus === "in-progress" ? style.callItemActive : style.callItemInactive
              }>
                <h3>In progress</h3>
                <p>{call.From}</p>
              </div>
              <div className={
                call.CallStatus === "completed" ? style.callItemActive : style.callItemInactive
              }>
                <h3>Call Completed</h3>
                <p>Call had ended</p>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}
