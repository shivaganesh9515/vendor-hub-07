// Mock data for Indian Grocery Vendor Dashboard

export const vendorInfo = {
  name: "Fresh Fruits Corner",
  category: "Fruits & Vegetables",
  rating: 4.5,
  reviewCount: 1234,
  status: "active" as const,
  logo: "🥬",
  ownerName: "Rajesh Kumar",
  address: "Shop No. 45, Sector 18 Market, Noida",
  city: "Noida",
  state: "Uttar Pradesh",
  pincode: "201301",
  phone: "+91 98765 43210",
  email: "freshfruits@gmail.com",
  gst: "09AAACR5055K1Z1",
  fssai: "12345678901234",
};

export const bankDetails = {
  accountHolder: "Rajesh Kumar",
  accountNumber: "****4521",
  bankName: "State Bank of India",
  ifsc: "SBIN0001234",
  branch: "Sector 18, Noida",
};

export const storeTimings = [
  { day: "Monday", isOpen: true, openTime: "08:00", closeTime: "21:00" },
  { day: "Tuesday", isOpen: true, openTime: "08:00", closeTime: "21:00" },
  { day: "Wednesday", isOpen: true, openTime: "08:00", closeTime: "21:00" },
  { day: "Thursday", isOpen: true, openTime: "08:00", closeTime: "21:00" },
  { day: "Friday", isOpen: true, openTime: "08:00", closeTime: "21:00" },
  { day: "Saturday", isOpen: true, openTime: "08:00", closeTime: "22:00" },
  { day: "Sunday", isOpen: false, openTime: "10:00", closeTime: "18:00" },
];

export const dashboardMetrics = {
  todaysOrders: 47,
  activeOrders: 8,
  pendingPickup: 8,
  todaysRevenue: 23450,
  revenueChange: 18,
  totalProducts: 156,
  outOfStock: 12,
  customerRating: 4.5,
  totalReviews: 1234,
};

export const categories = [
  "Fruits",
  "Vegetables",
  "Dairy",
  "Bakery",
  "Meat",
  "Groceries",
  "Beverages",
  "Snacks",
];

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  isActive: boolean;
  image: string;
  description: string;
  lastUpdated: string;
}

export const products: Product[] = [
  { id: "P001", name: "Organic Tomatoes", category: "Vegetables", price: 40, unit: "kg", stock: 45, isActive: true, image: "🍅", description: "Fresh organic tomatoes from local farms", lastUpdated: "2024-12-15 10:30" },
  { id: "P002", name: "Fresh Onions", category: "Vegetables", price: 35, unit: "kg", stock: 60, isActive: true, image: "🧅", description: "Premium quality onions", lastUpdated: "2024-12-15 09:15" },
  { id: "P003", name: "Green Capsicum", category: "Vegetables", price: 80, unit: "kg", stock: 25, isActive: true, image: "🫑", description: "Crispy green capsicum", lastUpdated: "2024-12-14 16:45" },
  { id: "P004", name: "Potatoes", category: "Vegetables", price: 30, unit: "kg", stock: 100, isActive: true, image: "🥔", description: "Farm fresh potatoes", lastUpdated: "2024-12-15 08:00" },
  { id: "P005", name: "Carrots", category: "Vegetables", price: 45, unit: "kg", stock: 35, isActive: true, image: "🥕", description: "Organic carrots", lastUpdated: "2024-12-14 14:30" },
  { id: "P006", name: "Fresh Apples", category: "Fruits", price: 180, unit: "kg", stock: 30, isActive: true, image: "🍎", description: "Imported red apples", lastUpdated: "2024-12-15 07:00" },
  { id: "P007", name: "Bananas", category: "Fruits", price: 50, unit: "dozen", stock: 40, isActive: true, image: "🍌", description: "Fresh yellow bananas", lastUpdated: "2024-12-15 06:30" },
  { id: "P008", name: "Mangoes", category: "Fruits", price: 120, unit: "kg", stock: 0, isActive: false, image: "🥭", description: "Alphonso mangoes (seasonal)", lastUpdated: "2024-12-10 12:00" },
  { id: "P009", name: "Oranges", category: "Fruits", price: 90, unit: "kg", stock: 25, isActive: true, image: "🍊", description: "Nagpur oranges", lastUpdated: "2024-12-14 15:00" },
  { id: "P010", name: "Grapes", category: "Fruits", price: 100, unit: "kg", stock: 4, isActive: true, image: "🍇", description: "Seedless green grapes", lastUpdated: "2024-12-15 09:00" },
  { id: "P011", name: "Amul Milk", category: "Dairy", price: 60, unit: "liter", stock: 50, isActive: true, image: "🥛", description: "Full cream milk 1L", lastUpdated: "2024-12-15 05:00" },
  { id: "P012", name: "Paneer", category: "Dairy", price: 320, unit: "kg", stock: 15, isActive: true, image: "🧀", description: "Fresh cottage cheese", lastUpdated: "2024-12-15 06:00" },
  { id: "P013", name: "Curd", category: "Dairy", price: 45, unit: "kg", stock: 3, isActive: true, image: "🥣", description: "Fresh homemade curd", lastUpdated: "2024-12-15 05:30" },
  { id: "P014", name: "Butter", category: "Dairy", price: 55, unit: "100gm", stock: 20, isActive: true, image: "🧈", description: "Amul butter", lastUpdated: "2024-12-14 10:00" },
  { id: "P015", name: "Eggs", category: "Dairy", price: 80, unit: "dozen", stock: 2, isActive: true, image: "🥚", description: "Farm fresh eggs", lastUpdated: "2024-12-15 07:30" },
];

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  total: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  deliveryInstructions: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  status: "new" | "preparing" | "ready" | "picked_up" | "delivered" | "cancelled";
  deliveryType: "delivery" | "pickup";
  orderTime: string;
  acceptedTime?: string;
  preparingTime?: string;
  readyTime?: string;
  pickedUpTime?: string;
  deliveredTime?: string;
}

