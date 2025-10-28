import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SearchIcon from "../assets/icons/Search";
import { useSearchRestaurant } from "../queries/restaurant.queries";
import { Restaurant } from "../types";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [value, setValue] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  const handleShortcuts = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setFocused(true);
      }

      if (e.key === "Escape") {
        if (focused) {
          e.preventDefault();
          setFocused(false);
        }
      }
    },
    [setFocused, focused]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleShortcuts);
    return () => window.removeEventListener("keydown", handleShortcuts);
  }, [handleShortcuts]);

  return (
    <AnimatePresence>
      <div className="h-20 bg-bgOff col-span-12 sm:col-span-10 flex flex-row items-center justify-center rounded-lg px-5 border-tint200 border-2">
        <SearchIcon />
        <input
          className="flex-grow overflow-hidden bg-transparent outline-none mx-2 text-tint900 font-clean"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Recherche un plat, un restaurant..."
        />
        <p className="text-offwhite">Ctrl+k</p>
      </div>
      {focused && <FloatingSearchBar key="modal" setFocused={setFocused} />}
    </AnimatePresence>
  );
}

function FloatingSearchBar({
  setFocused,
}: {
  setFocused: (focused: boolean) => void;
}) {
  const [value, setValue] = useState<string>("");
  const { data, error } = useSearchRestaurant(value, 300);
  const mainElt = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [setFocused]);
  return (
    <motion.div
      key="modal"
      className="fixed top-0 left-0 w-full h-full bg-bgOff bg-opacity-90 flex flex-col items-center pt-[5%] z-50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      onClick={(e) => {
        if (mainElt.current && !mainElt.current.contains(e.target as Node)) {
          setFocused(false);
        }
      }}
    >
      <div
        ref={mainElt}
        className=" bg-tint100 col-span-8 rounded-lg px-5 w-[90%] sm:w-1/2 border-offwhite border-2 max-h-full sm:max-h-[90%]"
      >
        <span className="flex flex-row items-center justify-center py-4">
          <SearchIcon />
          <input
            autoFocus
            className="flex-grow bg-transparent outline-none mx-2 text-tint900 font-clean overflow-hidden"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Recherche un plat, un restaurant..."
          />
          <p className="text-offwhite">Esc</p>
        </span>
        {data ? (
          data.length > 0 ? (
            <SearchResultsContainer
              results={data}
              query={value}
              setFocused={setFocused}
            />
          ) : null
        ) : error ? (
          <p>Something went wrong</p>
        ) : null}
      </div>
    </motion.div>
  );
}

function SearchResultsContainer({
  results,
  query,
  setFocused,
}: {
  results: Restaurant[];
  query: string;
  setFocused: (focused: boolean) => void;
}) {
  return (
    <div className="overflow-y-scroll max-h-[80%]">
      <hr className="text-offwhite" />
      <h3 className="text-tint900 text-2xl font-bold mt-5 pb-6 border-b-[0.5px] border-b-offwhite">
        Résultats pour "{query}"
      </h3>
      <ul className="pb-3 ">
        {results.map((restaurant) => {
          const substringMatchingQuery = restaurant.attributes.name
            .toUpperCase()
            .indexOf(query.toUpperCase());

          let left = "";
          let matching = "";
          let right = "";
          if (substringMatchingQuery !== -1) {
            left = restaurant.attributes.name.slice(0, substringMatchingQuery);
            matching = restaurant.attributes.name.slice(
              substringMatchingQuery,
              substringMatchingQuery + query.length
            );
            right = restaurant.attributes.name.slice(
              substringMatchingQuery + query.length
            );
          } else {
            left = restaurant.attributes.name;
          }

          return (
            <li
              key={restaurant.id}
              className="text-tint900 py-4 pb-6 border-b-[0.5px] border-b-offwhite last:border-b-0 hover:text-primary"
            >
              <Link
                to={`/restaurant/${restaurant.id}?q=${query}`}
                className="text-3xl"
                onClick={() => {
                  setFocused(false);
                }}
              >
                {left}
                <span className="text-primary">{matching}</span>
                {right}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
