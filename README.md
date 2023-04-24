# appswitcher-vue

Provides a Vue.js/Vuetify component to quickly switch between apps provided by an [appswitcher-server](https://github.com/it-at-m/appswitcher-server) instance.

## Usage

### Installation

```
npm install @muenchen/appswitcher-vue
```

Required Peer Dependencies:

```
"@mdi/font": "> 5",
"vue": "^2.7.14",
"vuetify": "^2.6.12"
```

### Use

```js
import { Appswitcher } from "@muenchen/appswitcher-vue";
```

```js
export default {
  name: "MyApp",
  components: {
    Appswitcher
  }
});
```

```html
<template>
  <v-app id="app">
    <v-app-bar id="app-bar" app clipped-left dark color="primary">
      <!-- [....] -->
      <v-spacer />
      <Appswitcher base-url="https://my-appswitcher-server-instance.example.com" :tags="['global', 'finance']"/>
  </v-app>
</template>
```

## Develop

```bash
# Do dev stuff
npm run serve
```

## Build & Demo

```bash
# Run build process
npm run build
```

```bash
# Run demo app
npm run dev
```

## Release & Publish

This project uses [semantic-release](https://github.com/semantic-release/semantic-release)!

| Commit message                                                                                                                                                                                   | Release type               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please open an issue with the tag "enhancement", fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Open an issue with the tag "enhancement"
2. Fork the Project
3. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
4. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](LICENSE) file for more information.

## Contact

it@M - opensource@muenchen.de
