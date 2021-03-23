<img src="docs/images/logo.png?raw=true" alt="zjh.im logo" width="50" >
<br/>
<p>
  <img src="https://img.shields.io/github/package-json/v/bbbottle/zjh.im?color=rgb%2881%2C%20196%2C%20159%29" />
  <img src="https://img.shields.io/github/issues/bbbottle/zjh.im?color=%23ff8888" />
</p>

## Overview

zjh.im render zjh's [personal site](https://zjh.im).

## Install

zjh.im use [Github Packages](https://docs.github.com/en/packages/learn-github-packages/about-github-packages) as package hosting service.

> To download and install packages from a repository, your token must have the read:packages scope, and your user account must have read permissions for the repository.

`npm install @bbbottle/zjh.im` or `yarn add @bbbottle/zjh.im`

## Usage

```javascript
import { renderZjhDotIm } from "@bbbottle/zjh.im";

renderZjhDotIm(document.getElementById("container"));
```

## Javascript API

```javascript
renderZjhDotIm(container);
```

Render zjh.im into the DOM in the supplied `container`.

## Contribution

submit your issue [here](https://github.com/bbbottle/zjh.im/issues)

## License

[MIT](https://github.com/bbbottle/zjh.im/blob/main/LICENSE)
