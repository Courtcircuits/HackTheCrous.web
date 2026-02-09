import { Info } from "lucide-react"

interface CalloutProps {
	text: string
}

export default function Callout({
	text
}: CalloutProps) {
	return (
		<div className="flex flex-row bg-primary rounded-full px-3 gap-1 py-1 ml-2">
			<Info width={20} />
			<p className="text-tint0 text-bold ">
				{text}
			</p>
		</div>
	)
}