export const newOrders: Order[] = [
  {
    id: "ORD-12345",
    customerName: "Priya Sharma",
    customerPhone: "+91 98123 45678",
    customerAddress: "Flat 302, Green Valley Apartments, Sector 62, Noida",
    deliveryInstructions: "Please ring the doorbell twice",
    items: [
      { productId: "P001", name: "Organic Tomatoes", quantity: 2, unit: "kg", pricePerUnit: 40, total: 80 },
      { productId: "P002", name: "Fresh Onions", quantity: 3, unit: "kg", pricePerUnit: 35, total: 105 },
      { productId: "P011", name: "Amul Milk", quantity: 2, unit: "liter", pricePerUnit: 60, total: 120 },
    ],
    subtotal: 305,
    deliveryCharge: 30,
    total: 335,
    status: "new",
    deliveryType: "delivery",
    orderTime: "2024-12-15 14:25",
  },
  {
    id: "ORD-12346",
    customerName: "Amit Verma",
    customerPhone: "+91 99876 54321",
    customerAddress: "House 45, Block B, Mayur Vihar Phase 3",
    deliveryInstructions: "",
    items: [
      { productId: "P006", name: "Fresh Apples", quantity: 1, unit: "kg", pricePerUnit: 180, total: 180 },
      { productId: "P007", name: "Bananas", quantity: 2, unit: "dozen", pricePerUnit: 50, total: 100 },
      { productId: "P012", name: "Paneer", quantity: 0.5, unit: "kg", pricePerUnit: 320, total: 160 },
      { productId: "P004", name: "Potatoes", quantity: 2, unit: "kg", pricePerUnit: 30, total: 60 },
      { productId: "P005", name: "Carrots", quantity: 1, unit: "kg", pricePerUnit: 45, total: 45 },
    ],
    subtotal: 545,
    deliveryCharge: 40,
    total: 585,
    status: "new",
    deliveryType: "delivery",
    orderTime: "2024-12-15 14:20",
  },
  {
    id: "ORD-12347",
    customerName: "Neha Gupta",
    customerPhone: "+91 87654 32109",
    customerAddress: "",
    deliveryInstructions: "Will pickup from counter",
    items: [
      { productId: "P009", name: "Oranges", quantity: 2, unit: "kg", pricePerUnit: 90, total: 180 },
      { productId: "P010", name: "Grapes", quantity: 1, unit: "kg", pricePerUnit: 100, total: 100 },
    ],
    subtotal: 280,
    deliveryCharge: 0,
    total: 280,
    status: "new",
    deliveryType: "pickup",
    orderTime: "2024-12-15 14:15",
  },
  {
    id: "ORD-12348",
    customerName: "Sanjay Patel",
    customerPhone: "+91 76543 21098",
    customerAddress: "Shop 12, Atta Market, Sector 27",
    deliveryInstructions: "Call before delivery",
    items: [
      { productId: "P001", name: "Organic Tomatoes", quantity: 5, unit: "kg", pricePerUnit: 40, total: 200 },
      { productId: "P002", name: "Fresh Onions", quantity: 5, unit: "kg", pricePerUnit: 35, total: 175 },
      { productId: "P004", name: "Potatoes", quantity: 5, unit: "kg", pricePerUnit: 30, total: 150 },
    ],
    subtotal: 525,
    deliveryCharge: 50,
    total: 575,
    status: "new",
    deliveryType: "delivery",
    orderTime: "2024-12-15 14:10",
  },
  {
    id: "ORD-12349",
    customerName: "Kavita Singh",
    customerPhone: "+91 65432 10987",
    customerAddress: "D-45, Sector 15, Noida",
    deliveryInstructions: "",
    items: [
      { productId: "P011", name: "Amul Milk", quantity: 4, unit: "liter", pricePerUnit: 60, total: 240 },
      { productId: "P013", name: "Curd", quantity: 1, unit: "kg", pricePerUnit: 45, total: 45 },
      { productId: "P014", name: "Butter", quantity: 2, unit: "100gm", pricePerUnit: 55, total: 110 },
    ],
    subtotal: 395,
    deliveryCharge: 25,
    total: 420,
    status: "new",
    deliveryType: "delivery",
    orderTime: "2024-12-15 14:05",
  },
  {
    id: "ORD-12350",
    customerName: "Rahul Jain",
    customerPhone: "+91 54321 09876",
    customerAddress: "A-23, Lajpat Nagar",
    deliveryInstructions: "Leave at door",
    items: [
      { productId: "P003", name: "Green Capsicum", quantity: 0.5, unit: "kg", pricePerUnit: 80, total: 40 },
      { productId: "P005", name: "Carrots", quantity: 1, unit: "kg", pricePerUnit: 45, total: 45 },
    ],
    subtotal: 85,
    deliveryCharge: 20,
    total: 105,
    status: "new",
    deliveryType: "delivery",
    orderTime: "2024-12-15 14:00",
  },
];

