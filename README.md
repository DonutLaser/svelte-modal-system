<h1 align="center">Welcome to svelte-modal-system 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version- (0.1.0)-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/DonutLaser/svelte-modal-system#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/DonutLaser/svelte-modal-system/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

> Simple modal system for Svelte

### 🏠 [Homepage](https://github.com/DonutLaser/svelte-modal-system)

## Install

```sh
npm install svelte-modal-system
```

## Usage
### Opening a modal window
```svelte
<!-- App.svelte -->
<script>
    import { openModal } from 'svelte-modal-system';
    import MyModalComponent from 'MyModalComponent.svelte';

    function openNewModal() {
        const modalRef = openModal(MyModalComponent, { width: '200px', height: '400px' }, { name: 'my modal name property' });
        modalRef.onClose((result?; any) => {
            console.log("Modal was closed and here's the result:", result);
        });
    }
</script>

<button on:click="{openNewModal}">Open modal</button>
```
```svelte
<!-- MyModalCompnent.svelte -->
<script>
    export let name = '';
</script>

<div>{name}</div>
```
To open a modal window, use `openModal(component: any, modalOptions?: ModalOptions, componentProps?: any)` function, provide it a component to render inside the modal, some options (if you want to change anything beyond the defaults) and an object of component properties that will be passed to the component, rendered inside the modal.

Notes:
- A modal will always be rendered as a child of the `body` 
- There can only be one modal open at a time

### Modal options
All of these are optional.
| Option                  | Type    | Default value | Description                                                                                                               |
|-------------------------|---------|---------------|---------------------------------------------------------------------------------------------------------------------------|
| **width**               | string  | 600px         | Any value that css property `width` supports (50%, fit-content, auto, 100vw, etc.)                                        |
| **height**              | string  | 500px         | Any value that css property `height` supports (50%, fit-content, auto, 100vh, etc.)                                       |
| **customWindowClass**   | string  | <empty>       | A class that will style the main modal window. **Must be defined in global.css**. Override the default styles completely. |
| **animate**             | boolean | true          | Whether to play an animation when the modal is opened                                                                     |
| **closeWithEscape**     | boolean | true          | Whether to allow closing a modal by pressing `Escape`                                                                     |
| **closeOnOutsideClick** | boolean | true          | Whether to allow closing the modal by clicking outside it.                                                                |

### Component props
You can easily provide the properties for your modal component by passing in an object to `openModal` function.
```typescript
const componentProps = {
    propName1: 'propValue1',
    propName2: 'propValue2',
    propName3: { ... },
    propName4: 20,
};

openModal(component, modalOptions, componentProps);
```

### Closing a modal
Sometimes you would like to know when the modal is closed and do something at that specific moment. For that, `openModal()` function returns an instance of a `ModalRef` which has a method `onClose` where you can provide a callback to call when the modal closes. When the modal closes, you can optionally get some values from it. By default, when the modal closes it doesn't return anything. More often than not, a modal has a button that closes that modal. To enable such a scenario, this modal system provides a function `closeActiveModal()` that closes the opened modal. You can also provide a value to be sent to the onClose callback when you call this function.
```svelte
<!-- MyModalCompnent.svelte -->
<script>
    import { closeActiveModal } from 'svelte-modal-system';

    let value = '';

    function submit() {
        closeActiveModal(value);
    }
</script>

<input type="text" bind:value>
<button on:click="{submit}">Submit</button>
```

## Author

👤 **Vidmantas Luneckas**

* Github: [@DonutLaser](https://github.com/DonutLaser)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/DonutLaser/svelte-modal-system/issues). You can also take a look at the [contributing guide](https://github.com/DonutLaser/svelte-modal-system/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Vidmantas Luneckas](https://github.com/DonutLaser).<br />
This project is [MIT](https://github.com/DonutLaser/svelte-modal-system/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_