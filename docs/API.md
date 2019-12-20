# API

- [create()](#create)

- [update()](#update)

- [restyle()](#restyle)

- [destroy()](#destroy)

## create(Container \<HTML Element\>, Value \<Number\>[, Options \<Object\> [,Callback \<Function\>]])\<void\>

- Container: **HTMLElement**

- Value: **Number**

- _(optional)_ Options: **Object**

  - TODO

- _(optional)_ Callback: **Function**

  - Error: **Exception**

  - value: **Number**

Creates a new gauge. This should only be called once _per gauge_.

Upon the gauge's creation, a new instance of [worker]() is created for it.

Example:

```javascript
```

## HTMLElement.update(Value \<Number\>)\<void\>

- Value: **Number**

> **Note:** To be used _after_ creating a new gauge.

Imperatively update the gauge's value.

Example:

```javascript
```

## HTMLElement.restyle(options \<Object\>)\<void\>

- options: **Object**

> **Note:** To be used _after_ creating a new gauge.

Imperatively update the gauge's style.

Example:

```javascript
```

## HTMLElement.destroy(Callback \<Function\>)\<void\>

- Callback:

  - Error: **Exception**
  

> **Note:** To be used _after_ creating a new gauge.

Destroys the gauge's web worker.

Example:

```javascript
```

---
Copyright &copy; MyWebula 2019.
