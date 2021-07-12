# @ivonna/navigation

Ivonna is a hybrid development framework of `native` and `react native`, which supports IOS and Android.

## Installation

```sh
npm install @ivonna/navigation
```

## Usage

#### Registry your components

```jsx
import { AppRegistry } from '@ivonna/navigation';

AppRegistry.registerComponent('Home', HomeComponent);
AppRegistry.registerComponent('Mine', MineComponent);
```

#### Navigate to destination

```jsx
import { Navigation } from '@ivonna/navigation';

// ...

Navigation.push('Home');
```

#### Using the State Manager

```jsx
import { Container } from '@ivonna/navigation';

const { moduleStore, setModuleStore } = Container.useContainer('Common'); // `Common` is module name
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
