let socket = io();

Object.defineProperty(window, 'socket', {
    enumerable: true,
    configurable: false,
    get: () => socket,
    set: (value) => {}
});