export const activeOrders: Order[] = [
  {
    id: "ORD-12340",
    customerName: "Anita Desai",
    customerPhone: "+91 98765 11111",
    customerAddress: "B-12, Vasant Kunj",
    deliveryInstructions: "",
    items: [
      { productId: "P006", name: "Fresh Apples", quantity: 2, unit: "kg", pricePerUnit: 180, total: 360 },
    ],
    subtotal: 360,
    deliveryCharge: 30,
    total: 390,
    status: "preparing",
    deliveryType: "delivery",
    orderTime: "2024-12-15 13:30",
    acceptedTime: "2024-12-15 13:32",
    preparingTime: "2024-12-15 13:35",
  },
  {
    id: "ORD-12341",
    customerName: "Vikas Malhotra",
    customerPhone: "+91 98765 22222",
    customerAddress: "",
    deliveryInstructions: "Counter pickup",
    items: [
      { productId: "P011", name: "Amul Milk", quantity: 5, unit: "liter", pricePerUnit: 60, total: 300 },
      { productId: "P012", name: "Paneer", quantity: 1, unit: "kg", pricePerUnit: 320, total: 320 },
    ],
    subtotal: 620,
    deliveryCharge: 0,
    total: 620,
    status: "ready",
    deliveryType: "pickup",
    orderTime: "2024-12-15 13:00",
    acceptedTime: "2024-12-15 13:02",
    preparingTime: "2024-12-15 13:05",
    readyTime: "2024-12-15 13:20",
  },
  {
    id: "ORD-12342",
    customerName: "Pooja Reddy",
    customerPhone: "+91 98765 33333",
    customerAddress: "Flat 501, Sunshine Towers",
    deliveryInstructions: "Ring bell",
    items: [
      { productId: "P001", name: "Organic Tomatoes", quantity: 1, unit: "kg", pricePerUnit: 40, total: 40 },
      { productId: "P002", name: "Fresh Onions", quantity: 2, unit: "kg", pricePerUnit: 35, total: 70 },
      { productId: "P003", name: "Green Capsicum", quantity: 0.5, unit: "kg", pricePerUnit: 80, total: 40 },
    ],
    subtotal: 150,
    deliveryCharge: 25,
    total: 175,
    status: "preparing",
    deliveryType: "delivery",
    orderTime: "2024-12-15 13:45",
    acceptedTime: "2024-12-15 13:47",
    preparingTime: "2024-12-15 13:50",
  },
  {
    id: "ORD-12343",
    customerName: "Suresh Iyer",
    customerPhone: "+91 98765 44444",
    customerAddress: "G-7, Greater Kailash",
    deliveryInstructions: "",
    items: [
      { productId: "P007", name: "Bananas", quantity: 3, unit: "dozen", pricePerUnit: 50, total: 150 },
      { productId: "P009", name: "Oranges", quantity: 2, unit: "kg", pricePerUnit: 90, total: 180 },
    ],
    subtotal: 330,
    deliveryCharge: 35,
    total: 365,
    status: "picked_up",
    deliveryType: "delivery",
    orderTime: "2024-12-15 12:30",
    acceptedTime: "2024-12-15 12:32",
    preparingTime: "2024-12-15 12:35",
    readyTime: "2024-12-15 12:50",
    pickedUpTime: "2024-12-15 13:00",
  },
  {
    id: "ORD-12344",
    customerName: "Meera Kapoor",
    customerPhone: "+91 98765 55555",
    customerAddress: "C-99, Saket",
    deliveryInstructions: "Call on arrival",
    items: [
      { productId: "P004", name: "Potatoes", quantity: 3, unit: "kg", pricePerUnit: 30, total: 90 },
      { productId: "P005", name: "Carrots", quantity: 2, unit: "kg", pricePerUnit: 45, total: 90 },
      { productId: "P002", name: "Fresh Onions", quantity: 2, unit: "kg", pricePerUnit: 35, total: 70 },
    ],
    subtotal: 250,
    deliveryCharge: 30,
    total: 280,
    status: "ready",
    deliveryType: "delivery",
    orderTime: "2024-12-15 13:15",
    acceptedTime: "2024-12-15 13:17",
    preparingTime: "2024-12-15 13:20",
    readyTime: "2024-12-15 13:40",
  },
  {
    id: "ORD-12335",
    customerName: "Deepak Sharma",
    customerPhone: "+91 98765 66666",
    customerAddress: "E-12, Dwarka Sector 7",
    deliveryInstructions: "",
    items: [
      { productId: "P015", name: "Eggs", quantity: 2, unit: "dozen", pricePerUnit: 80, total: 160 },
      { productId: "P011", name: "Amul Milk", quantity: 2, unit: "liter", pricePerUnit: 60, total: 120 },
    ],
    subtotal: 280,
    deliveryCharge: 40,
    total: 320,
    status: "preparing",
    deliveryType: "delivery",
    orderTime: "2024-12-15 13:50",
    acceptedTime: "2024-12-15 13:52",
    preparingTime: "2024-12-15 13:55",
  },
  {
    id: "ORD-12336",
    customerName: "Rekha Agarwal",
    customerPhone: "+91 98765 77777",
    customerAddress: "",
    deliveryInstructions: "Self pickup",
    items: [
      { productId: "P010", name: "Grapes", quantity: 2, unit: "kg", pricePerUnit: 100, total: 200 },
    ],
    subtotal: 200,
    deliveryCharge: 0,
    total: 200,
    status: "picked_up",
    deliveryType: "pickup",
    orderTime: "2024-12-15 12:00",
    acceptedTime: "2024-12-15 12:02",
    preparingTime: "2024-12-15 12:05",
    readyTime: "2024-12-15 12:15",
    pickedUpTime: "2024-12-15 12:30",
  },
  {
    id: "ORD-12337",
    customerName: "Ajay Thakur",
    customerPhone: "+91 98765 88888",
    customerAddress: "F-45, Rohini Sector 3",
    deliveryInstructions: "Deliver to watchman",
    items: [
      { productId: "P001", name: "Organic Tomatoes", quantity: 3, unit: "kg", pricePerUnit: 40, total: 120 },
      { productId: "P006", name: "Fresh Apples", quantity: 1, unit: "kg", pricePerUnit: 180, total: 180 },
    ],
    subtotal: 300,
    deliveryCharge: 35,
    total: 335,
    status: "ready",
    deliveryType: "delivery",
    orderTime: "2024-12-15 13:10",
    acceptedTime: "2024-12-15 13:12",
    preparingTime: "2024-12-15 13:15",
    readyTime: "2024-12-15 13:35",
  },
];

