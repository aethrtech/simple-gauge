# API

- [create()](#create)

- [destroy()](#destroy)

- [restyle()](#restyle)

- [update()](#update)

<h2 id="create">create(Container, Value[, Options [,Callback ]]): void</h2>

- `Container` \<HTMLElement\>

- `Value` \<Number\>

- `Options` \<Object\>

  - TODO

- `Callback` \<Function\>

  - `Error` \<Object\>

  - `Value` \<Number\>

Creates a new gauge. This should only be called once _per gauge_.

Upon the gauge's creation, a new instance of [worker]() is created for it.

Example:

```javascript
```

<h2 id="destroy">HTMLElement.destroy(Callback): void</h2>

- `Callback`

  - `Error` Object

> **Note:** To be used _after_ creating a new gauge.

Destroys the gauge's web worker.

Example:

```javascript
```

<h2 id="restyle">HTMLElement.restyle(options[,Callback]): void</h2>

- `options` \<Object\>

- `Callback` \<Function\>

> **Note:** To be used _after_ creating a new gauge.

Imperatively update the gauge's style.

Example:

```javascript
```

<h2 id="update">HTMLElement.update(Value[, callback]): void</h2>

- `Value` \<Number\>

- `Callback` \<Function\>

> **Note:** To be used _after_ creating a new gauge.

Imperatively update the gauge's value.

Example:

```javascript
```

---
Copyright &copy; MyWebula 2019.
