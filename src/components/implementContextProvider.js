import React, { createContext } from "react"
import useLocalStorage from "react-use-localstorage"

const IMPLEMENT_OPTIONS = {
  STYLUS: "stylus",
  TOUCH: "touch",
  MOUSE: "mouse",
}

const ImplementContext = createContext(null)

const ImplementContextProvider = ({ children }) => {
  const [implement, setImplement] = useLocalStorage("dd-implement", IMPLEMENT_OPTIONS.MOUSE)

  return (
    <ImplementContext.Provider value={{ implement, setImplement }}>
      {children}
    </ImplementContext.Provider>
  )
}
export { IMPLEMENT_OPTIONS, ImplementContext }
export default ImplementContextProvider
