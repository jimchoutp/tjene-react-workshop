import React from "react";

import { getPageParam } from "../../api/utilities/url";
import { RECORDS_PER_PAGE } from "../../api/constants";
import styles from "./Pagination.module.css";

interface Props {
  count: number;
  page: number;
  prevPageUrl: string | null;
  nextPageUrl: string | null;
  setPage(page: number): void;
}

export default function Pagination({
  count,
  page,
  prevPageUrl,
  nextPageUrl,
  setPage
}: Props) {
  const prevPage = getPageParam(prevPageUrl);
  const nextPage = getPageParam(nextPageUrl);

  const paginationMarkup = (
    <div className={styles.Root}>
      <span className={styles.Description}>
        {`Total people ${count}, Page ${page}, Result ${(page - 1) *
          RECORDS_PER_PAGE +
          1} - ${RECORDS_PER_PAGE * page}`}
      </span>
      {prevPage ? (
        <button onClick={() => setPage(prevPage)}>Previous Page</button>
      ) : (
        <button disabled>Previous Page</button>
      )}
      {nextPage ? (
        <button onClick={() => setPage(nextPage)}>Next Page</button>
      ) : (
        <button disabled>Next Page</button>
      )}
    </div>
  );

  return paginationMarkup;
}
