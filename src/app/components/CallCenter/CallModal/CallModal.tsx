import style from './CallModal.module.css';

export default function CallModal({
  incomingCall,
  answerCall
}: any) {
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <h3>Incoming call</h3>
        <p>{incomingCall.From}</p>
        <div>
          <button onClick={() => answerCall(incomingCall.CallSid)}>Answer</button>
        </div>
      </div>
    </div>
  )
}
