import React from "react";

import Links from "../../../Links";
import { Person as PersonType } from "../../../../api/types";

export interface Props extends PersonType {}

export default function Person({
  name,
  gender,
  birth_year,
  height,
  films,
  species,
  created,
  starships
}: Props) {
  const filmLinks = <Links urls={films} />;
  const specieLinks = <Links urls={species} />;
  const starshipLinks = <Links urls={starships} />;

  return (
    <section>
      <h2>{name}</h2>
      <ul>
        <li>Gender: {gender}</li>
        <li>Birth year: {birth_year}</li>
        <li>Height: {height} cm</li>
        <li>Films: {filmLinks}</li>
        <li>Species: {specieLinks}</li>
        <li>Starships: {starshipLinks}</li>
        <li>Created: {created}</li>
      </ul>
    </section>
  );
}
