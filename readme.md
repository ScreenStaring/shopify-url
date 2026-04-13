# Shopify URL

![Shopify URL CI Status](https://github.com/ScreenStaring/shopify-url/workflows/CI/badge.svg "Shopify URL CI Status")

Build URLs to Shopify web pages.

## Usage

### Admin URLs
```js
const { Admin } = require('shopify-url');

const url = new Admin('shopname');

// https://shopname.myshopify.com/admin
url.toString();

// https://shopname.myshopify.com/admin/orders
url.orders().toString();

// https://shopname.myshopify.com/admin/orders/6303508996
url.order(6303508996).toString();

// https://shopname.myshopify.com/admin/products
url.products().toString();

// https://shopname.myshopify.com/admin/products/345323423
url.product(345323423).toString();

// https://shopname.myshopify.com/admin/products/345323423/variants/2421342331
url.product(345323423).variant(2421342331);
```

And more!

### Store URLs

```js
const { Store } = require('shopify-url');

const url = new Store('shopname'); // can also be the site's top-level domain

// https://shopname.myshopify.com/collections
url.collections().toString();

// https://shopname.myshopify.com/collections/amaaaaazing-thangz
url.collection('amaaaaazing-thangz').toString();
```

And more!

### Query String Parameters

All Shopify URL generation methods accept an object of query string parameters:

```js
const { Store } = require('shopify_url');

const url = new Store('shopname'); // can also be the site's top-level domain

// https://shopname.myshopify.com/products/some-handle?tracking=data
url.products('some-handle', { tracking: 'data' }).toString();
```

### Use in the Browser

```html
<script src="https://cdn.jsdelivr.net/npm/shopify-url@VERSION/dist/index.umd.js"></script>
<script>
  const store = new ShopifyUrl.Store('my-shop');
  console.log(store.product(123).toString());

  const admin = new ShopifyUrl.Admin('my-shop');
  console.log(admin.order(456).shippingLabels().new());
</script>
```

### See Also

- [shopify-gid](https://www.npmjs.com/package/shopify-gid) - encoder/decoder for ID values returned from the Shopify Storefront GraphQL API
- The [Ruby Shopify URL gem](https://github.com/ScreenStaring/shopify_url) from which this is based.

---

Made by [ScreenStaring](http://screenstaring.com)
