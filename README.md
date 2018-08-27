# Electron.js Proxy POC

This is a proof-of-concept demonstrating electron.js's ability to route traffic through a proxy server. The request is made in an iFrame, so some sites won't load. By default, it points to https://api.ipify.org to show the user's IP.

The `id` and `password` fields are currently passed via basic authentication (in URI).

## To Use

```bash
npm i
npm start
```
