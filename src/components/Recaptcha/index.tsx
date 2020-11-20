import React, { useEffect } from 'react'

const Recaptcha = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    // window.onSubmit = () => alert('reCaptcha')
    document.body.appendChild(script)
  }, [])
  const key = process.env.REACT_APP_RECAPTCHA_API_KEY

  return <div className="g-recaptcha" date-sitekey={key} date-callback="onSubmit" />
}

export default Recaptcha