const { Store, Admin } = require("./dist/index.cjs.js");

describe("Store", () => {
  let store;

  beforeEach(() => {
    store = new Store("my-shop");
  });

  test("constructor appends .myshopify.com and https", () => {
    expect(String(store)).toBe("https://my-shop.myshopify.com");
  });

  test("constructor preserves existing domain", () => {
    const s = new Store("my-shop.example.com");
    expect(String(s)).toBe("https://my-shop.example.com");
  });

  test("constructor preserves existing protocol", () => {
    const s = new Store("http://my-shop.example.com");
    expect(String(s)).toBe("http://my-shop.example.com");
  });

  test("constructor throws when shop is empty", () => {
    expect(() => new Store("")).toThrow("shop required");
    expect(() => new Store(null)).toThrow("shop required");
  });

  test("product returns URL with id", () => {
    expect(String(store.product(123))).toBe(
      "https://my-shop.myshopify.com/products/123"
    );
  });

  test("product with query params", () => {
    expect(String(store.product(123, { limit: 10 }))).toBe(
      "https://my-shop.myshopify.com/products/123?limit=10"
    );
  });

  test("product throws when id is empty", () => {
    expect(() => store.product("")).toThrow("id required");
  });

  test("products returns URL", () => {
    expect(String(store.products())).toBe(
      "https://my-shop.myshopify.com/products"
    );
  });

  test("products with query params", () => {
    expect(String(store.products({ page: 2 }))).toBe(
      "https://my-shop.myshopify.com/products?page=2"
    );
  });

  test("collection returns URL with id", () => {
    expect(String(store.collection("summer"))).toBe(
      "https://my-shop.myshopify.com/collections/summer"
    );
  });

  test("collections returns URL", () => {
    expect(String(store.collections())).toBe(
      "https://my-shop.myshopify.com/collections"
    );
  });

  test("page returns URL", () => {
    expect(store.page("about")).toBe(
      "https://my-shop.myshopify.com/pages/about"
    );
  });

  test("blogs returns URL", () => {
    expect(String(store.blogs("news"))).toBe(
      "https://my-shop.myshopify.com/blogs/news"
    );
  });

  test("blogs throws when category is empty", () => {
    expect(() => store.blogs("")).toThrow("category required");
  });

  test("blogs entry returns URL", () => {
    expect(store.blogs("news").entry("hello-world")).toBe(
      "https://my-shop.myshopify.com/blogs/news/hello-world"
    );
  });
});

describe("Admin", () => {
  let admin;

  beforeEach(() => {
    admin = new Admin("my-shop");
  });

  test("constructor appends /admin", () => {
    expect(String(admin)).toBe("https://my-shop.myshopify.com/admin");
  });

  test("order returns URL with id", () => {
    expect(String(admin.order(456))).toBe(
      "https://my-shop.myshopify.com/admin/orders/456"
    );
  });

  test("order shipping_labels returns URL", () => {
    expect(String(admin.order(456).shipping_labels())).toBe(
      "https://my-shop.myshopify.com/admin/orders/456/shipping_labels"
    );
  });

  test("order shipping_labels new returns URL", () => {
    expect(admin.order(456).shipping_labels().new()).toBe(
      "https://my-shop.myshopify.com/admin/orders/456/shipping_labels/new"
    );
  });

  test("orders returns URL", () => {
    expect(String(admin.orders())).toBe(
      "https://my-shop.myshopify.com/admin/orders"
    );
  });

  test("customer returns URL with id", () => {
    expect(String(admin.customer(789))).toBe(
      "https://my-shop.myshopify.com/admin/customers/789"
    );
  });

  test("customers returns URL", () => {
    expect(String(admin.customers())).toBe(
      "https://my-shop.myshopify.com/admin/customers"
    );
  });

  test("product returns URL with id", () => {
    expect(String(admin.product(101))).toBe(
      "https://my-shop.myshopify.com/admin/products/101"
    );
  });

  test("product variants returns URL", () => {
    expect(admin.product(101).variants(5)).toBe(
      "https://my-shop.myshopify.com/admin/products/101/variants/5"
    );
  });

  test("products returns URL", () => {
    expect(String(admin.products())).toBe(
      "https://my-shop.myshopify.com/admin/products"
    );
  });

  test("products inventory returns URL", () => {
    expect(admin.products().inventory()).toBe(
      "https://my-shop.myshopify.com/admin/products/inventory"
    );
  });

  test("draft_order returns URL", () => {
    expect(String(admin.draft_order(10))).toBe(
      "https://my-shop.myshopify.com/admin/draft_orders/10"
    );
  });

  test("draft_order duplicate returns URL", () => {
    expect(admin.draft_order(10).duplicate()).toBe(
      "https://my-shop.myshopify.com/admin/draft_orders/10/duplicate"
    );
  });

  test("draft_orders returns URL", () => {
    expect(String(admin.draft_orders())).toBe(
      "https://my-shop.myshopify.com/admin/draft_orders"
    );
  });

  test("draft_orders new returns URL", () => {
    expect(admin.draft_orders().new()).toBe(
      "https://my-shop.myshopify.com/admin/draft_orders/new"
    );
  });

  test("themes returns URL", () => {
    expect(admin.themes()).toBe(
      "https://my-shop.myshopify.com/admin/themes"
    );
  });

  test("theme returns URL with id", () => {
    expect(String(admin.theme(55))).toBe(
      "https://my-shop.myshopify.com/admin/themes/55"
    );
  });

  test("theme editor returns URL", () => {
    expect(admin.theme(55).editor()).toBe(
      "https://my-shop.myshopify.com/admin/themes/55/editor"
    );
  });
});
