# appswitcher-vue

Provides a Vue.js/Vuetify component to quickly switch between apps provided by an [appswitcher-server](https://github.com/it-at-m/appswitcher-server) instance.

## Usage

### Installation

```console
npm install @muenchen/appswitcher-vue
```

Starting with release **2.x** `appswitcher-vue` **requires Vue.js 3.x and Vuetify 3.x** as **peer dependencies**, to be exact:

Required Peer Dependencies:

```
"vue": "^3.2.0",
"vuetify": "^^3.0.0"
```

If you are using Vue.js 2.X and Vuetify 2.X, you still can use release 1.0.0:

```console
npm install @muenchen/appswitcher-vue@1.0.0
```

### Use

```js
import { AppSwitcher } from "@muenchen/appswitcher-vue";
```

```js
export default {
  name: "MyApp",
  components: {
    AppSwitcher
  }
});
```

```html
<template>
  <v-app id="app">
    <v-app-bar id="app-bar" app clipped-left dark color="primary">
      <!-- [....] -->
      <v-spacer />
      <app-switcher base-url="https://my-appswitcher-server-instance.example.com" :tags="['global', 'finance']"/>
  </v-app>
</template>
```

#### Props

| Property              | Description                                                                                    | Type     | Default                                                                             |
| --------------------- | ---------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------- |
| baseUrl               | Base-URL to an instance of [appswitcher-server](https://github.com/it-at-m/appswitcher-server) | string   | `undefined`                                                                         |
| id                    | HTML id attribute prefix                                                                       | string   | `appswitcher`                                                                       |
| appswitcherDownHeader | If appswitcher-server is not available: Header text                                            | string   | `appswitcher-server is not available`                                               |
| appswitcherDownText   | If appswitcher-server is not available: Paragraph text                                         | string   | `Your apps could not be retrieved from appswitcher-server. Please try again later.` |
| tags                  | [Tags](https://github.com/it-at-m/appswitcher-server?tab=readme-ov-file#tags) for request      | string[] | `[]`                                                                                |
| width                 | Width                                                                                          | string   | `315`                                                                               |
| height                | Height                                                                                         | string   | `300`                                                                               |
| icon                  | Icon for activator button                                                                      | string   | `mdi-apps`                                                                          |

#### Slots

##### activator

Default:

```vue
<v-btn icon v-bind="props">
  <v-icon>{{ icon }}</v-icon>
</v-btn>
```

Custom example:

```vue
<app-switcher
  base-url="https://my-appswitcher-server-instance.example.com"
  :tags="['global', 'finance']"
>
  <template #activator="{ props }">
    <v-btn v-bind="props">CUSTOM activator</v-btn>
  </template>
</app-switcher>
```

## Develop

It is recommended to run a local instance of [appswitcher-server](https://github.com/it-at-m/appswitcher-server) as a "backend", e.g. using Docker:

```bash
docker run -d --name appswitcher-server -p 8080:8080 -e SPRING_PROFILES_ACTIVE=demo ghcr.io/it-at-m/appswitcher-server:latest
```

```bash
# Do dev stuff
npm run dev
```

## Build

```bash
# Run build process
npm run build
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

it@M - <opensource@muenchen.de>
