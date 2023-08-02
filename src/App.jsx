import React, { useState } from "react";
import SidebarButton from "./components/SidebarButton";


const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: "deg"
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: "%"
  },
  
]

export default function App() {
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const [activeOptionIndex, setActiveOptionIndex] = useState(0)
  const activeOption = options[activeOptionIndex]
  const [selectedImage, setSelectedImage] = useState(null);
  let sliderValue = 1


  function handleSliderChange(event) {
    
    setOptions(prevOption => {
      const updatedOptions = prevOption.map((option, index) => {
        if (activeOptionIndex === index) return {...option, value: event.target.value}
        return option
      })
      return updatedOptions
    })
  }

  function handleIndexChange(index) {
    setActiveOptionIndex(index)
    sliderValue = activeOption.value
  }

  function getImageStyle() {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })
    return { filter: filters.join(" ") }
  }

  function handleImageUpload(event) {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    console.log(imageUrl)
    setSelectedImage(imageUrl);
  }

  return(
    <div className="main">
      <div className="navbar_container">React Photoshop</div>
      <div className="photo_container">
      <div className="photo_container">
        {selectedImage && ( // Use selectedImage if available, otherwise use the default image
          <img className="image_to_edit" src={selectedImage} style={getImageStyle()} alt="Uploaded" />
        )}
      </div>
      </div>
      <div className="slider_container">
        <input 
          type="range" 
          min={activeOption.range.min}
          max={activeOption.range.max}
          step="0.01"
          value={activeOption.value}
          onChange={handleSliderChange}
        />
      </div>
      <div className="sidebar_container">
        {options.map((option, index) => (
          <SidebarButton 
            key = {index}
            index = {index}
            activeIndex = {activeOptionIndex}
            name = {option.name}
            handleIndexChange = {handleIndexChange}
          />
        ))}
      </div>
      <div className="upload_container">
        <label htmlFor="image-upload" className="upload_label">
          Upload Image
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
    </div>
  )
}