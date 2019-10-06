import React from "react";

import { Link } from "./components";
import styles from "./Links.module.css";

interface Props {
  urls: string[];
}

export default function Links({ urls }: Props) {
  return (
    <ul className={styles.Root}>
      {urls.map(url => (
        <li key={url}>
          <Link url={url}>{url}</Link>
        </li>
      ))}
    </ul>
  );
}
