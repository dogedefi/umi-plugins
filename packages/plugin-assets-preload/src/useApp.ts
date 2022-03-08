import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'

const MOBILE_WIDTH = 768
const useAppModel = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [requestConnectFromChat, setRequestConnectFromChat] = useState(false)
  const getWindowScreen = throttle(() => {
    const isMobile = window.innerWidth <= MOBILE_WIDTH || /mobile|ios|android/gi.test(navigator.userAgent)

    // chrome
    if (/chrome/gi.test(navigator.userAgent) && window.innerWidth > MOBILE_WIDTH) {
      setIsMobile(false)
    } else {
      setIsMobile(isMobile)
    }
  }, 100)
  useEffect(() => {
    getWindowScreen()
    window.addEventListener('resize', getWindowScreen, false)
    return () => {
      window.removeEventListener('resize', getWindowScreen, false)
    }
  }, [])
  return { isMobile, requestConnectFromChat, setRequestConnectFromChat }
}

export default useAppModel
