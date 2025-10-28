import { Bot, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReactQuerySubscription } from "../queries/chatbot.stream";
import { ChatbotMessage } from "../types";
import Message from "../components/Message";
import LoadingChatbot from "../components/LoadingChatbot";
import EmptyChatbot from "../components/EmptyChatbot";
import { AnimatePresence } from "framer-motion";

export default function CroustyPage() {
	const { send, messages: incomingMessages, isLoading } = useReactQuerySubscription();
    const messagesDiv = useRef<HTMLDivElement>(null);
	const [messages, setMessages] = useState<ChatbotMessage[]>([]);
	const [currentMessage, setCurrentMessage] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [enabled, setEnabled] = useState(false);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await send(currentMessage);
		setCurrentMessage("");
	};

    const handleSetPassword = (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			localStorage.setItem("token", password);
			setEnabled(true)
	}

	useEffect(() => {
		incomingMessages.forEach(message => {
		    if(message.role === "error" && message.content === "Invalid token") {
				localStorage.setItem("token", "")
				setEnabled(false)
			}else {
				setMessages([...messages, message])
			}
		})

	}, [incomingMessages])

	useEffect(() => {
		if(messagesDiv.current) {
				messagesDiv.current.scroll({
						behavior: 'smooth',
						top: messagesDiv.current.scrollHeight + 200
				})
		}
	}, [incomingMessages, messagesDiv])

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			if (token !== "") {
				setEnabled(true);
			} else {
				setEnabled(false);
			}
		} else {
			setEnabled(false);
		}
	}, [])

	useEffect(() => {
		if(messagesDiv.current) {
				messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
		}
	}, [messagesDiv])

	if (!enabled) {
		return (
			<div className="col-span-12 flex flex-col items-center justify-center h-[40vw] gap-4">
				<div className="flex flex-col items-center justify-center">
					<Bot width={40} height={40} color="white" />
					<h2 className="font-bold text-xl">[401] this feature is in beta so you need a password to access it.</h2>
				</div>
				<form className="flex flex-row items-center w-1/2 h-content bg-tint200 rounded-[10px] px-5 py-6" onSubmit={handleSetPassword}>
					<input type="password" className="bg-transparent outline-none text-tint900  caret-primary font-medium text-xl focus:border-primary w-full" autoFocus placeholder='Enter the password...' value={password} onChange={(e) => setPassword(e.target.value)} />

					<button>
						<ChevronUp color="white" />
					</button>
				</form>
			</div>
		)

	}



	return (
		<div className="col-span-12 flex flex-col items-center">
			<div className="w-3/4 h-[50vw] flex flex-col justify-between items-left gap-4">
				<div className="flex flex-col gap-2 overflow-y-scroll w-full" ref={messagesDiv}>
					<AnimatePresence initial={false}>
						{messages.map((message, index) => (
							<Message content={message} key={index} />
						))}
						{
							isLoading && <LoadingChatbot />
						}
					</AnimatePresence>
				</div>

				{
					messages.length === 0 &&
					<EmptyChatbot />
				}
				<form className="flex flex-row items-center w-full h-content bg-tint200 rounded-[10px] px-5 py-6" onSubmit={handleSubmit} >
					<input type="text" className="bg-transparent outline-none text-tint900  caret-primary font-medium text-xl focus:border-primary w-full" autoFocus placeholder='Ask crousty...' value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
					<button>
						<ChevronUp color="white" />
					</button>
				</form>
			</div>
		</div>
	)
}