export const lowStockItems = products.filter(p => p.stock > 0 && p.stock <= 5);

export interface Payout {
  id: string;
  period: string;
  totalOrders: number;
  grossAmount: number;
  commission: number;
  netAmount: number;
  status: "settled" | "pending";
  settlementDate: string;
}

export const payouts: Payout[] = [
  { id: "PAY-001", period: "1-15 Dec 2024", totalOrders: 245, grossAmount: 52400, commission: 5240, netAmount: 47160, status: "pending", settlementDate: "20 Dec 2024" },
  { id: "PAY-002", period: "16-30 Nov 2024", totalOrders: 312, grossAmount: 68500, commission: 6850, netAmount: 61650, status: "settled", settlementDate: "5 Dec 2024" },
  { id: "PAY-003", period: "1-15 Nov 2024", totalOrders: 289, grossAmount: 61200, commission: 6120, netAmount: 55080, status: "settled", settlementDate: "20 Nov 2024" },
  { id: "PAY-004", period: "16-31 Oct 2024", totalOrders: 278, grossAmount: 58900, commission: 5890, netAmount: 53010, status: "settled", settlementDate: "5 Nov 2024" },
  { id: "PAY-005", period: "1-15 Oct 2024", totalOrders: 256, grossAmount: 54300, commission: 5430, netAmount: 48870, status: "settled", settlementDate: "20 Oct 2024" },
];

