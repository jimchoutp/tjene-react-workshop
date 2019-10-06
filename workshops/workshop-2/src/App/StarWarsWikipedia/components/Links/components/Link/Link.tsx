import React from "react";

import styles from "./Link.module.css";

interface Props {
  url: string;
  children: React.ReactNode;
}

export default function Link({ url, children }: Props) {
  return (
    <a className={styles.Root} href={url} target="self">
      {children}
    </a>
  );
}
