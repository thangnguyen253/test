/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios"
import { CLOUDINARY_PRESET, CLOUDINARY_UPLOAD_URL } from "./apiConfig"

export const cloudinaryUpload = async (photo) => {
  const data = {
    file: photo,
    upload_preset: CLOUDINARY_PRESET,
  }

  try {
    const imgUrl = (await axios.post(CLOUDINARY_UPLOAD_URL, data)).data.secure_url
    return imgUrl
  } catch (err) {
    console.log(err.response)
  }
}
