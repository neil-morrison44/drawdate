import React, { useState, createContext } from "react"

const IMPLEMENT_OPTIONS = {
  STYLUS: "stylus",
  TOUCH: "touch",
  MOUSE: "mouse",
}

const ImplementContext = createContext(null)

const ImplementContextProvider = ({ children }) => {
  const [implement, setImplement] = useState(IMPLEMENT_OPTIONS.MOUSE)

  return (
    <ImplementContext.Provider value={{ implement, setImplement }}>
      {children}
    </ImplementContext.Provider>
  )
}
export { IMPLEMENT_OPTIONS, ImplementContext }
export default ImplementContextProvider
