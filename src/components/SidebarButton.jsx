import React from 'react'

export default function Sidebar(props) {
  return (
    <div>
        <button 
          className={`sidebar_button ${props.activeIndex === props.index && "active"}`}
          onClick={() => props.handleIndexChange(props.index)}
        >{props.name}</button>
    </div>
  )
}
