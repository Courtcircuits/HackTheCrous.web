import { motion } from "framer-motion";
import CloseTagIcon from "../assets/icons/CloseTag";

interface TagProps {
  label: string;
  selected: boolean;
  setSelected: (selected: boolean) => void;
}

export default function Tag({ label, selected, setSelected }: TagProps) {
  if (selected) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={() => setSelected(false)}
        className="bg-primary rounded-full px-3 py-1 text-tint0 text-sm flex flex-row items-center justify-center first:ml-0 ml-2 border-2 border-primary"
      >
        {label}
        <span className="ml-2">
          <CloseTagIcon />
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={() => setSelected(true)}
      className="bg-slightwhite rounded-full px-3 py-1 text-sm text-tint900 border-2 border-tint900 first:ml-0 ml-2 opacity-50 hover:opacity-100 transition duration-300 ease-in-out"
    >
      {label}
    </motion.div>
  );
}
