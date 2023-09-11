const sw = self as unknown as ServiceWorkerGlobalScope
const staticCache = 'gh_users_static_v1'
const cacheExpiresHeader = 'gh_users_cache_expires'
const cacheDuration = 24 * 3600 * 1000

sw.addEventListener('install', e => {
  sw.skipWaiting()
  e.waitUntil(caches.open(staticCache).then(cache => cache.addAll(['/'])))
})

sw.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== staticCache).map(key => caches.delete(key)))
    }),
  )
})

sw.addEventListener('fetch', e => {
  if (e.request.url.startsWith('http') && e.request.method === 'GET') {
    const isHtml = e.request.headers.get('Accept')?.indexOf('text/html') !== -1 && e.request.url.startsWith(sw.origin)
    const host =
      process.env.NODE_ENV === 'production'
        ? `${process.env.PROD_HOST}:${process.env.PORT}`
        : `${process.env.DEV_HOST}:${process.env.PORT}`
    const isApiRequest = e.request.url.startsWith(host)

    e.respondWith(
      (async () => {
        if (isHtml) {
          try {
            const fetched = await fetch(e.request)
            await caches.open(staticCache).then(cache => cache.put(e.request, fetched.clone()))
            return fetched
          } catch (err) {
            const cached = await caches.open(staticCache).then(cache => cache.match('/'))
            if (cached) return cached
          }
        }

        if (isApiRequest) {
          try {
            await clearCacheFromOldData()

            const cached = await caches.open(staticCache).then(cache => cache.match(e.request))
            if (cached) {
              const header = cached.headers.get(cacheExpiresHeader)
              if (header && parseInt(header) > new Date().getTime()) {
                return cached
              }
            }

            const fetched = await fetch(e.request)
            const clone = fetched.clone()

            const expires = new Date().getTime() + cacheDuration
            const headers = new Headers(fetched.headers)
            headers.append(cacheExpiresHeader, String(expires))

            const resp = await clone.blob().then(blob => new Response(blob, { headers: headers }))

            await caches.open(staticCache).then(cache => cache.put(e.request, resp))
            return fetched
          } catch (err) {
            const cached = await caches.open(staticCache).then(cache => cache.match(e.request))
            if (cached) return cached
          }
        }

        try {
          const cached = await caches.open(staticCache).then(cache => cache.match(e.request))
          if (cached) return cached

          const fetched = await fetch(e.request)
          await caches.open(staticCache).then(cache => cache.put(e.request, fetched.clone()))
          return fetched
        } catch (err) {
          const cached = await caches.open(staticCache).then(cache => cache.match(e.request))
          if (cached) return cached
        }

        return new Response('', {
          status: 404,
          statusText: 'Not Found',
        })
      })(),
    )
  }
})

const clearCacheFromOldData = async () => {
  const cache = await caches.open(staticCache)
  const keys = await cache.keys()

  for (const key of keys) {
    const value = await cache.match(key).then(key => key?.headers.get(cacheExpiresHeader))

    if (value && parseInt(value) < new Date().getTime()) {
      await cache.delete(key)
    }
  }
}
