/**
 * OrganicTrade — Shared Data Store
 * Simulates a backend database using localStorage
 */

const Store = (() => {
  const KEYS = {
    USERS: 'ot_users',
    PRODUCTS: 'ot_products',
    ORDERS: 'ot_orders',
    CART: 'ot_cart',
    WISHLIST: 'ot_wishlist',
    SESSION: 'ot_session',
    INITIALIZED: 'ot_initialized'
  };

  // ─── Utility ────────────────────────────────────────────
  const get = (key) => JSON.parse(localStorage.getItem(key) || 'null');
  const set = (key, val) => localStorage.setItem(key, JSON.stringify(val));
  const uid = () => 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  const now = () => new Date().toISOString();

  // ─── Seed Data ───────────────────────────────────────────
  const SEED_USERS = [
    {
      id: 'usr_admin_001',
      name: 'Admin User',
      email: 'admin@organictrade.com',
      password: 'Admin@123',
      role: 'admin',
      avatar: 'A',
      createdAt: '2024-01-01T00:00:00.000Z',
      status: 'active'
    },
    {
      id: 'usr_vendor_001',
      name: 'Product Manager',
      email: 'vendor@organictrade.com',
      password: 'Vendor@123',
      role: 'vendor',
      avatar: 'P',
      company: 'OrganicTrade Imports',
      createdAt: '2024-01-01T00:00:00.000Z',
      status: 'active',
      approved: true
    },
    {
      id: 'usr_customer_001',
      name: 'Demo Customer',
      email: 'demo@organictrade.com',
      password: 'Demo@123',
      role: 'customer',
      avatar: 'D',
      createdAt: '2024-01-01T00:00:00.000Z',
      status: 'active',
      address: {
        street: '123 Green Avenue',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States'
      }
    }
  ];

  const SEED_PRODUCTS = [
    // ── SPICES ──────────────────────────────────────────────
    {
      id: 'prd_001', name: 'Organic Turmeric Powder', category: 'Spices',
      price: 12.99, salePrice: null, unit: 'per kg', moq: 1, stock: 450,
      origin: 'India', certifications: ['USDA Organic', 'Non-GMO'],
      description: 'Premium sun-dried turmeric root, cold-ground to preserve curcumin potency. Rich golden color, earthy aroma. Perfect for culinary and wellness use.',
      longDescription: 'Our Organic Turmeric Powder is sourced from the fertile soils of Erode, Tamil Nadu — the spice capital of the world. Each batch is carefully harvested, sun-dried for 15 days, and cold-ground to preserve the maximum curcumin content (5-7%). Tested and certified by third-party labs.',
      image: 'https://images.unsplash.com/photo-1615485500704-8e3b5858f00e?w=400&q=80',
      rating: 4.8, reviews: 142, featured: true, active: true,
      vendorId: 'usr_vendor_001', tags: ['turmeric', 'spice', 'anti-inflammatory', 'golden'],
      createdAt: '2024-01-15T00:00:00.000Z'
    },
    {
      id: 'prd_002', name: 'Organic Cumin Seeds', category: 'Spices',
      price: 8.99, salePrice: 7.49, unit: 'per kg', moq: 1, stock: 280,
      origin: 'India', certifications: ['USDA Organic'],
      description: 'Hand-harvested cumin seeds with intense earthy aroma and warm flavor profile. Essential for Indian and Middle Eastern cuisines.',
      longDescription: 'Sourced from Rajasthan, these organic cumin seeds are harvested by hand to ensure only the finest quality reaches your kitchen. Rich in iron, magnesium, and antioxidants. Aromatic and bold — just a pinch transforms any dish.',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821eec9c57?w=400&q=80',
      rating: 4.6, reviews: 89, featured: false, active: true,
      vendorId: 'usr_vendor_001', tags: ['cumin', 'spice', 'jeera', 'seeds'],
      createdAt: '2024-01-20T00:00:00.000Z'
    },
    {
      id: 'prd_003', name: 'Organic Green Cardamom', category: 'Spices',
      price: 45.99, salePrice: null, unit: 'per kg', moq: 0.5, stock: 120,
      origin: 'Guatemala', certifications: ['USDA Organic', 'Fair Trade'],
      description: 'The "Queen of Spices" — intensely aromatic green pods with sweet, floral notes. Perfect for chai, desserts, and savory dishes.',
      longDescription: 'Our Green Cardamom is sourced from the misty highlands of Guatemala where ideal conditions produce pods with exceptional oil content. Each pod is hand-picked at peak ripeness, ensuring a complex flavor profile of sweet florals, mint, and spice.',
      image: 'https://images.unsplash.com/photo-1599909631628-89f9d52d6e8d?w=400&q=80',
      rating: 4.9, reviews: 203, featured: true, active: true,
      vendorId: 'usr_vendor_001', tags: ['cardamom', 'spice', 'chai', 'aromatic'],
      createdAt: '2024-02-01T00:00:00.000Z'
    },
    {
      id: 'prd_004', name: 'Organic Black Pepper', category: 'Spices',
      price: 18.99, salePrice: null, unit: 'per kg', moq: 1, stock: 340,
      origin: 'Vietnam', certifications: ['USDA Organic', 'Non-GMO'],
      description: 'Bold, pungent Tellicherry-grade black peppercorns. The king of spices — essential in every kitchen worldwide.',
      longDescription: 'Carefully sourced from Vietnam\'s premium pepper regions, these large, bold peppercorns deliver a sharp, pungent heat with complex floral undertones. Dried naturally to lock in essential oils for maximum flavor impact.',
      image: 'https://images.unsplash.com/photo-1612257416012-e50d9a963a4b?w=400&q=80',
      rating: 4.7, reviews: 156, featured: false, active: true,
      vendorId: 'usr_vendor_001', tags: ['pepper', 'black pepper', 'spice', 'peppercorn'],
      createdAt: '2024-02-05T00:00:00.000Z'
    },
    // ── GRAINS ──────────────────────────────────────────────
    {
      id: 'prd_005', name: 'Organic White Quinoa', category: 'Grains',
      price: 14.99, salePrice: 12.99, unit: 'per kg', moq: 1, stock: 500,
      origin: 'Peru', certifications: ['USDA Organic', 'Fair Trade', 'Non-GMO'],
      description: 'Ancient Andean superfood packed with complete protein, all 9 essential amino acids. Light, fluffy texture with mild nutty flavor.',
      longDescription: 'Grown at altitudes above 12,000 feet in the Andes mountains of Peru, our quinoa is a complete protein powerhouse containing all 9 essential amino acids. Naturally gluten-free and rich in fiber, iron, and magnesium. Pre-washed to remove saponins.',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
      rating: 4.8, reviews: 278, featured: true, active: true,
      vendorId: 'usr_vendor_001', tags: ['quinoa', 'grain', 'superfood', 'protein'],
      createdAt: '2024-02-10T00:00:00.000Z'
    },
    {
      id: 'prd_006', name: 'Organic Brown Rice', category: 'Grains',
      price: 6.99, salePrice: null, unit: 'per kg', moq: 2, stock: 800,
      origin: 'Thailand', certifications: ['USDA Organic'],
      description: 'Long-grain Thai brown rice with nutty flavor and chewy texture. High in fiber, vitamins, and minerals. Whole grain goodness.',
      longDescription: 'Sourced from sustainable farms in Thailand\'s Chiang Rai province, this long-grain brown rice retains its bran layer for maximum nutritional value. Higher in fiber, vitamins B1, B2, B3, and minerals compared to white rice.',
      image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=400&q=80',
      rating: 4.5, reviews: 167, featured: false, active: true,
      vendorId: 'usr_vendor_001', tags: ['rice', 'brown rice', 'grain', 'whole grain'],
      createdAt: '2024-02-15T00:00:00.000Z'
    },
    {
      id: 'prd_007', name: 'Organic Pearl Millet', category: 'Grains',
      price: 7.99, salePrice: null, unit: 'per kg', moq: 1, stock: 350,
      origin: 'India', certifications: ['USDA Organic', 'Non-GMO'],
      description: 'Nutrient-dense ancient grain with high iron and zinc content. Naturally gluten-free, great for flatbreads and porridges.',
      longDescription: 'Pearl millet, known as Bajra in India, has been cultivated for over 4,000 years. One of the most drought-resistant crops, it thrives without chemical inputs. Rich in iron, zinc, magnesium, and B vitamins. Ideal for gluten-free baking.',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80',
      rating: 4.4, reviews: 78, featured: false, active: true,
      vendorId: 'usr_vendor_001', tags: ['millet', 'bajra', 'grain', 'gluten-free'],
      createdAt: '2024-02-20T00:00:00.000Z'
    },
    {
      id: 'prd_008', name: 'Organic Wheat Berries', category: 'Grains',
      price: 5.99, salePrice: null, unit: 'per kg', moq: 2, stock: 420,
      origin: 'USA', certifications: ['USDA Organic'],
      description: 'Whole, intact wheat kernels with chewy texture and nutty flavor. The most nutritious form of wheat — use in salads, pilafs, or grind fresh flour.',
      longDescription: 'Hard red wheat berries from Montana\'s organic farms are the complete, unprocessed wheat kernel — bran, germ, and endosperm intact. Significantly higher in nutrients than processed flour. Can be sprouted, cooked whole, or milled fresh.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
      rating: 4.3, reviews: 54, featured: false, active: true,
      vendorId: 'usr_vendor_001', tags: ['wheat', 'grain', 'whole wheat', 'ancient grain'],
      createdAt: '2024-03-01T00:00:00.000Z'
    },
    // ── HERBS ───────────────────────────────────────────────
    {
      id: 'prd_009', name: 'Organic Ashwagandha Root Powder', category: 'Herbs',
      price: 24.99, salePrice: 21.99, unit: 'per kg', moq: 0.5, stock: 200,
      origin: 'India', certifications: ['USDA Organic', 'Non-GMO'],
      description: 'KSM-66® grade adaptogenic herb powder. Reduces stress, boosts energy, and supports immune function. Ancient Ayurvedic wisdom.',
      longDescription: 'Ashwagandha (Withania somnifera) has been used in Ayurvedic medicine for over 3,000 years. Our root powder is made exclusively from the roots (not leaves) for maximum withanolide content. Supports healthy stress response, energy levels, and cognitive function.',
      image: 'https://images.unsplash.com/photo-1564767655658-4e13b3d8e02a?w=400&q=80',
      rating: 4.9, reviews: 312, featured: true, active: true,
      vendorId: 'usr_vendor_001', tags: ['ashwagandha', 'adaptogen', 'herb', 'ayurveda', 'stress'],
      createdAt: '2024-03-05T00:00:00.000Z'
    },
    {
      id: 'prd_010', name: 'Organic Moringa Powder', category: 'Herbs',
      price: 19.99, salePrice: null, unit: 'per kg', moq: 0.5, stock: 180,
      origin: 'Philippines', certifications: ['USDA Organic', 'Non-GMO'],
      description: 'Nutrient-dense "miracle tree" leaf powder. Contains 46 antioxidants and 92 nutrients including vitamins A, C, and 9 essential amino acids.',
      longDescription: 'Called the "miracle tree", Moringa oleifera leaves are one of the most nutrient-dense plant foods on earth. Our powder is made from young leaves, shade-dried at low temperature to preserve all nutrients. Mildly flavored — easy to blend into smoothies, soups, or teas.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
      rating: 4.7, reviews: 198, featured: false, active: true,
      vendorId: 'usr_vendor_001', tags: ['moringa', 'superfood', 'herb', 'green', 'nutrient'],
      createdAt: '2024-03-10T00:00:00.000Z'
    },
    {
      id: 'prd_011', name: 'Organic Holy Basil (Tulsi)', category: 'Herbs',
      price: 15.99, salePrice: null, unit: 'per kg', moq: 0.5, stock: 150,
      origin: 'India', certifications: ['USDA Organic'],
      description: 'Sacred adaptogenic herb with clove-like aroma. Supports immunity, reduces anxiety, and balances blood sugar. Brew as tea or use in cooking.',
      longDescription: 'Holy Basil, revered in Hindu tradition as the "Queen of Herbs", is one of Ayurveda\'s most prized plants. Our Rama Tulsi variety is grown in Madhya Pradesh and shade-dried to preserve its essential oils and adaptogenic compounds.',
      image: 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=400&q=80',
      rating: 4.6, reviews: 124, featured: false, active: true,
      vendorId: 'usr_vendor_001', tags: ['tulsi', 'basil', 'herb', 'adaptogen', 'ayurveda'],
      createdAt: '2024-03-15T00:00:00.000Z'
    },
    // ── OILS ────────────────────────────────────────────────
    {
      id: 'prd_012', name: 'Organic Virgin Coconut Oil', category: 'Oils',
      price: 22.99, salePrice: 19.99, unit: 'per liter', moq: 1, stock: 220,
      origin: 'Sri Lanka', certifications: ['USDA Organic', 'Non-GMO', 'Fair Trade'],
      description: 'Cold-pressed from fresh coconut flesh within 4 hours of harvest. Pure white, tropical aroma, rich in lauric acid. Multi-purpose — cooking, skincare, haircare.',
      longDescription: 'Extracted using a traditional cold-press method within 4 hours of coconut harvest, our virgin coconut oil retains all its natural goodness. Rich in medium-chain triglycerides (MCTs) and lauric acid. Suitable for high-heat cooking, raw consumption, and topical use.',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
      rating: 4.9, reviews: 445, featured: true, active: true,
      vendorId: 'usr_vendor_001', tags: ['coconut oil', 'oil', 'MCT', 'cooking', 'beauty'],
      createdAt: '2024-03-20T00:00:00.000Z'
    },
    {
      id: 'prd_013', name: 'Organic Cold-Pressed Sesame Oil', category: 'Oils',
      price: 16.99, salePrice: null, unit: 'per liter', moq: 1, stock: 160,
      origin: 'Ethiopia', certifications: ['USDA Organic'],
      description: 'Rich, nutty sesame oil cold-pressed from Ethiopian sesame seeds. High smoke point, rich in antioxidants. Traditional in Asian and Middle Eastern cooking.',
      longDescription: 'Ethiopian white sesame seeds are prized worldwide for their exceptional oil content and flavor. Our cold-pressed method extracts the oil without heat, preserving the rich, roasted nutty flavor and beneficial compounds like sesamol and sesamin.',
      image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&q=80',
      rating: 4.6, reviews: 112, featured: false, active: true,
      vendorId: 'usr_vendor_001', tags: ['sesame', 'oil', 'cooking oil', 'asian'],
      createdAt: '2024-04-01T00:00:00.000Z'
    },
    {
      id: 'prd_014', name: 'Organic Cold-Pressed Mustard Oil', category: 'Oils',
      price: 13.99, salePrice: null, unit: 'per liter', moq: 1, stock: 280,
      origin: 'India', certifications: ['USDA Organic'],
      description: 'Traditional kachi ghani mustard oil with pungent aroma and rich flavor. High in omega-3 fatty acids. Widely used in Indian and Bengali cuisines.',
      longDescription: 'Produced using the traditional kachi ghani (cold press) method, this mustard oil retains its characteristic pungency and nutritional profile. Rich in erucic acid, omega-3, and omega-6 fatty acids. Excellent for cooking, pickling, and massage.',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&q=80',
      rating: 4.4, reviews: 87, featured: false, active: true,
      vendorId: 'usr_vendor_001', tags: ['mustard', 'oil', 'kachi ghani', 'indian cooking'],
      createdAt: '2024-04-05T00:00:00.000Z'
    },
    // ── DRIED FRUITS ────────────────────────────────────────
    {
      id: 'prd_015', name: 'Organic Medjool Dates', category: 'Dried Fruits',
      price: 28.99, salePrice: null, unit: 'per kg', moq: 1, stock: 180,
      origin: 'Jordan', certifications: ['USDA Organic', 'Non-GMO'],
      description: 'The "King of Dates" — jumbo, plump Medjool dates with caramel-like sweetness and fudgy texture. Nature\'s perfect sweetener and energy booster.',
      longDescription: 'Grown in the fertile Jordan Valley with pristine water and rich mineral soil, our Medjool dates are hand-harvested at peak ripeness. Each date is jumbo-sized, naturally sun-dried, and packed without any additives. Rich in potassium, magnesium, and natural fiber.',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80',
      rating: 4.9, reviews: 287, featured: true, active: true,
      vendorId: 'usr_vendor_001', tags: ['dates', 'medjool', 'dried fruit', 'sweet', 'energy'],
      createdAt: '2024-04-10T00:00:00.000Z'
    },
    {
      id: 'prd_016', name: 'Organic Golden Raisins', category: 'Dried Fruits',
      price: 11.99, salePrice: 9.99, unit: 'per kg', moq: 1, stock: 320,
      origin: 'Turkey', certifications: ['USDA Organic', 'Non-GMO'],
      description: 'Plump, golden sultana raisins sun-dried in Turkish vineyards. Naturally sweet, additive-free. Perfect for baking, trail mixes, and snacking.',
      longDescription: 'From Turkey\'s Aegean region — the world\'s premier raisin-producing area — these golden raisins are made from seedless Thompson grapes. Sun-dried on traditional paper trays for 10-14 days without sulfur dioxide. Plump, moist, and naturally sweet.',
      image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&q=80',
      rating: 4.5, reviews: 134, featured: false, active: true,
      vendorId: 'usr_vendor_001', tags: ['raisins', 'sultana', 'dried fruit', 'baking'],
      createdAt: '2024-04-15T00:00:00.000Z'
    },
    {
      id: 'prd_017', name: 'Organic Dried Apricots', category: 'Dried Fruits',
      price: 16.99, salePrice: null, unit: 'per kg', moq: 1, stock: 240,
      origin: 'Turkey', certifications: ['USDA Organic', 'Non-GMO'],
      description: 'Unsulfured Hunza-variety dried apricots with intense flavor. Dark, chewy, and nutrient-packed — high in beta-carotene, iron, and potassium.',
      longDescription: 'Our unsulfured dried apricots come from Turkey\'s Malatya region, known for producing the world\'s finest apricots. Sun-dried without sulfur dioxide (SO2), they develop a naturally darker color and intensely concentrated flavor. Rich in vitamin A, potassium, and iron.',
      image: 'https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=400&q=80',
      rating: 4.6, reviews: 112, featured: false, active: true,
      vendorId: 'usr_vendor_001', tags: ['apricot', 'dried fruit', 'unsulfured', 'healthy snack'],
      createdAt: '2024-04-20T00:00:00.000Z'
    },
    // ── TEAS ────────────────────────────────────────────────
    {
      id: 'prd_018', name: 'Organic Darjeeling First Flush Tea', category: 'Teas',
      price: 32.99, salePrice: null, unit: 'per 250g', moq: 1, stock: 100,
      origin: 'India', certifications: ['USDA Organic', 'Fair Trade'],
      description: 'The "Champagne of Teas" — delicate first flush Darjeeling with muscatel notes, light amber brew, and exquisite floral aroma. Limited seasonal harvest.',
      longDescription: 'First flush Darjeeling tea is harvested in March-April from the highest garden elevations (2,000m+) in Darjeeling, West Bengal. Known as the "Champagne of Teas", it offers a delicate, muscatel character that is uniquely Darjeeling. Whole leaf, hand-rolled orthodox processing.',
      image: 'https://images.unsplash.com/photo-1563822249366-3efb23b8ae99?w=400&q=80',
      rating: 4.9, reviews: 198, featured: true, active: true,
      vendorId: 'usr_vendor_001', tags: ['darjeeling', 'tea', 'first flush', 'black tea', 'premium'],
      createdAt: '2024-05-01T00:00:00.000Z'
    },
    {
      id: 'prd_019', name: 'Organic Gyokuro Green Tea', category: 'Teas',
      price: 28.99, salePrice: null, unit: 'per 250g', moq: 1, stock: 80,
      origin: 'Japan', certifications: ['USDA Organic'],
      description: 'Shade-grown Japanese green tea with rich umami depth, emerald liquor, and sweet finish. The most prized Japanese green tea variety.',
      longDescription: 'Gyokuro is Japan\'s finest green tea, shade-grown for 20 days before harvest to boost chlorophyll, L-theanine, and amino acid content. This produces a distinctive sweet, umami-rich flavor unlike any other green tea. Hand-picked, needle-shaped leaves.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      rating: 4.8, reviews: 143, featured: false, active: true,
      vendorId: 'usr_vendor_001', tags: ['gyokuro', 'green tea', 'japanese tea', 'umami', 'matcha'],
      createdAt: '2024-05-10T00:00:00.000Z'
    },
    {
      id: 'prd_020', name: 'Organic Egyptian Chamomile', category: 'Teas',
      price: 14.99, salePrice: 12.99, unit: 'per 100g', moq: 1, stock: 300,
      origin: 'Egypt', certifications: ['USDA Organic', 'Non-GMO'],
      description: 'Whole flower chamomile from Egypt\'s Nile Delta. Larger, more potent blooms than German variety. Relaxing, honey-sweet aroma. Perfect bedtime tea.',
      longDescription: 'Egyptian chamomile (Anthemis nobilis) grows in the fertile Nile Delta where ideal conditions produce large, potent blooms with exceptional essential oil content. Significantly more aromatic than German varieties. Hand-harvested whole flowers, air-dried gently to preserve apigenin content.',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80',
      rating: 4.7, reviews: 231, featured: false, active: true,
      vendorId: 'usr_vendor_001', tags: ['chamomile', 'herbal tea', 'relaxing', 'sleep', 'floral'],
      createdAt: '2024-05-15T00:00:00.000Z'
    },
    {
      id: 'prd_021', name: 'Organic Cinnamon Sticks (Ceylon)', category: 'Spices',
      price: 22.99, salePrice: null, unit: 'per kg', moq: 0.5, stock: 160,
      origin: 'Sri Lanka', certifications: ['USDA Organic', 'Fair Trade'],
      description: 'True Ceylon "soft stick" cinnamon — delicate, sweet, complex flavor profile. Low in coumarin, safer for daily use. Ideal for sweet and savory recipes.',
      longDescription: 'Ceylon cinnamon (Cinnamomum verum), grown only in Sri Lanka, is the world\'s rarest and finest cinnamon. Unlike Cassia, Ceylon sticks are thin, soft, and multi-layered with a complex, sweet-spicy flavor and minimal coumarin content, making it safe for daily consumption.',
      image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&q=80',
      rating: 4.8, reviews: 176, featured: false, active: true,
      vendorId: 'usr_vendor_001', tags: ['cinnamon', 'ceylon', 'spice', 'stick', 'sweet'],
      createdAt: '2024-05-20T00:00:00.000Z'
    },
    {
      id: 'prd_022', name: 'Organic Chia Seeds', category: 'Grains',
      price: 11.99, salePrice: null, unit: 'per kg', moq: 1, stock: 400,
      origin: 'Mexico', certifications: ['USDA Organic', 'Non-GMO', 'Fair Trade'],
      description: 'Premium black chia seeds — loaded with omega-3 fatty acids, fiber, calcium, and antioxidants. The ultimate superfood grain for smoothies, puddings, and baking.',
      longDescription: 'Ancient Mayan superfood, chia seeds are one of the most nutrient-dense foods on earth. Rich in ALA omega-3 fatty acids, soluble fiber, and calcium. They absorb up to 12x their weight in water, making them excellent for hydration and satiety. Mild, nutty flavor.',
      image: 'https://images.unsplash.com/photo-1515867144078-f9e5040d2b3f?w=400&q=80',
      rating: 4.7, reviews: 289, featured: false, active: true,
      vendorId: 'usr_vendor_001', tags: ['chia', 'seeds', 'omega-3', 'superfood', 'fiber'],
      createdAt: '2024-05-25T00:00:00.000Z'
    }
  ];

  const SEED_ORDERS = [
    {
      id: 'ord_001', userId: 'usr_customer_001',
      items: [
        { productId: 'prd_001', name: 'Organic Turmeric Powder', price: 12.99, qty: 2, image: 'https://images.unsplash.com/photo-1615485500704-8e3b5858f00e?w=400&q=80' },
        { productId: 'prd_012', name: 'Organic Virgin Coconut Oil', price: 19.99, qty: 1, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80' }
      ],
      subtotal: 45.97, shipping: 5.99, tax: 4.14, total: 56.10,
      status: 'delivered', paymentMethod: 'Credit Card',
      shippingAddress: { street: '123 Green Ave', city: 'New York', state: 'NY', zip: '10001', country: 'USA' },
      createdAt: '2024-05-01T10:30:00.000Z', updatedAt: '2024-05-05T14:20:00.000Z',
      timeline: [
        { status: 'placed', date: '2024-05-01T10:30:00.000Z' },
        { status: 'processing', date: '2024-05-01T12:00:00.000Z' },
        { status: 'shipped', date: '2024-05-03T09:00:00.000Z' },
        { status: 'delivered', date: '2024-05-05T14:20:00.000Z' }
      ]
    },
    {
      id: 'ord_002', userId: 'usr_customer_001',
      items: [
        { productId: 'prd_018', name: 'Organic Darjeeling First Flush Tea', price: 32.99, qty: 1, image: 'https://images.unsplash.com/photo-1563822249366-3efb23b8ae99?w=400&q=80' },
        { productId: 'prd_009', name: 'Organic Ashwagandha Root Powder', price: 21.99, qty: 1, image: 'https://images.unsplash.com/photo-1564767655658-4e13b3d8e02a?w=400&q=80' }
      ],
      subtotal: 54.98, shipping: 5.99, tax: 4.95, total: 65.92,
      status: 'shipped', paymentMethod: 'PayPal',
      shippingAddress: { street: '123 Green Ave', city: 'New York', state: 'NY', zip: '10001', country: 'USA' },
      createdAt: '2024-05-28T15:45:00.000Z', updatedAt: '2024-05-30T09:00:00.000Z',
      timeline: [
        { status: 'placed', date: '2024-05-28T15:45:00.000Z' },
        { status: 'processing', date: '2024-05-28T17:00:00.000Z' },
        { status: 'shipped', date: '2024-05-30T09:00:00.000Z' }
      ]
    }
  ];

  // ─── Initialize ──────────────────────────────────────────
  const init = () => {
    if (!get(KEYS.INITIALIZED)) {
      set(KEYS.USERS, SEED_USERS);
      set(KEYS.PRODUCTS, SEED_PRODUCTS);
      set(KEYS.ORDERS, SEED_ORDERS);
      set(KEYS.CART, []);
      set(KEYS.WISHLIST, []);
      set(KEYS.INITIALIZED, true);
      console.log('OrganicTrade store initialized with seed data');
    }
  };

  // ─── Auth ────────────────────────────────────────────────
  const getCurrentUser = () => {
    const session = sessionStorage.getItem(KEYS.SESSION);
    return session ? JSON.parse(session) : null;
  };

  const setCurrentUser = (user) => {
    sessionStorage.setItem(KEYS.SESSION, JSON.stringify(user));
  };

  const logout = () => {
    sessionStorage.removeItem(KEYS.SESSION);
  };

  const login = (email, password) => {
    const users = get(KEYS.USERS) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user && user.status === 'active') {
      setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, error: 'Invalid credentials or account inactive' };
  };

  const register = (data) => {
    const users = get(KEYS.USERS) || [];
    if (users.find(u => u.email === data.email)) {
      return { success: false, error: 'Email already registered' };
    }
    const newUser = {
      id: uid(), name: data.name, email: data.email, password: data.password,
      role: data.role || 'customer', avatar: data.name.charAt(0).toUpperCase(),
      createdAt: now(), status: 'active',
      ...(data.role === 'vendor' ? { company: data.company || '', approved: false } : {})
    };
    users.push(newUser);
    set(KEYS.USERS, users);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  // ─── Users CRUD ──────────────────────────────────────────
  const getUsers = () => get(KEYS.USERS) || [];
  const getUserById = (id) => getUsers().find(u => u.id === id);
  const updateUser = (id, data) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx > -1) { users[idx] = { ...users[idx], ...data }; set(KEYS.USERS, users); return users[idx]; }
    return null;
  };
  const deleteUser = (id) => {
    const users = getUsers().filter(u => u.id !== id);
    set(KEYS.USERS, users);
  };

  // ─── Products CRUD ───────────────────────────────────────
  const getProducts = (filters = {}) => {
    let products = get(KEYS.PRODUCTS) || [];
    if (filters.active !== undefined) products = products.filter(p => p.active === filters.active);
    if (filters.category) products = products.filter(p => p.category === filters.category);
    if (filters.vendorId) products = products.filter(p => p.vendorId === filters.vendorId);
    if (filters.featured) products = products.filter(p => p.featured);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }
    return products;
  };

  const getProductById = (id) => (get(KEYS.PRODUCTS) || []).find(p => p.id === id);

  const addProduct = (data) => {
    const products = get(KEYS.PRODUCTS) || [];
    const product = {
      id: uid(), ...data,
      rating: 0, reviews: 0, active: true, featured: false,
      createdAt: now()
    };
    products.push(product);
    set(KEYS.PRODUCTS, products);
    return product;
  };

  const updateProduct = (id, data) => {
    const products = get(KEYS.PRODUCTS) || [];
    const idx = products.findIndex(p => p.id === id);
    if (idx > -1) { products[idx] = { ...products[idx], ...data }; set(KEYS.PRODUCTS, products); return products[idx]; }
    return null;
  };

  const deleteProduct = (id) => {
    set(KEYS.PRODUCTS, (get(KEYS.PRODUCTS) || []).filter(p => p.id !== id));
  };

  // ─── Cart ────────────────────────────────────────────────
  const getCart = () => get(KEYS.CART) || [];

  const addToCart = (productId, qty = 1) => {
    const cart = getCart();
    const existing = cart.find(i => i.productId === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ productId, qty });
    }
    set(KEYS.CART, cart);
    return cart;
  };

  const updateCartQty = (productId, qty) => {
    const cart = getCart();
    const item = cart.find(i => i.productId === productId);
    if (item) { item.qty = qty; if (item.qty <= 0) return removeFromCart(productId); }
    set(KEYS.CART, cart);
    return cart;
  };

  const removeFromCart = (productId) => {
    set(KEYS.CART, getCart().filter(i => i.productId !== productId));
    return getCart();
  };

  const clearCart = () => set(KEYS.CART, []);

  const getCartTotal = () => {
    const cart = getCart();
    return cart.reduce((total, item) => {
      const product = getProductById(item.productId);
      const price = product ? (product.salePrice || product.price) : 0;
      return total + price * item.qty;
    }, 0);
  };

  const getCartCount = () => getCart().reduce((n, i) => n + i.qty, 0);

  // ─── Wishlist ────────────────────────────────────────────
  const getWishlist = () => get(KEYS.WISHLIST) || [];
  const toggleWishlist = (productId) => {
    const list = getWishlist();
    const idx = list.indexOf(productId);
    if (idx > -1) list.splice(idx, 1); else list.push(productId);
    set(KEYS.WISHLIST, list);
    return list;
  };
  const isWishlisted = (productId) => getWishlist().includes(productId);

  // ─── Orders CRUD ─────────────────────────────────────────
  const getOrders = (filters = {}) => {
    let orders = get(KEYS.ORDERS) || [];
    if (filters.userId) orders = orders.filter(o => o.userId === filters.userId);
    if (filters.status) orders = orders.filter(o => o.status === filters.status);
    return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const getOrderById = (id) => (get(KEYS.ORDERS) || []).find(o => o.id === id);

  const addOrder = (data) => {
    const orders = get(KEYS.ORDERS) || [];
    const order = {
      id: 'ord_' + Date.now(), ...data,
      status: 'processing', createdAt: now(), updatedAt: now(),
      timeline: [
        { status: 'placed', date: now() },
        { status: 'processing', date: now() }
      ]
    };
    orders.push(order);
    set(KEYS.ORDERS, orders);
    clearCart();
    return order;
  };

  const updateOrder = (id, status) => {
    const orders = get(KEYS.ORDERS) || [];
    const idx = orders.findIndex(o => o.id === id);
    if (idx > -1) {
      orders[idx].status = status;
      orders[idx].updatedAt = now();
      if (!orders[idx].timeline.find(t => t.status === status)) {
        orders[idx].timeline.push({ status, date: now() });
      }
      set(KEYS.ORDERS, orders);
      return orders[idx];
    }
    return null;
  };

  // ─── Stats ───────────────────────────────────────────────
  const getStats = () => {
    const orders = get(KEYS.ORDERS) || [];
    const users = getUsers();
    const products = get(KEYS.PRODUCTS) || [];
    const revenue = orders.reduce((t, o) => t + (o.total || 0), 0);
    return {
      totalRevenue: revenue,
      totalOrders: orders.length,
      totalUsers: users.filter(u => u.role === 'customer').length,
      totalVendors: users.filter(u => u.role === 'vendor').length,
      totalProducts: products.length,
      activeProducts: products.filter(p => p.active).length,
      pendingOrders: orders.filter(o => o.status === 'processing').length,
      deliveredOrders: orders.filter(o => o.status === 'delivered').length
    };
  };

  // ─── Helpers ─────────────────────────────────────────────
  const formatPrice = (n) => '$' + (n || 0).toFixed(2);
  const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  // ─── Route Guard ─────────────────────────────────────────
  const requireAuth = (allowedRoles, redirectTo = '../auth.html') => {
    const user = getCurrentUser();
    if (!user) { window.location.href = redirectTo; return null; }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      window.location.href = redirectTo;
      return null;
    }
    return user;
  };

  // Public API
  return {
    init, get, set,
    getCurrentUser, setCurrentUser, logout, login, register,
    getUsers, getUserById, updateUser, deleteUser,
    getProducts, getProductById, addProduct, updateProduct, deleteProduct,
    getCart, addToCart, updateCartQty, removeFromCart, clearCart, getCartTotal, getCartCount,
    getWishlist, toggleWishlist, isWishlisted,
    getOrders, getOrderById, addOrder, updateOrder,
    getStats, formatPrice, formatDate, requireAuth,
    CATEGORIES: ['Spices', 'Grains', 'Herbs', 'Oils', 'Dried Fruits', 'Teas'],
    ORIGINS: ['India', 'Sri Lanka', 'Guatemala', 'Vietnam', 'Peru', 'Thailand', 'Turkey', 'Jordan', 'Ethiopia', 'Japan', 'Egypt', 'Mexico', 'USA']
  };
})();

// Auto-initialize on load
document.addEventListener('DOMContentLoaded', () => Store.init());
