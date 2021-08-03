import React from 'react'

export default function Navbar() {
  return (
    <div className="container flex justify-between my-8 mx-auto">
      <div className="text-gray-300">Home</div>
      <div className="flex">
        <div className="mx-8 text-gray-300">Blog</div>
        <div className="text-gray-300">Random</div>
      </div>
    </div>
  )
}
