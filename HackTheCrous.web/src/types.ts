import { AssistantMessage, SystemMessage, ToolMessage, UserMessage } from "@mistralai/mistralai/models/components";


export interface Restaurant {
	id: number;
	type: string;
	attributes: {
		name: string;
		url: string;
		hours: string;
		meals: Meal[];
	}
}

export interface Meal {
	id: number;
	type: string;
	foodies: Menu[];
	day: string;
}

export interface Menu {
	content: string[];
	type: string;
}

export interface APIData<T> {
	data: T
}

export interface School {
	school_name: string;
	school_full_name: string;
	distance_km: number;
}


export type MistralMessage = ((SystemMessage & {
	role: "system";
} & ChatbotMessage) | (ToolMessage & {
	role: "tool";
} & ChatbotMessage) | (UserMessage & {
	role: "user";
} & ChatbotMessage) | (AssistantMessage & {
	role: "assistant";
} & ChatbotMessage));




export interface ChatbotMessage {
	content: string;
	role: string;
	conversationId: string;
	peerIP: string; // makes sure that conversation id is not spoofed/stolen
	currentThreadId?: string;
}
