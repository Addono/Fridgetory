if (!self.define) {
  const e = (e) => {
      'require' !== e && (e += '.js')
      let a = Promise.resolve()
      return (
        c[e] ||
          (a = new Promise(async (a) => {
            if ('document' in self) {
              const c = document.createElement('script')
              ;(c.src = e), document.head.appendChild(c), (c.onload = a)
            } else importScripts(e), a()
          })),
        a.then(() => {
          if (!c[e]) throw new Error(`Module ${e} didn’t register its module`)
          return c[e]
        })
      )
    },
    a = (a, c) => {
      Promise.all(a.map(e)).then((e) => c(1 === e.length ? e[0] : e))
    },
    c = { require: Promise.resolve(a) }
  self.define = (a, n, i) => {
    c[a] ||
      (c[a] = Promise.resolve().then(() => {
        let c = {}
        const s = { uri: location.origin + a.slice(1) }
        return Promise.all(
          n.map((a) => {
            switch (a) {
              case 'exports':
                return c
              case 'module':
                return s
              default:
                return e(a)
            }
          })
        ).then((e) => {
          const a = i(...e)
          return c.default || (c.default = a), c
        })
      }))
  }
}
define('./sw.js', ['./workbox-4d0bff02'], function (e) {
  'use strict'
  importScripts(),
    e.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/static/6Ra6cZHaOdyxPh1K_7hX1/_buildManifest.js', revision: 'fb96ae7926f5104f50f0cf1b3a23a9b5' },
        { url: '/_next/static/6Ra6cZHaOdyxPh1K_7hX1/_ssgManifest.js', revision: 'abee47769bf307639ace4945f9cfd4ff' },
        { url: '/_next/static/6Ra6cZHaOdyxPh1K_7hX1/pages/_app.js', revision: 'b42965d6aa0aa8ea9f1f2250ab69fb1d' },
        { url: '/_next/static/6Ra6cZHaOdyxPh1K_7hX1/pages/_error.js', revision: 'e6e32495218a0b66171e0fb61fc67106' },
        { url: '/_next/static/6Ra6cZHaOdyxPh1K_7hX1/pages/index.js', revision: '42996482c658dbc233313b713acc1fe7' },
        {
          url: '/_next/static/chunks/4c8c6ce8417a5ffc3111a54742f7df62970420b4.9920df282543ce49adf6.js',
          revision: '80727a4ffb4e4cd90ffb73eceaafd8e4',
        },
        { url: '/_next/static/chunks/b5354205.e05b9cac0aab3e16d0b1.js', revision: 'ab8a30273db0b805aedfc8f8566c52dd' },
        {
          url: '/_next/static/chunks/fad1d066acb6bc9cdaf54be73cc25e9cd6ab6e25.043335a22c0a81cc38ef.js',
          revision: '5c69c77f9f592505f1dcc3af3db7382e',
        },
        { url: '/_next/static/chunks/framework.c6faae2799416a6da8e8.js', revision: 'a07dacbb502f5257565ceb7d460e71e6' },
        { url: '/_next/static/css/c5421d7c7294e21bc2b0.css', revision: '5ef8784a99fc3a38ea50a2b54167f872' },
        { url: '/_next/static/css/dc934136b0eb941e3a46.css', revision: 'd41d8cd98f00b204e9800998ecf8427e' },
        { url: '/_next/static/runtime/main-3a0a05082500b79b50b8.js', revision: '3bc8e38d63ce1545fe98ea16350c873a' },
        {
          url: '/_next/static/runtime/polyfills-b10afcedf826ebd862ad.js',
          revision: '73747fb253edba922d720d89d48a9ffa',
        },
        { url: '/_next/static/runtime/webpack-c212667a5f965e81e004.js', revision: 'f5e6e2fca3144cc944812cfa3547f475' },
        { url: '/android-icon-144x144.png', revision: '9a3e3fa48743476f6d05dc256f8b4642' },
        { url: '/android-icon-192x192.png', revision: '0a5f423a548bbd3b68cd42bdd6efc8f6' },
        { url: '/android-icon-36x36.png', revision: '515b8b6a8d38fadd178fbebdd397b93a' },
        { url: '/android-icon-48x48.png', revision: '624d66b662afff23a1e2912c227a354e' },
        { url: '/android-icon-72x72.png', revision: '52ed98f4de039fd6c35cfdc902a0661c' },
        { url: '/android-icon-96x96.png', revision: '0bd2f87b5046637a68308e8dc3c0c57a' },
        { url: '/apple-icon-114x114.png', revision: 'b1963aaf4ff9972c1aaee2876c1e3446' },
        { url: '/apple-icon-120x120.png', revision: '7a8d9eb5bd1b93270c62d7cdfdbc932c' },
        { url: '/apple-icon-144x144.png', revision: '9a3e3fa48743476f6d05dc256f8b4642' },
        { url: '/apple-icon-152x152.png', revision: 'cdc80066232a66d7663e7a54fc787114' },
        { url: '/apple-icon-180x180.png', revision: '884fa9183a989df37a0ab13f4382fc2c' },
        { url: '/apple-icon-57x57.png', revision: '2d5d83f4e58f635b47b56a74f0d766a4' },
        { url: '/apple-icon-60x60.png', revision: '4ac309b8ce4c032342a712ff812a5936' },
        { url: '/apple-icon-72x72.png', revision: '52ed98f4de039fd6c35cfdc902a0661c' },
        { url: '/apple-icon-76x76.png', revision: '4c76962c24538de0912e5858aa4b4662' },
        { url: '/apple-icon-precomposed.png', revision: '5520cee7b7b94ce3bdaf4947a7ecd16d' },
        { url: '/apple-icon.png', revision: '5520cee7b7b94ce3bdaf4947a7ecd16d' },
        { url: '/browserconfig.xml', revision: '653d077300a12f09a69caeea7a8947f8' },
        { url: '/favicon-16x16.png', revision: '2ee6744a1b936565f26d19ca9b302d2d' },
        { url: '/favicon-32x32.png', revision: 'a9f1c2ba2e5d1d84740d546ac58cfa51' },
        { url: '/favicon-96x96.png', revision: '0bd2f87b5046637a68308e8dc3c0c57a' },
        { url: '/manifest.json', revision: 'cc1d8eeeebb52d995b8dd53cffcfb65d' },
        { url: '/ms-icon-144x144.png', revision: '9a3e3fa48743476f6d05dc256f8b4642' },
        { url: '/ms-icon-150x150.png', revision: '8e3f6597470b5abde0dbf15d8cf34db4' },
        { url: '/ms-icon-310x310.png', revision: 'eabc4da97333d8cc394775f9b3931a88' },
        { url: '/ms-icon-70x70.png', revision: '570cf03c8b79a258e40f247b147ab2ab' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3, purgeOnQuotaError: !0 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800, purgeOnQuotaError: !0 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/api\/.*$/i,
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/api\/.*$/i,
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })],
      }),
      'POST'
    ),
    e.registerRoute(
      /.*/i,
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })],
      }),
      'GET'
    )
})
