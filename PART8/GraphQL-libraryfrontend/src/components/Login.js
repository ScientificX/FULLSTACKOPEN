import React, {
  useState,
  useEffect
} from 'react'
import {
  useMutation
} from '@apollo/client'
import {
  LOGIN
} from '../queries'

const LoginForm = ({
  show,
  setError,
  setToken
}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
        setError("Inavlid Login : try again?")
        setTimeout(() => setError(null), 3400)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("library-token", token)
    }
  }, [result.data])

  if (!show) {
    return null
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    login({
      variables: { username, password }

    })


  }

  return (
    <>
    <form onSubmit={handleLogin} >
    Username :
            <input
        value={username}
        onChange={({target}) => setUsername(target.value)}
            />
            <input
        value={password}
        onChange={({target}) => setPassword(target.value)}
              />
            <button type="submit" > login </button>
        </form> <
    />

  )
}

export default LoginForm
