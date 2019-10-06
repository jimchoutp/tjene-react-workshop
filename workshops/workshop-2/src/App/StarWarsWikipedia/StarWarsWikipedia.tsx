import React from "react";
import classNames from "classnames";

import api from "./api/swapi-wrapper";
import { Resources, ResourcesData } from "./api/types";
import { People } from "./components";
import styles from "./StarWarsWikipedia.module.css";

interface State {
  pollResources: boolean;
  loading: boolean;
  resources?: ResourcesData;
  activeResource?: Resources;
}

interface Props {
  pollResources: boolean;
}

const RESOURCE_POLLING_INTERVAL = 3000;

class StarWarsWikipedia extends React.Component<Props, State> {
  refreshIntervalId?: number;

  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      pollResources: props.pollResources
    };

    this.togglePollingResources = this.togglePollingResources.bind(this);
    this.getResources = this.getResources.bind(this);
  }

  componentDidMount() {
    this.getResources();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    // Problem: props.pollResources and state.pollResources need to be synced in componentDidUpdate
    // if (this.props.pollResources !== prevProps.pollResources) {
    //   this.setState({
    //     pollResources: this.props.pollResources
    //   });
    // }

    if (this.state.pollResources !== prevState.pollResources) {
      if (this.state.pollResources) {
        this.startPollingResources();
      } else {
        this.stopPollingResources();
      }
    }
  }

  componentWillUnmount() {
    // Problem: Memory leak, forgot to cancel async operations such as interval before unmount
    // this.stopPollingResources();
  }

  getResources() {
    console.log("Get resources");

    this.setState({ loading: true });

    return api.getResources((data: ResourcesData) => {
      this.setState(state => ({
        loading: false,
        resources: data,
        activeResource:
          state.activeResource || (Object.keys(data)[0] as Resources)
      }));
    });
  }

  stopPollingResources() {
    clearInterval(this.refreshIntervalId);
    this.refreshIntervalId = undefined;

    console.log("Polling resources stopped");
  }

  startPollingResources() {
    clearInterval(this.refreshIntervalId);
    this.refreshIntervalId = setInterval(
      this.getResources,
      RESOURCE_POLLING_INTERVAL
    );

    console.log(
      `Polling resources every ${RESOURCE_POLLING_INTERVAL}ms started`
    );
  }

  togglePollingResources() {
    this.setState(state => ({
      pollResources: !state.pollResources
    }));
  }

  renderActiveResource() {
    // Problem: Render method should be refactor to separate component
    const { activeResource } = this.state;

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

  renderResources() {
    // Problem: Render method should be refactor to separate component
    const { resources, activeResource } = this.state;

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
                onClick={() =>
                  this.setState({
                    activeResource: resourceKey as Resources
                  })
                }
              >
                <span className={styles.ResourceName}>
                  {String(resourceKey)}
                </span>
              </li>
            ))}
          </ul>
          {this.renderActiveResource()}
        </>
      );
    }

    return <strong>No resources found.</strong>;
  }

  render() {
    const { loading, resources, pollResources } = this.state;

    return (
      <section className={styles.Root}>
        <header className={styles.Header}>
          <h1>Star Wars Wikipedia</h1>
          <button onClick={this.togglePollingResources}>
            {pollResources
              ? "Pause refresh resources"
              : "Auto refresh resources"}
          </button>
        </header>
        {!resources && loading ? "Loading ..." : this.renderResources()}
      </section>
    );
  }
}

export default StarWarsWikipedia;
