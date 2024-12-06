import sharedStyles from "../sharedStyles.module.css";

export default function Login({
  user: {
    userName,
    phoneNumber,
    verificationCode,
    isVerificationCodeSend,
  },
  setUser,
  sendVerification,
  verifyCode
}: any) {
  const populateFields = (event: any) => {
    event.preventDefault();
    const { value, name } = event.target;
    setUser((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  }
  return (
    <div className={sharedStyles.container}>
      <h1>Login into your account</h1>
      {
        !isVerificationCodeSend && (
          <form onSubmit={(event) => sendVerification(event)}>
            <div className={sharedStyles.inputCont}>
              <label htmlFor="userName">Username</label>
              <input
                type="tel"
                placeholder="userName"
                value={userName}
                name="userName"
                onChange={(event) => populateFields(event)}
              />
            </div>
            <div className={sharedStyles.inputCont}>
              <label htmlFor="phone">Phone number</label>
              <input
                type="text"
                placeholder="Phone"
                value={phoneNumber}
                name="phoneNumber"
                onChange={(event) => populateFields(event)}
              />
            </div>
            <button className={sharedStyles.primaryBtn} type="submit">Login</button>
          </form>
        )
      }
      {
        isVerificationCodeSend && (
          <form onSubmit={(event) => verifyCode(event)}>
            <div className={sharedStyles.inputCont}>
              <label htmlFor="phone">Verification code</label>
              <input
                type="text"
                placeholder="Verification code"
                value={verificationCode}
                name="verificationCode"
                onChange={(event) => populateFields(event)}
              />
            </div>
            <button className={sharedStyles.primaryBtn} type="submit">Verify</button>
          </form>
        )
      }
    </div>
  );
}
