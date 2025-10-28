import { Bot } from "lucide-react";
import { useEffect, useState } from "react";

export default function LoadingChatbot() {
	const texts = ["Crousty is thinking", "Crousty is thinking.", "Crousty is thinking..", "Crousty is thinking..."]
	const [seq, setSeq] = useState(0);


	useEffect(() => {
			const interval = setInterval(() => {
				if (seq >= texts.length - 1) {
					setSeq(0)
				} else {

					setSeq(seq + 1)
				}

			}, 1000)
			return () => clearInterval(interval)
	}, [seq])


	return (
		<div className="w-full h-full flex flex-row items-center gap-1 opacity-70">
			<Bot color="white" />
			<p className="text-xl text-white font-bold">{texts[seq]}</p>
		</div>
	)
}

