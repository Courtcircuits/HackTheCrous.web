import { useEffect, useRef, useState } from "react"
import { useQueryClient } from "react-query"
import { v4 } from "uuid"
import { ChatbotMessage } from "../types"
import bcrypt from "bcryptjs"

export const useReactQuerySubscription = () => {
	const queryClient = useQueryClient()
	const websocket = useRef<WebSocket>();
	const [messages, setMessages] = useState<ChatbotMessage[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const threadId = v4()
	useEffect(() => {
		websocket.current = new WebSocket(import.meta.env.VITE_WS_CHATBOT_ENDPOINT || "wss://cf-ai-hackthecrous.radulescutristan.workers.dev/agents/hackthecrous/hackthecrous")

		websocket.current.onmessage = (event) => {
			const data = JSON.parse(event.data)
		    if(data.role === "error") {
					setIsLoading(false)
				    setMessages([...messages, data])
					return
			}
			if (!data.conversationId) return
			const queryKey = ["websocket", ...data.conversationId].filter(Boolean)

			if (data.content) {
				if(data.role === "assistant") {
				    console.log("hey")
					setIsLoading(false)
				}
				console.log("loaded")
				setMessages([...messages, data])
			}
			queryClient.invalidateQueries({ queryKey })
		}

		return () => {
			websocket.current?.close()
		}
	}, [queryClient])

	return {
		send: async (input: string) => {
			setIsLoading(true)
			const salt = await bcrypt.genSalt(10);
			const token = await bcrypt.hash(localStorage.getItem("token") || "", salt)
			websocket.current?.send(JSON.stringify({
				thread_id: threadId,
				content: input,
				token
			}))
		}, messages, isLoading
	}
}
