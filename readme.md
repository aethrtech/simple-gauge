# Simple Gauge

<p align="center">Beautiful circular gauges rendered off the main thread</p>

## Contents

- [Demo]()

- [Quick Setup](#Quick-Setup)

- [Advanced Setup](/docs/advanced-setup.md)

- [API](/docs/API.md)

## Quick Setup

NPM:

```sh
npm i simple-gauge
```

Yarn:

```sh
yarn add simple-gauge
```

CDN

```html
<script type="text/javascript" href="//"></script>
```

Copy and paste the following into your text editor:

```html
<!DOCTYPE html>
<html>
    <head>
        <script type="text/javascript" href="//"></script>
        <style>
            #gauge {
                width:300px;
                height:300px;
            }
        </style>
    </head>
    <body>
        <div id="gauge"></div>
    </body>
    <script>

    var gauge = document.getElementById('gauge'),
    options = {

    }

    SimpleGauge.default.create(gauge, 45, options, function callback(err, data){
    // do something
    })

    </script>
</html>
```

save the file as `index.html`, then open your file with a web browser.

## Next steps

Check the [advanced setup guide](/docs/advanced-setup) for instructions on how to use `simple-gauge` with more complex projects.

---

&copy; MyWebula 2019.
