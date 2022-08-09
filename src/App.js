import React, {useState} from 'react'
import createAuthContext from './lib/createAuthContext'

const clientId = process.env.REACT_APP_CLIENT_ID
const clientSecret = process.env.REACT_APP_CLIENT_SECRET
const provider = process.env.REACT_APP_PROVIDER
const tokenEndpoint = process.env.REACT_APP_TOKEN_ENDPOINT

const {AuthContext, Authenticated, useToken} = createAuthContext({
  clientId,
  clientSecret,
  provider,
  tokenEndpoint
})

function ProtectedStuff() {
  return <Authenticated>
    This would be visible only if logged in.
  </Authenticated>
}

const UseTokenWithoutAuthenticated = () => {
  const token = useToken()
  return <p>token={JSON.stringify(token)}</p>
}

function App() {
  const [showProtected, setShowProtected] = useState(false)
  const [showInvalidTokenUse, setShowInvalidTokenUse] = useState(false)

  return (
    <AuthContext>
      <h1>Auth Demo</h1>
      <p>
        We render the app inside an AuthContext.Provider.
        Nothing requires authentication yet.
      </p>
      <p>
        When you push "reveal", we will show something protected,
        you are only supposed to see it after being authenticated.
      </p>
      <button onClick={() => setShowProtected(!showProtected)}>reveal</button>
      { showProtected && <ProtectedStuff/> }
      <h3>Using useToken()</h3>
      <p>
        Push the button below to show a component which uses useToken()
        incorrectly. It will result in a warning on the dev console,
        unless you are authenticated already.
      </p>
      <button onClick={() => setShowInvalidTokenUse(!showInvalidTokenUse)}>show</button>
      { showInvalidTokenUse && <UseTokenWithoutAuthenticated />}
    </AuthContext>
  )
}

export default App
