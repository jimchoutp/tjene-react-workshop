import React from "react";
import classNames from "classnames";

import api from "./api/swapi-wrapper";
import { Resources, ResourcesData } from "./api/types";
import { People } from "./components";
import { useIsMounted } from "./hooks";
import styles from "./StarWarsWikipedia.module.css";

interface State {
  pollResources: boolean;
  loading: boolean;
  resources?: ResourcesData;
  activeResource?: Resources;
}

interface Props {}

const RESOURCE_POLLING_INTERVAL = 3000;

function StarWarsWikipedia(props: Props) {
  const mounted = useIsMounted();
  const refreshIntervalId = React.useRef<number>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [pollResources, setPollResources] = React.useState<boolean>(false);
  const [resources, setResources] = React.useState<ResourcesData>();
  const [activeResource, setActiveResource] = React.useState<Resources>();

  const getResources = React.useCallback(() => {
    console.log("Get resources");

    setLoading(true);

    return api.getResources((data: ResourcesData) => {
      if (!mounted.current) {
        return;
      }

      setLoading(false);
      setResources(data);
    });
  }, [mounted]);

  React.useEffect(() => {
    if (resources) {
      setActiveResource(
        activeResource || (Object.keys(resources)[0] as Resources)
      );
    }
  }, [activeResource, resources]);

  React.useEffect(() => {
    getResources();
  }, [getResources]);

  React.useEffect(() => {
    if (pollResources) {
      refreshIntervalId.current = setInterval(
        getResources,
        RESOURCE_POLLING_INTERVAL
      );

      console.log(
        `Polling resources every ${RESOURCE_POLLING_INTERVAL}ms started`
      );
    }

    return () => {
      clearInterval(refreshIntervalId.current);
      refreshIntervalId.current = undefined;

      console.log("Polling resources stopped");
    };
  }, [getResources, pollResources]);

  function togglePollingResources() {
    setPollResources(state => !state);
  }

  function renderActiveResource() {
    // Problem: Render method should be refactor to separate component
    switch (activeResource) {
      case Resources.people: {
        return <People />;
      }
      default: {
        return (
          <span className={styles.ResourceName}>
            {`${activeResource} has not been implemented.`}
          </span>
        );
      }
    }
  }

  function renderResources() {
    // Problem: Render method should be refactor to separate component
    if (resources && Object.keys(resources).length > 0) {
      return (
        <>
          <ul className={styles.Resources}>
            {Object.keys(resources).map(resourceKey => (
              <li
                className={classNames(
                  styles.Resource,
                  activeResource === resourceKey && styles.ActiveResource
                )}
                key={resourceKey}
                onClick={() => setActiveResource(resourceKey as Resources)}
              >
                <span className={styles.ResourceName}>
                  {String(resourceKey)}
                </span>
              </li>
            ))}
          </ul>
          {renderActiveResource()}
        </>
      );
    }

    return <strong>No resources found.</strong>;
  }

  return (
    <section className={styles.Root}>
      <header className={styles.Header}>
        <h1>Star Wars Wikipedia</h1>
        <button onClick={togglePollingResources}>
          {pollResources ? "Pause refresh resources" : "Auto refresh resources"}
        </button>
      </header>
      {!resources && loading ? "Loading ..." : renderResources()}
    </section>
  );
}

export default StarWarsWikipedia;
