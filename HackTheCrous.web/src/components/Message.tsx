import Markdown from "react-markdown";
import { ChatbotMessage } from "../types";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";

interface MessageProps {
	content: ChatbotMessage;
}

export default function Message({ content }: MessageProps) {
	if (content.role === "assistant") {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="flex flex-row">
				<Bot width={25} height={25} color={"white"} strokeWidth={2} />
				<div className="ml-2 flex flex-col">
					<Markdown>{content.content}</Markdown>
				</div>
			</motion.div>
		)
	}
	if (content.role === "user") {
		return (
			<motion.div


				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="flex flex-row justify-end">
				<div className="px-4 py-2 rounded-[10px] bg-tint200 fit-content">
					<Markdown>{content.content}</Markdown>
				</div>
			</motion.div>
		)
	}
	return (
		<Markdown >{content.content}</Markdown>
	)
}
