# cinii-entity-lookup

![Picture](https://cwrc.ca/logos/CWRC_logos_2016_versions/CWRCLogo-Horz-FullColour.png)

[![Travis](https://img.shields.io/travis/cwrc/cinii-entity-lookup.svg)](https://travis-ci.org/cwrc/cinii-entity-lookup)
[![Codecov](https://img.shields.io/codecov/c/github/cwrc/cinii-entity-lookup.svg)](https://codecov.io/gh/cwrc/cinii-entity-lookup)
[![version](https://img.shields.io/npm/v/cinii-entity-lookup.svg)](https://npm.im/cinii-entity-lookup)
[![downloads](https://img.shields.io/npm/dm/cinii-entity-lookup.svg)](https://npm-stat.com/charts.html?package=cinii-entity-lookup&from=2015-08-01)
[![GPL-3.0](https://img.shields.io/npm/l/cinii-entity-lookup.svg)](https://opensource.org/licenses/GPL-3.0)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](https://commitizen.github.io/cz-cli/)
[![experimental](https://badges.github.io/stability-badges/dist/experimental.svg)](https://github.com/badges/stability-badges)

1. [Overview](#overview)
1. [Installation](#installation)
1. [Use](#use)
1. [API](#api)
1. [Development](#development)

## Overview

Finds entities (people, places, organizations, titles) in cinii. Meant to be used with [cwrc-public-entity-dialogs](https://github.com/cwrc-public-entity-dialogs) where it runs in the browser.

Although it will not work in node.js as-is, it does use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for http requests, and so could likely therefore use a browser/node.js compatible fetch implementation like: [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch).

## Installation

`npm i cinii-entity-lookup`

## Use

`import ciniiLookup from 'cinii-entity-lookup';`

### API

### findRS(query)

where the 'query' argument is an object:

```js
{
    entity: "The name of the thing the user wants to find.",
    options: "TBD"
}
```

and all find\* methods return promises that resolve to an object like the following:

```json
{
  "id": "https://cinii.org/cinii/9447148209321300460003/",
  "name": "Fay Jones School of Architecture and Design",
  "nameType": "Corporate",
  "originalQueryString": "jones",
  "repository": "cinii",
  "uri": "https://cinii.org/9447148209321300460003/",
  "uriForDisplay": "https://cinii.org/9447148209321300460003/"
}
```

There are a further four methods that are mainly made available to facilitate testing (to make it easier to mock calls to the cinii service):

### getRSLookupURI(query)

where the 'query' argument is the entity name to find and the methods return the cinii URL that in turn returns results for the query.

## Development

[CWRC-Writer-Dev-Docs](https://github.com/cwrc/CWRC-Writer-Dev-Docs) describes general development practices for CWRC-Writer GitHub repositories, including this one.

<!-- ### Testing

The code in this repository is intended to run in the browser, and so we use [browser-run](https://github.com/juliangruber/browser-run) to run [browserified](https://browserify.org) [tape](https://github.com/substack/tape) tests directly in the browser.

We [decorate](https://en.wikipedia.org/wiki/Decorator_pattern) [tape](https://github.com/substack/tape) with [tape-promise](https://github.com/jprichardson/tape-promise) to allow testing with promises and async methods. -->

### Mocking

We use [fetch-mock](https://github.com/wheresrhys/fetch-mock) to mock http calls (which we make using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) rather than XMLHttpRequest).

<!-- We use [sinon](https://sinonjs.org) [fake timers](https://sinonjs.org/releases/v4.0.1/fake-timers/) to test our timeouts, without having to wait for the timeouts. -->

<!-- ### Code Coverage

We generate code coverage by instrumenting our code with [istanbul](https://github.com/gotwarlost/istanbul) before [browser-run](https://github.com/juliangruber/browser-run) runs the tests, then extract the coverage (which [istanbul](https://github.com/gotwarlost/istanbul) writes to the global object, i.e., the window in the browser), format it with [istanbul](https://github.com/gotwarlost/istanbul), and finally report (Travis actually does this for us) to [codecov.io](codecov.io) -->

<!-- ### Transpilation

We use [babelify](https://github.com/babel/babelify) and [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul) to compile our code, tests, and code coverage with [babel](https://github.com/babel/babel) -->

### Continuous Integration

We use [Travis](https://travis-ci.org).

### Release

We follow [SemVer](https://semver.org), which [Semantic Release](https://github.com/semantic-release/semantic-release) makes easy. Semantic Release also writes our commit messages, sets the version number, publishes to NPM, and finally generates a changelog and a release (including a git tag) on GitHub.
