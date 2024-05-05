import { useState } from "react"
import { useSignup } from "../hooks/useSignup.jsx"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
      <div className="signup">
    <form  onSubmit={handleSubmit}>
        <div className="space-ship-control-panel">
            <div className= "neon-container">
                <h3 className="neon_log" data-text="U">GALAXYPORT</h3>
            </div>
            <div className="space-ship-image">
                <img src="../moon.jpg" className="earth hover:animate-spin" alt="" />
            </div>
            <div className="input-group">
                <label>Email address:</label>
                <input className="input-label"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div className="input-group">
                <label>Password:</label>
                <input className="input-label"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>


      <button className="btn-sign" disabled={isLoading}>SIGN UP</button>
      {error && <div className="error">{error}</div>}
        </div>
    </form>
      </div>
  )
}

export default Signup