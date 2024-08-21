import icons from "./Icons";

export interface Path{
  key: string,
  title: string,
  href: string,
  icon: keyof typeof icons,
  disableBreadcrumb?: boolean,
  disableNav?: boolean,
  matcher?: { type: 'startsWith' | 'equals'; href: string };
}

const Paths = {
  'overview' : { key: 'overview', title: 'ภาพรวม', href: "/", icon: 'chart-pie' },
  'cashier': { key: 'cashier', title: 'ขายสินค้า', href: "/cashier", icon: 'cashier' },
  'products': { key: 'products', title: 'สินค้า', href: "/products", icon: 'product' },
  'borrows': { key: 'borrows', title: 'การเบิก', href: "/borrows", icon: 'borrows' },
  'purchase': { key: 'purchase', title: 'ซื้อสินค้า', href: "/purchase", icon: 'purchase', matcher: { type: 'startsWith', href: "/purchase"} },
  'purchase.purchase': { key: 'purchase', title: 'รายละเอียดการซื้อสินค้า', href: "/purchase/:pid", icon: 'purchase' , disableNav: true },
  'stock': { key: 'stock', title: 'จัดการสต๊อก', href: "/stocks", icon: 'stock' },
  'categories': { key: 'categories', title: 'ประเภทสินค้า', href: "/categories", icon: 'category' },
  'histories': { key: 'histories', title: 'ประวัติการขายสินค้า', href: "/histories", icon: 'history', matcher: { type: 'startsWith', href: "/histories"} },
  'histories.history': { key: 'histories.history', title: 'รายละเอียดการขายสินค้า', href: "/histories/:hid", icon: 'history', disableNav: true },
  'signin': { key: 'signin', title: 'เข้าสู่ระบบ', href: "/auth/signin", icon: 'signin', disableBreadcrumb: true, disableNav: true },
  'signup': { key: 'signup', title: 'ลงทะเบียน', href: "/auth/signout", icon: 'signout', disableBreadcrumb: true, disableNav: true },
} satisfies Record<string, Path>

export const Path = (name: keyof typeof Paths) => Paths[name];
export default Object.values(Paths) as Path[];