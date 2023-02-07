import React from "react"

// Global header function to show each page's respective header and description
function Header({header, description}) {
    return (
      <>
        <h1>{header}</h1>
        <p>{description}</p>
      </>
    )
}

export default Header