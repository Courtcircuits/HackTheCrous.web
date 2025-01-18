export default function SchoolTag({ school }: { school: string }) {
  return (
    <span className="rounded-full border-offwhite border-xs flex flex-row px-2 w-fit gap-2 items-center justify-center h-fit">
      <p className="text-sm truncate">{school}</p>
    </span>
  );
}
