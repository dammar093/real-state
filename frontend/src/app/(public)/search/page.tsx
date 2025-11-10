import dynamic from "next/dynamic";
import React, { Suspense } from "react";
const Search = dynamic(() => import("./_components"));

const SearchPage = () => {
  return (
    <Suspense fallback={null}>
      <Search />
    </Suspense>
  );
};

export default SearchPage;
