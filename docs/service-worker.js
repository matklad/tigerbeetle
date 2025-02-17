const CACHE_NAME = "8af4c232224f0ab016d35f9dfb0525ddcc18e311";
const FILES_TO_CACHE = 
  ["https://matklad.github.io/tigerbeetle//","https://matklad.github.io/tigerbeetle//CNAME","https://matklad.github.io/tigerbeetle//js/search.js","https://matklad.github.io/tigerbeetle//404.html","https://matklad.github.io/tigerbeetle//start/","https://matklad.github.io/tigerbeetle//style/highlight.css","https://matklad.github.io/tigerbeetle//style/style.css","https://matklad.github.io/tigerbeetle//about/","https://matklad.github.io/tigerbeetle//about/vopr/","https://matklad.github.io/tigerbeetle//search-index.json","https://matklad.github.io/tigerbeetle//img/preview.webp","https://matklad.github.io/tigerbeetle//img/notfound-dark.webp","https://matklad.github.io/tigerbeetle//img/notfound-light.webp","https://matklad.github.io/tigerbeetle//img/favicon.png","https://matklad.github.io/tigerbeetle//.nojekyll","https://matklad.github.io/tigerbeetle//concepts/","https://matklad.github.io/tigerbeetle//concepts/oltp/","https://matklad.github.io/tigerbeetle//concepts/safety/","https://matklad.github.io/tigerbeetle//concepts/debit-credit/","https://matklad.github.io/tigerbeetle//concepts/performance/","https://matklad.github.io/tigerbeetle//quick-start/","https://matklad.github.io/tigerbeetle//coding/system-architecture/","https://matklad.github.io/tigerbeetle//coding/clients/","https://matklad.github.io/tigerbeetle//coding/clients/go/","https://matklad.github.io/tigerbeetle//coding/clients/python/","https://matklad.github.io/tigerbeetle//coding/clients/java/","https://matklad.github.io/tigerbeetle//coding/clients/dotnet/","https://matklad.github.io/tigerbeetle//coding/clients/node/","https://matklad.github.io/tigerbeetle//coding/","https://matklad.github.io/tigerbeetle//coding/two-phase-transfers/","https://matklad.github.io/tigerbeetle//coding/time/","https://matklad.github.io/tigerbeetle//coding/reliable-transaction-submission/","https://matklad.github.io/tigerbeetle//coding/recipes/","https://matklad.github.io/tigerbeetle//coding/recipes/correcting-transfers/","https://matklad.github.io/tigerbeetle//coding/recipes/balance-invariant-transfers/","https://matklad.github.io/tigerbeetle//coding/recipes/multi-debit-credit-transfers/","https://matklad.github.io/tigerbeetle//coding/recipes/close-account/","https://matklad.github.io/tigerbeetle//coding/recipes/balance-conditional-transfers/","https://matklad.github.io/tigerbeetle//coding/recipes/rate-limiting/","https://matklad.github.io/tigerbeetle//coding/recipes/balance-bounds/","https://matklad.github.io/tigerbeetle//coding/recipes/currency-exchange/","https://matklad.github.io/tigerbeetle//coding/financial-accounting/","https://matklad.github.io/tigerbeetle//coding/data-modeling/","https://matklad.github.io/tigerbeetle//reference/","https://matklad.github.io/tigerbeetle//reference/query-filter/","https://matklad.github.io/tigerbeetle//reference/transfer/","https://matklad.github.io/tigerbeetle//reference/account-filter/","https://matklad.github.io/tigerbeetle//reference/requests/","https://matklad.github.io/tigerbeetle//reference/requests/get_account_transfers/","https://matklad.github.io/tigerbeetle//reference/requests/get_account_balances/","https://matklad.github.io/tigerbeetle//reference/requests/lookup_transfers/","https://matklad.github.io/tigerbeetle//reference/requests/create_transfers/","https://matklad.github.io/tigerbeetle//reference/requests/query_accounts/","https://matklad.github.io/tigerbeetle//reference/requests/query_transfers/","https://matklad.github.io/tigerbeetle//reference/requests/lookup_accounts/","https://matklad.github.io/tigerbeetle//reference/requests/create_accounts/","https://matklad.github.io/tigerbeetle//reference/sessions/","https://matklad.github.io/tigerbeetle//reference/account-balance/","https://matklad.github.io/tigerbeetle//reference/account/","https://matklad.github.io/tigerbeetle//operating/cluster/","https://matklad.github.io/tigerbeetle//operating/hardware/","https://matklad.github.io/tigerbeetle//operating/","https://matklad.github.io/tigerbeetle//operating/installing/","https://matklad.github.io/tigerbeetle//operating/upgrading/","https://matklad.github.io/tigerbeetle//operating/deploying/docker/","https://matklad.github.io/tigerbeetle//operating/deploying/","https://matklad.github.io/tigerbeetle//operating/deploying/systemd/","https://matklad.github.io/tigerbeetle//operating/deploying/managed-service/"]
;

self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  const normalizedUrl = normalizeUrl(event.request.url);

  event.respondWith(
    caches.match(normalizedUrl).then(response => {
      return response || fetch(event.request);
    })
  );
});

function normalizeUrl(url) {
  const urlObj = new URL(url);

  if (urlObj.search) {
    urlObj.search = "";
  }

  return urlObj.toString();
}
