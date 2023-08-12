import { useRouter } from "next/router"
import { useRef, useState } from 'react'

export default function Login() {
  const router = useRouter()
  const emailInput = useRef()
  const passwordInput = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInput.current.value
    const password = passwordInput.current.value

    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    if (response.ok) {
      return router.push("/admin")
    }
  }

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit}>
       <div className="header_logo">
          <img src="/admin/seo.svg" alt="" />
          <span><b>ALFA</b> Admin Panel</span>
        </div>
        <div>
          <label>
            <span>Логин</span> <input type="text" ref={emailInput} />
          </label>
        </div>
        <div>
          <label>
          <span>Пароль</span> <input type="password" ref={passwordInput} />
          </label>
        </div>
        <div className="loginButton">
          <button type="submit">Войти</button>
        </div>
      </form>
    </div>  
  )
}