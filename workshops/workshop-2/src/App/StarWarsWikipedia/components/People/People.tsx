import React from "react";

import api from "../../api/swapi-wrapper";
import { DataWithPagination, People as PeopleType } from "../../api/types";
import { Person } from "./components";
import Pagination from "../Pagination";
import styles from "./People.module.css";

export default function People() {
  const [data, setData] = React.useState<DataWithPagination<PeopleType>>();
  const [page, setPage] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true);
    api.getPeople({ page }, (people: DataWithPagination<PeopleType>) => {
      setData(people);
      setLoading(false);
    });
  }, [page]);

  if (!data) {
    return (
      <section className={styles.Root}>
        {loading ? "Loading . . ." : "Not found"}
      </section>
    );
  }

  const paginationMarkup = (
    <Pagination
      count={data.count}
      page={page}
      prevPageUrl={data.previous}
      nextPageUrl={data.next}
      setPage={setPage}
    />
  );

  return (
    <section className={styles.Root}>
      {paginationMarkup}
      <ul>
        {data.results.map(person => (
          <li key={person.name}>
            <Person {...person} />
          </li>
        ))}
      </ul>
      {paginationMarkup}
    </section>
  );
}
