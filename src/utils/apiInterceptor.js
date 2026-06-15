// API Interceptor to support offline/local-fallback mode when the backend is down.
import vespaImg from '../assets/vespa.png';
import jeepImg from '../assets/jeep.png';

const DEFAULT_USERS = [
  { name: "Test User", email: "test@example.com", password: "password123" },
  { name: "kishan malvaniya ", email: "kishanm@gmail.com", password: "12345" },
  { name: "vrunda ", email: "vrunda@gmail.com", password: "12345" }
];

const DEFAULT_PRODUCTS = [
  { id: 1, title: 'MacBook Pro M2', price: '₹95,000', category: 'Electronics', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80', seller: 'Alex M.' },
  { id: 2, title: 'Sony Alpha a7 III', price: '₹1,50,000', category: 'Electronics', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80', seller: 'Emma S.' },
  { id: 3, title: 'Minimalist Desk Lamp', price: '₹3,500', category: 'Furniture', img: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=500&q=80', seller: 'John D.' },
  { id: 4, title: 'Mountain Bike', price: '₹25,000', category: 'Vehicles', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=500&q=80', seller: 'Sarah L.' },
  { id: 5, title: 'Leather Sofa', price: '₹65,000', category: 'Furniture', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80', seller: 'Mike R.' },
  { id: 6, title: 'Gaming Headset', price: '₹6,000', category: 'Electronics', img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=80', seller: 'Chris J.' },
  { id: 7, title: 'Apple Watch Series 9', price: '₹42,00,000', category: 'Electronics', img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=500&q=80', seller: 'Liam T.' },
  { id: 8, title: 'Wooden Coffee Table', price: '₹8,500', category: 'Furniture', img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=500&q=80', seller: 'Sophia L.' },
  { id: 9, title: 'DJI Mini 4 Pro Drone', price: '₹85,000', category: 'Electronics', img: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=500&q=80', seller: 'Elias N.' },
  { id: 10, title: 'Vintage Bookshelf', price: '₹18,000', category: 'Furniture', img: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=500&q=80', seller: 'Noah C.' },
  { id: 11, title: 'BMW Mini Cooper', price: '₹45,00,000', category: 'Vehicles', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500&q=80', seller: 'Olivia M.' },
  { id: 12, title: 'Yamaha R1 Sports Bike', price: '₹22,00,000', category: 'Vehicles', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=500&q=80', seller: 'Rajesh P.' },
  { id: 13, title: 'Tesla Model 3', price: '₹60,00,000', category: 'Vehicles', img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=500&q=80', seller: 'Elon Musk' },
  { id: 14, title: 'Vintage Vespa Scooter', price: '₹95,000', category: 'Vehicles', img: vespaImg, seller: 'Luca B.' },
  { id: 15, title: 'Ford Mustang GT', price: '₹75,00,000', category: 'Vehicles', img: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=500&q=80', seller: 'Kevin K.' },
  { id: 16, title: 'Mercedes G-Wagon', price: '₹2,50,00,000', category: 'Vehicles', img: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=500&q=80', seller: 'Dimitri V.' },
  { id: 17, title: 'Ducati Panigale V4', price: '₹28,00,000', category: 'Vehicles', img: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=500&q=80', seller: 'Mario G.' },
  { id: 18, title: 'Jeep Wrangler Rubicon', price: '₹65,00,000', category: 'Vehicles', img: jeepImg, seller: 'Jake M.' }
];

// Helper functions for localStorage database
const getLocalUsers = () => {
  const users = localStorage.getItem('local_users');
  if (!users) {
    localStorage.setItem('local_users', JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }
  return JSON.parse(users);
};

const saveLocalUsers = (users) => {
  localStorage.setItem('local_users', JSON.stringify(users));
};

const getLocalProducts = () => {
  const products = localStorage.getItem('local_products');
  if (!products) {
    localStorage.setItem('local_products', JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  return JSON.parse(products);
};

const saveLocalProducts = (products) => {
  localStorage.setItem('local_products', JSON.stringify(products));
};

const getLocalOrders = () => {
  const orders = localStorage.getItem('local_orders');
  if (!orders) {
    localStorage.setItem('local_orders', JSON.stringify([]));
    return [];
  }
  return JSON.parse(orders);
};

const saveLocalOrders = (orders) => {
  localStorage.setItem('local_orders', JSON.stringify(orders));
};

// Interceptor hook
export function setupApiInterceptor() {
  const originalFetch = window.fetch;

  window.fetch = async function (resource, options = {}) {
    const urlString = typeof resource === 'string' ? resource : resource.url;
    
    // Check if the URL targets the local server
    if (urlString.startsWith('http://localhost:5000')) {
      try {
        // Try accessing backend
        const response = await originalFetch(resource, options);
        return response;
      } catch (error) {
        console.warn('Backend server is offline. Falling back to local storage client database.', error);
        
        // Parse request URL paths
        const urlObj = new URL(urlString);
        const path = urlObj.pathname;
        const method = (options.method || 'GET').toUpperCase();
        
        let status = 200;
        let responseData = {};

        // Parse body if present
        let body = {};
        if (options.body) {
          try {
            body = JSON.parse(options.body);
          } catch (e) {
            body = {};
          }
        }

        // Intercept logic based on API endpoints
        if (path === '/api/auth/signup' && method === 'POST') {
          const { name, email, password } = body;
          if (!name || !email || !password) {
            status = 400;
            responseData = { error: 'All fields (name, email, password) are required.' };
          } else {
            const users = getLocalUsers();
            const userExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());

            if (userExists) {
              status = 400;
              responseData = { error: 'User with this email already exists.' };
            } else {
              const newUser = { name, email, password };
              users.push(newUser);
              saveLocalUsers(users);
              status = 201;
              responseData = { message: 'User registered successfully!', user: { name, email } };
            }
          }
        } 
        else if (path === '/api/auth/login' && method === 'POST') {
          const { email, password } = body;
          if (!email || !password) {
            status = 400;
            responseData = { error: 'Email and password are required.' };
          } else {
            const users = getLocalUsers();
            const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

            if (!user) {
              status = 401;
              responseData = { error: 'Invalid email or password.' };
            } else {
              status = 200;
              responseData = { message: 'Login successful!', user: { name: user.name, email: user.email } };
            }
          }
        } 
        else if (path === '/api/products' && method === 'GET') {
          responseData = getLocalProducts();
          status = 200;
        } 
        else if (path === '/api/products' && method === 'POST') {
          const { title, price, category, img, seller } = body;
          if (!title || !price || !category) {
            status = 400;
            responseData = { error: 'Title, price, and category are required.' };
          } else {
            const products = getLocalProducts();
            const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

            let formattedPrice = price;
            if (typeof price === 'number' || !String(price).startsWith('₹')) {
              formattedPrice = `₹${Number(price).toLocaleString('en-IN')}`;
            }

            const newProduct = {
              id: nextId,
              title,
              price: formattedPrice,
              category,
              img: img || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80',
              seller: seller || 'Anonymous'
            };

            products.push(newProduct);
            saveLocalProducts(products);
            status = 201;
            responseData = { message: 'Product added successfully!', product: newProduct };
          }
        } 
        else if (path === '/api/orders' && method === 'GET') {
          responseData = getLocalOrders();
          status = 200;
        } 
        else if (path === '/api/orders' && method === 'POST') {
          const { total, items } = body;
          if (!total || !items || !Array.isArray(items)) {
            status = 400;
            responseData = { error: 'Total price and items array are required.' };
          } else {
            const orders = getLocalOrders();
            const randNum = Math.floor(1000 + Math.random() * 9000);
            
            const newOrder = {
              id: `ORD-${randNum}`,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              total: String(total).startsWith('₹') ? String(total).replace('₹', '') : String(total),
              status: 'Pending',
              items
            };

            orders.push(newOrder);
            saveLocalOrders(orders);
            status = 201;
            responseData = { message: 'Order created successfully!', order: newOrder };
          }
        } else {
          // If the route matches nothing else, fail with the network error
          throw error;
        }

        // Return a mock Response object matching standard Fetch response API
        const mockResponse = new Response(JSON.stringify(responseData), {
          status: status,
          statusText: status >= 200 && status < 300 ? 'OK' : 'Error',
          headers: { 'Content-Type': 'application/json' }
        });

        // Override response properties that can't be easily set in constructor
        Object.defineProperty(mockResponse, 'ok', {
          value: status >= 200 && status < 300,
          writable: false
        });

        return mockResponse;
      }
    }

    // Default fetch for external resources/assets
    return originalFetch(resource, options);
  };
}
