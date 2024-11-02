import { useCallback, useState } from "react"
import { FileWithPath, useDropzone } from "react-dropzone"

type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void
  mediaUrl: string
}

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState(mediaUrl)

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles)
    fieldChange(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="cursor-pointer flex justify-center items-center gap-4">
        <img
          src={
            fileUrl || "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
          }
          alt="user avatar"
          className="h-24 w-24 rounded-full object-cover object-top"
        />

        <p className="text-blue-500 text-[16px] font-normal leading-[140%] md:text-[20px] md:font-semibold md:tracking-tighter">
          Change Profile Photo
        </p>
      </div>
    </div>
  )
}

export default ProfileUploader
