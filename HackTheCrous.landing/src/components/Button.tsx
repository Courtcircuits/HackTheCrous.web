interface ButtonProps {
  text: string;
  type: "primary" | "secondary";
  to: string;
  style?: string;
}


export default function Button({ text, type, to, style }: ButtonProps) {
  const style_variable = type === "primary" ? 
  "border-1 border-white bg-half-tone text-primary hover:bg-accent hover:text-base-100": 
  "border-white bg-primary text-white border-1 hover:bg-transparent hover:text-accent";
  
  return (
    <a 
      className={`px-4 ease-in-out duration-300 block font-sans backdrop-blur-2xl font-medium h-fit pt-1 pb-2 text-xl text-white rounded-full ${style} ${style_variable}`}
      href={to}
    >
      {text}
    </a>
  )
}
