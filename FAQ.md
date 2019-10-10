# FAQ

- [React questions](#react-questions)
  - [Industry trends of Redux vs Hooks and Context](#industry-trends-of-redux-vs-hooks-and-context)
  - [Should we be trying to move to typescript?](#should-we-be-trying-to-move-to-typescript)
  - [Resources for keeping up with best practices in react development](#resources-for-keeping-up-with-best-practices-in-react-development)
  - [Recommendations on creating our own React boilerplate](#recommendations-on-creating-our-own-react-boilerplate)
- [Process questions](#process-questions)
  - [What is the testing process like at Shopify?](#what-is-the-testing-process-like-at-shopify)
  - [Continuous integration and deployment in Shopify](#continuous-integration-and-deployment-in-shopify)
  - [Standards for overall working in a team? (optimal use of git/bitbucket, how to run code reviews)](#standards-for-overall-working-in-a-team-optimal-use-of-gitbitbucket-how-to-run-code-reviews)
  - [What skills in general should we be focussing on improving as web developers?](#what-skills-in-general-should-we-be-focussing-on-improving-as-web-developers)

## React questions

### Industry trends of Redux vs Hooks and Context

Redux and Context API is not mutually exclusive.
Redux is for global state management where React Context API is meant for component state management.

> Both Redux and React's Context API deal with "prop drilling".
> They both allow you to pass data without having to pass the props through multiple layers of components.
> Internally, Redux uses the React context API that allows it to pass the store along your component tree.
> [Redux FAQ](https://redux.js.org/faq/react-redux#how-does-redux-compare-to-the-react-context-api)

Redux is an opinionated and predictable way of global state management with middleware and reducer concepts.

- Redux has Redux dev tool that allow time traveling between state
- Middleware is a powerful concept used in NodeJS where you may bind customized function calls on every action dispatch.
  Examples include an automatic event logger, interception of certain actions, etc.
- Redux store can be used as serializable object to restore application state
- React hook API supports reducer pattern but not middleware
- React dev tool does not support time traveling

> The useReducer React hook provides a Redux-like means of managing state transitions, but it’s no replacement for Redux when it comes to managing a global application state tree. It’s super useful at a lower level in the component hierarchy for handling pieces of state that are dependent on one another, instead of declaring a bunch of useState hooks, though.
> [Can't replace redux with hooks](https://www.simplethread.com/cant-replace-redux-with-hooks/)

- IMO, you don't need Redux if you don't find middleware concept, time traveling between states and redux dev tool necessary for debugging state transition
- Shopify web team uses apollo cache, context api and local state to manage application state

### Should we be trying to move to TypeScript?

IMO, Yes.

I find writing typed JS improves code quality, readability and works well with GraphQL.
It's painful in the beginning, because you should define types for variables, functions, React props and state.

The added benefits are editor intellisense, type warning about unhandled edge cases such as null or undefined and less defensive code due to type safety.

### Resources for keeping up with best practices in React development

- https://overreacted.io/
- https://reactjs.org/docs/
- https://reactjs.org/blog/
- https://reactjs.org/community/articles.html
- https://reactjs.org/community/videos.html
- https://kentcdodds.com/blog/
- http://reactjsnewsletter.com/
- https://developers.google.com/web/fundamentals/
- https://javascriptweekly.com/
- https://css-tricks.com/newsletters/

### Recommendations on creating our own React boilerplate

- JS style guide like [Shopify/javascript](https://github.com/Shopify/javascript/blob/master/README.md#using-this-guide)
- Foundational components like [Shopify/quilt](https://github.com/Shopify/quilt)
- Design system like [Polaris](https://polaris.shopify.com/)
- Test utilities

## Process questions

### What is the testing process like at Shopify?

- [Testing at Shopify](https://github.com/Shopify/web-foundation/blob/master/Best%20practices/Testing.md)
- [React testing at Shopify](https://github.com/Shopify/web-foundation/blob/master/Best%20practices/React/Testing.md)
- Test strategies varies between teams and generally web team write unit tests
- Test behaviors not implementation
- Mock dependencies to avoid testing child components
- Some teams write integration tests to test behaviors of their (EX: happy path)
- We do not write E2E testing or browser visual testing in web team, although there had been discussions
- Fresh eye sessions to manually tophat features on different devices and platforms when lunching impactful features

### Continuous integration and deployment in Shopify

- Continuous integration
  - A change must create a branch and pull request(PR)
  - Built pipeline validates that PR is ok to merge into master
    - Merge queue is unlocked
    - No merge conflicts
    - Translated or translation scheduled (Internationalization)
    - Bundle size change approved by PR owner
    - Master branch passes CI
  - Add change to merge queue
- Continuous deployment
  - Change scheduled for deployment after merge to master
  - PR owner monitors deployment and slack operation channel
  - Master branch runs against build pipeline
  - Revert PR if master branch fails
  - Deploy change to staging environment
  - Deploy change to production environment after successful deployment to staging environment
- [CI & CD](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)

### Standards for overall working in a team? (optimal use of git/bitbucket, how to run code reviews)

- [Code review practices at Google](https://google.github.io/eng-practices/review/)
- Be friendly, professional and not a jerk
- Work toward common goals
- Keep communication open and build trusts
- Share experiences and learning through code reviews and pair programming
- Experiment fast, collect finding and make decisions

### What skills in general should we be focussing on improving as web developers?

- Communicate with designers and product owner
- Understand requirements and think about solutions before jumping straight into code
- Design and develop for great user experiences in both positive and negative cases
- Writing scalable(testable, readable, efficient), accessible, performant applications
- Treat tests as part of a feature and follow general coding best practices
- Refactor code smells to maintain healthier codebase
- Keep up with [trends](#resources-for-keeping-up-with-best-practices-in-react-development) and specifications - JS - Resilient React components - React hooks, context api, react profiler, error boundary - Understand how browsers works: [Event loop](https://youtu.be/cCOL7MC4Pl0) - Progressive web app and Offline first app - Read about different programming paradigm: Functional, Reactive programming etc. - CSS - Resilient CSS that works with wide range of browser supports - [Flexbox & Grid layout for responsive and creative layout](https://youtu.be/FEnRpy9Xfes) - HTML - Semantic html - Accessibility specifications - Performance optimization - Bundle splitting - [Instagram: Pushing data using early flushing and progressive HTML
  ](https://instagram-engineering.com/making-instagram-com-faster-part-2-f350c8fba0d4) - Preloading, prefetching - Cache management
- Practice code reviews and pull request etiquettes
  - [Code review practices at Google](https://google.github.io/eng-practices/review/)
