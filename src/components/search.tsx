"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import { RiSearch2Line } from "react-icons/ri";

const Search = ({ search, placeHolder }: { search?: string, placeHolder:string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRender = useRef(true);

  const [text, setText] = useState(search || "");
  const [query] = useDebounce(text, 500);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    //checking for exsisting params
    const params = new URLSearchParams(searchParams.toString());

    if (!query) {
      // If search query is empty, remove the 'search' param
      params.delete("search");

      // If there are still other params, keep them in the URL
      const queryString = params.toString();
      router.push(
        queryString
          ? `${window.location.pathname}?${queryString}`
          : `${window.location.pathname}`
      );
    } else {
      params.set("search", query);
      router.push(`${window.location.pathname}?${params.toString()}`);
    }
  }, [query, router, searchParams]);

  return (
    <Input
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder={placeHolder}
      icon={<RiSearch2Line size={13} />}
      className="bg-primary-foreground text-primary text-xs sm:text-sm py-5 rounded-xl"
    />
  );
};

export default Search;
