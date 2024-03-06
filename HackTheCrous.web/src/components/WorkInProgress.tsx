export default function WorkInProgress() {
  return (
    <div className="flex flex-col items-center justify-center col-span-12 my-[10%]">
      <h1 className="text-6xl text-tint900 font-semibold">
        <em className="text-primary">[404]</em> Work in Progress
      </h1>
      <p className="text-tint900 text-center mt-4 font-clean mb-4 text-lg">
        <em className="text-primary">Hack The Crous</em> est toujours en cours
        de développement. Je code à fond mais là tu m'en demandes trop le sang.
      </p>
      <a
        href="https://github.com/Courtcircuits/HackTheCrous.web/issues"
        target="_blank"
        rel="noreferrer"
        className="text-primary font-clean mb-6 underline hover:text-tint900"
      >
        Signaler un problème
      </a>
      <img
        src="https://i.imgur.com/hDOfuOx.gif"
        alt="work in progress"
        width="50%"
      />
    </div>
  );
}