export const earningsData = [
  { date: "Nov 15", amount: 1850 },
  { date: "Nov 16", amount: 2100 },
  { date: "Nov 17", amount: 1650 },
  { date: "Nov 18", amount: 2400 },
  { date: "Nov 19", amount: 2850 },
  { date: "Nov 20", amount: 1950 },
  { date: "Nov 21", amount: 2200 },
  { date: "Nov 22", amount: 2650 },
  { date: "Nov 23", amount: 3100 },
  { date: "Nov 24", amount: 2800 },
  { date: "Nov 25", amount: 2450 },
  { date: "Nov 26", amount: 2100 },
  { date: "Nov 27", amount: 2350 },
  { date: "Nov 28", amount: 2900 },
  { date: "Nov 29", amount: 3250 },
  { date: "Nov 30", amount: 2750 },
  { date: "Dec 1", amount: 2400 },
  { date: "Dec 2", amount: 2150 },
  { date: "Dec 3", amount: 2600 },
  { date: "Dec 4", amount: 2850 },
  { date: "Dec 5", amount: 3100 },
  { date: "Dec 6", amount: 2700 },
  { date: "Dec 7", amount: 3400 },
  { date: "Dec 8", amount: 2950 },
  { date: "Dec 9", amount: 2200 },
  { date: "Dec 10", amount: 2550 },
  { date: "Dec 11", amount: 2800 },
  { date: "Dec 12", amount: 3150 },
  { date: "Dec 13", amount: 2650 },
  { date: "Dec 14", amount: 2900 },
  { date: "Dec 15", amount: 2350 },
];

export interface Notification {
  id: string;
  type: "order" | "alert" | "info";
  message: string;
  time: string;
  isRead: boolean;
}

export const notifications: Notification[] = [
  { id: "N001", type: "order", message: "New order #ORD-12345 received", time: "5 mins ago", isRead: false },
  { id: "N002", type: "order", message: "New order #ORD-12346 received", time: "10 mins ago", isRead: false },
  { id: "N003", type: "alert", message: "Grapes stock is running low (4 left)", time: "15 mins ago", isRead: false },
  { id: "N004", type: "order", message: "Order #ORD-12340 picked up by delivery partner", time: "30 mins ago", isRead: true },
  { id: "N005", type: "info", message: "Your payout of ₹47,160 will be settled on 20 Dec", time: "1 hour ago", isRead: true },
  { id: "N006", type: "alert", message: "Eggs stock is critically low (2 left)", time: "2 hours ago", isRead: true },
  { id: "N007", type: "order", message: "New order #ORD-12347 received", time: "2 hours ago", isRead: true },
  { id: "N008", type: "info", message: "Weekly sales report is ready", time: "3 hours ago", isRead: true },
];

export const allOrders: Order[] = [...newOrders, ...activeOrders];
