interface PreviewProps {
  image: string;
}
export default function Preview({ image }: PreviewProps) {
  return (
    <img className="max-w-[60%] border-2 border-neutral rounded-3xl" src={image} alt="preview" />
  )
}
