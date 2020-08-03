import React, { useContext } from "react"
import { ImplementContext, IMPLEMENT_OPTIONS } from "./implementContextProvider"

const ChooseImplement = () => {
  const { implement, setImplement } = useContext(ImplementContext)

  return (
    <div className="choose-implement">
      <form className="choose-implement__form">
        <label>
          <input
            type="radio"
            checked={implement === IMPLEMENT_OPTIONS.STYLUS}
            onChange={({ target }) => {
              if (target.checked) setImplement(IMPLEMENT_OPTIONS.STYLUS)
            }}
          ></input>
          Stylus
        </label>
        <label>
          <input
            type="radio"
            checked={implement === IMPLEMENT_OPTIONS.TOUCH}
            onChange={({ target }) => {
              if (target.checked) setImplement(IMPLEMENT_OPTIONS.TOUCH)
            }}
          ></input>
          Touch
        </label>
        <label>
          <input
            type="radio"
            checked={implement === IMPLEMENT_OPTIONS.MOUSE}
            onChange={({ target }) => {
              if (target.checked) setImplement(IMPLEMENT_OPTIONS.MOUSE)
            }}
          ></input>
          Mouse
        </label>
      </form>
    </div>
  )
}

export default ChooseImplement
