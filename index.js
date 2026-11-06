const TOP_LEVEL_DOMAIN = ".myshopify.com";
const SHOP_DOMAIN_PATTERN = /^[a-z0-9-]+(\.myshopify\.com)?$/i;

class Linker {
  constructor(shop) {
    if (!shop || String(shop).trim() === "") {
      throw new Error("shop required");
    }
    this.host = String(shop);
    if (!/^https?:\/\//i.test(this.host)) {
      this.host = "https://" + this.host;
    }
  }

  toString() {
    return this.host;
  }

  valueOf() {
    return this.host;
  }

  toJSON() {
    return this.toString();
  }

  _idRequired(id) {
    if (!id || String(id).trim() === "") {
      throw new Error("id required");
    }
  }

  _empty(s) {
    return !s || String(s).trim() === "";
  }

  _q(params) {
    if (!params) return "";
    if (typeof params === "string") return params;

    const entries = Array.isArray(params) ? params : Object.entries(params);
    return new URLSearchParams(entries).toString();
  }
}

// ====================== STORE ======================
class Store extends Linker {
  constructor(shop) {
    super(shop);
    if (!/\.[-0-9a-z]+$/i.test(this.host)) {
      this.host += TOP_LEVEL_DOMAIN;
    }
    Object.freeze(this);
  }

  collection(id, query = null) {
    this._idRequired(id);
    return new StoreCollections(this.host, id, this._q(query));
  }

  collections(query = null) {
    return new StoreCollections(this.host, null, this._q(query));
  }

  product(id, query = null) {
    this._idRequired(id);
    return new StoreProduct(this.host, id, this._q(query));
  }

  products(query = null) {
    return new StoreProducts(this.host, this._q(query));
  }

  page(id, query = null) {
    let url = `${this.host}/pages/${String(id)}`;
    const qs = this._q(query);
    if (qs) url += `?${qs}`;
    return url;
  }

  blogs(category, query = null) {
    if (this._empty(category)) {
      throw new Error("category required");
    }
    return new StoreBlogs(this.host, category, this._q(query));
  }
}

// Store inner classes
class StoreCollections extends String {
  constructor(host, id = null, qs = null) {
    let base = `${host}/collections`;
    if (id) base += `/${String(id)}`;
    if (qs) base += `?${qs}`;
    super(base);
  }
}

class StoreProducts extends String {
  constructor(host, qs = null) {
    let base = `${host}/products`;
    if (qs) base += `?${qs}`;
    super(base);
  }
}

class StoreProduct extends String {
  constructor(host, id, qs = null) {
    let base = `${host}/products/${String(id)}`;
    if (qs) base += `?${qs}`;
    super(base);
  }
}

class StoreBlogs extends String {
  constructor(host, category, qs = null) {
    let base = `${host}/blogs/${String(category)}`;
    if (qs) base += `?${qs}`;
    super(base);
  }

  entry(name, params = null) {
    let url = `${this}/${String(name)}`;
    const qs = params && Object.keys(params).length
      ? new URLSearchParams(Object.entries(params)).toString()
      : "";
    if (qs) url += `?${qs}`;
    return url;
  }
}

// ====================== ADMIN ======================
class Admin extends Linker {
  constructor(shop) {
    super(shop);
    if (!SHOP_DOMAIN_PATTERN.test(shop)) {
      throw new Error("invalid shop");
    }
    if (!this.host.endsWith(TOP_LEVEL_DOMAIN)) {
      this.host += TOP_LEVEL_DOMAIN;
    }
    this.host += "/admin";
    Object.freeze(this);
  }

  customer(id, query = null) {
    this._idRequired(id);
    return new AdminCustomers(this.host, id, this._q(query));
  }

  customers(query = null) {
    return new AdminCustomers(this.host, null, this._q(query));
  }

  draftOrders(query = null) {
    return new AdminDraftOrders(this.host, this._q(query));
  }

  draftOrder(id, query = null) {
    this._idRequired(id);
    return new AdminDraftOrder(this.host, id, this._q(query));
  }

  order(id, query = null) {
    this._idRequired(id);
    return new AdminOrder(this.host, id, this._q(query));
  }

  orders(query = null) {
    return new AdminOrders(this.host, this._q(query));
  }

  product(id, query = null) {
    this._idRequired(id);
    return new AdminProduct(this.host, id, this._q(query));
  }

  products(query = null) {
    return new AdminProducts(this.host, this._q(query));
  }

  themes() {
    return `${this.host}/themes`;
  }

  theme(id, query = null) {
    this._idRequired(id);
    return new AdminTheme(this.host, id, this._q(query));
  }
}

// Admin inner classes
class AdminCustomers extends String {
  constructor(host, id = null, qs = null) {
    let base = `${host}/customers`;
    if (id) base += `/${String(id)}`;
    if (qs) base += `?${qs}`;
    super(base);
  }
}

class AdminProducts extends StoreProducts {
  inventory() {
    return `${this}/inventory`;
  }
}

class AdminProduct extends StoreProduct {
  variants(id, params = null) {
    let url = `${this}/variants/${String(id)}`;
    const qs = params && Object.keys(params).length
      ? new URLSearchParams(Object.entries(params)).toString()
      : "";
    if (qs) url += `?${qs}`;
    return url;
  }
}

class AdminOrder extends String {
  constructor(host, id, qs = null) {
    let base = `${host}/orders/${String(id)}`;
    if (qs) base += `?${qs}`;
    super(base);
  }

  shippingLabels() {
    return new AdminShippingLabel(`${this}/shipping_labels`);
  }
}

class AdminOrders extends String {
  constructor(host, qs = null) {
    let base = `${host}/orders`;
    if (qs) base += `?${qs}`;
    super(base);
  }
}

class AdminShippingLabel extends String {
  constructor(base) {
    super(base);
  }

  new(params = null) {
    let url = `${this}/new`;
    const qs = params && Object.keys(params).length
      ? new URLSearchParams(Object.entries(params)).toString()
      : "";
    if (qs) url += `?${qs}`;
    return url;
  }
}

class AdminTheme extends String {
  constructor(base, id, qs = null) {
    let url = `${base}/themes/${String(id)}`;
    if (qs) url += `?${qs}`;
    super(url);
  }

  editor(params = null) {
    let url = `${this}/editor`;
    const qs = params && Object.keys(params).length
      ? new URLSearchParams(Object.entries(params)).toString()
      : "";
    if (qs) url += `?${qs}`;
    return url;
  }
}

class AdminDraftOrder extends String {
  constructor(base, id, qs = null) {
    let url = `${base}/draft_orders/${String(id)}`;
    if (qs) url += `?${qs}`;
    super(url);
  }

  duplicate(params = null) {
    let url = `${this}/duplicate`;
    const qs = params && Object.keys(params).length
      ? new URLSearchParams(Object.entries(params)).toString()
      : "";
    if (qs) url += `?${qs}`;
    return url;
  }
}

class AdminDraftOrders extends String {
  constructor(base, qs = null) {
    let url = `${base}/draft_orders`;
    if (qs) url += `?${qs}`;
    super(url);
  }

  new(params = null) {
    let url = `${this}/new`;
    const qs = params && Object.keys(params).length
      ? new URLSearchParams(Object.entries(params)).toString()
      : "";
    if (qs) url += `?${qs}`;
    return url;
  }
}

// Public API
export {
  Store,
  Admin,
};
