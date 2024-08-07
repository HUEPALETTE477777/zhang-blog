import React from 'react'
import { FaGithub } from "react-icons/fa";
import { TiSocialYoutube } from "react-icons/ti";

const footer = () => {
  return (
    <div className="flex flex-row items-center gap-4 bg-white mt-14 p-4 justify-center">
        Zhang Blog 2024 Smoke Weed Footer <FaGithub /> <TiSocialYoutube />
    </div>
  )
}

export default footer