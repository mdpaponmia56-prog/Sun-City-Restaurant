(function() {
  const INITIAL_DISHES = [
    {
      id: 'dish-1',
      name: 'Special Mutton Kacchi Biryani',
      name_bn: 'স্পেশাল মাটন কাচ্চি বিরিয়ানি',
      category: 'Biryani & Rice',
      price: 495,
      description: 'Slow-cooked fragrant chinigura rice with tender marinated mutton cuts, potatoes, and royal Mughlai spices.',
      description_bn: 'সুগন্ধি চিনিগুঁড়া চাল, নরম খাসির মাংস, আলু ও শাহী মসলায় তৈরি ঐতিহ্যবাহী কাচ্চি বিরিয়ানি।',
      image_url: '/dishes/kacchi-biryani.jpg',
      gallery: ['/dishes/kacchi-biryani.jpg', '/hero-bg.png'],
      is_signature: true,
      is_popular: true,
      is_chef_recommendation: true,
      spice_level: 'Medium',
      prep_time: 25,
      sort_order: 1,
    },
    {
      id: 'dish-2',
      name: 'Traditional Chittagong Beef Kala Bhuna',
      name_bn: 'ঐতিহ্যবাহী মেজবানি গরুর কালা ভুনা',
      category: 'Curries',
      price: 540,
      description: 'Iconic Chattogram-style deep dark slow-roasted beef infused with mustard oil, fried onions, and roasted spices.',
      description_bn: 'সরিষার তেল ও বিশেষ মসলায় কষিয়ে তৈরি বিখ্যাত খাঁটি চট্টগ্রামের কালা ভুনা।',
      image_url: '/dishes/kala-bhuna.jpg',
      gallery: ['/dishes/kala-bhuna.jpg'],
      is_signature: true,
      is_popular: true,
      is_chef_recommendation: true,
      spice_level: 'Hot',
      prep_time: 20,
      sort_order: 2,
    },
    {
      id: 'dish-3',
      name: 'Golden Sizzling Thai Jumbo Prawns',
      name_bn: 'গোল্ডেন সিজলিং থাই জাম্বো প্রন',
      category: 'Seafood',
      price: 680,
      description: 'Fresh Bay of Bengal king prawns tossed in sweet-savory lemongrass chili glaze served on a sizzling hot plate.',
      description_bn: 'লেমনগ্রাস ও তাজা মরিচের স্পেশাল থাই সসে রান্না করা সিজলিং জাম্বো প্রন।',
      image_url: '/dishes/thai-prawns.jpg',
      gallery: ['/dishes/thai-prawns.jpg'],
      is_signature: true,
      is_popular: true,
      is_chef_recommendation: false,
      spice_level: 'Medium',
      prep_time: 15,
      sort_order: 3,
    },
    {
      id: 'dish-4',
      name: 'Shahi Mutton Rezala',
      name_bn: 'শাহী মাটন রেজালা',
      category: 'Curries',
      price: 490,
      description: 'Rich and velvety Mughlai mutton curry prepared with cashew paste, mawa, yogurt, and aromatic saffron.',
      description_bn: 'কাজুবাদাম, মাওয়া ও জাফরান মিশ্রিত রাজকীয় স্বাদের শাহী মাটন রেজালা।',
      image_url: '/dishes/mutton-rezala.jpg',
      gallery: ['/dishes/mutton-rezala.jpg'],
      is_signature: true,
      is_popular: true,
      is_chef_recommendation: true,
      spice_level: 'Mild',
      prep_time: 20,
      sort_order: 4,
    },
    {
      id: 'dish-5',
      name: 'Reshmi Chicken Kebab Platter',
      name_bn: 'রেশমি চিকেন কাবাব প্ল্যাটার',
      category: 'Kebabs & Grills',
      price: 420,
      description: 'Tender boneless chicken morsels marinated in spiced yogurt and cream, char-grilled in our clay tandoor.',
      description_bn: 'ক্রিম ও হালকা মসলায় নরম করে কয়লার তন্দুরে সেঁকা তুলতুলে রেশমি কাবাব।',
      image_url: '/dishes/reshmi-kebab.jpg',
      gallery: ['/dishes/reshmi-kebab.jpg'],
      is_signature: true,
      is_popular: true,
      is_chef_recommendation: false,
      spice_level: 'Mild',
      prep_time: 20,
      sort_order: 5,
    },
    {
      id: 'dish-6',
      name: 'Thai Tom Yum Seafood Soup',
      name_bn: 'টম ইয়াম সীফুড স্যুপ',
      category: 'Thai & Chinese',
      price: 360,
      description: 'Zesty Thai broth with lime leaves, galangal, fresh seafood medley, and birds eye chili.',
      description_bn: 'লেমনগ্রাস, মাশরুম ও সীফুড সমন্বয়ে তৈরি সুস্বাদু টক-ঝাল থাই স্যুপ।',
      image_url: '/dishes/tom-yum.jpg',
      gallery: ['/dishes/tom-yum.jpg'],
      is_signature: true,
      is_popular: false,
      is_chef_recommendation: true,
      spice_level: 'Hot',
      prep_time: 15,
      sort_order: 6,
    },
    {
      id: 'dish-7',
      name: 'Crispy Fried Calamari with Garlic Aioli',
      name_bn: 'ক্রিস্পি ফ্রাইড কালামারি',
      category: 'Appetizers',
      price: 390,
      description: 'Golden seasoned squid rings served with house lemon-garlic dipping sauce.',
      description_bn: 'মুচমুচে ফ্রাইড স্কুইড রিং সাথে স্পেশাল গার্লিক মেয়োনিজ।',
      image_url: '/dishes/calamari.jpg',
      gallery: ['/dishes/calamari.jpg'],
      is_signature: false,
      is_popular: true,
      is_chef_recommendation: false,
      spice_level: 'Mild',
      prep_time: 15,
      sort_order: 7,
    },
    {
      id: 'dish-8',
      name: 'Matka Shahi Firni with Pistachio',
      name_bn: 'মাটকা শাহী ফিরনি',
      category: 'Desserts',
      price: 180,
      description: 'Traditional earthen pot rice pudding scented with kewra water and toasted nuts.',
      description_bn: 'মাটির পাত্রে পরিবেশিত কেওড়া জল ও পেস্তাবাদাম কুচি ছড়ানো শাহী ফিরনি।',
      image_url: '/dishes/firni.jpg',
      gallery: ['/dishes/firni.jpg'],
      is_signature: false,
      is_popular: true,
      is_chef_recommendation: true,
      spice_level: 'Mild',
      prep_time: 10,
      sort_order: 8,
    },
    {
      id: 'dish-9',
      name: 'Special Royal Borhani',
      name_bn: 'স্পেশাল শাহী বোরহানি',
      category: 'Beverages',
      price: 120,
      description: 'Traditional spiced yogurt digestive drink infused with mint, coriander, mustard, and black salt.',
      description_bn: 'পুদিনা, ধনিয়া ও সুগন্ধি মসলায় তৈরি মুখরোচক খাঁটি বোরহানি।',
      image_url: '/dishes/borhani.jpg',
      gallery: ['/dishes/borhani.jpg'],
      is_signature: false,
      is_popular: true,
      is_chef_recommendation: false,
      spice_level: 'Mild',
      prep_time: 5,
      sort_order: 9,
    },
    {
      id: 'dish-10',
      name: 'Tandoori Garlic Butter Naan Basket',
      name_bn: 'তন্দুরি গার্লিক বাটার নান',
      category: 'Breads',
      price: 90,
      description: 'Fresh clay oven flatbread blistered golden brown, brushed with pure butter, minced garlic, and fresh coriander.',
      description_bn: 'তন্দুরে তাজা সেঁকা বাটার ও রসুন মিশ্রিত তুলতুলে নান রুটি।',
      image_url: '/dishes/garlic-naan.jpg',
      gallery: ['/dishes/garlic-naan.jpg'],
      is_signature: false,
      is_popular: true,
      is_chef_recommendation: false,
      spice_level: 'Mild',
      prep_time: 10,
      sort_order: 10,
    },
    {
      id: 'dish-11',
      name: 'Thai Special Mixed Fried Rice',
      name_bn: 'থাই স্পেশাল মিক্সড ফ্রাইড রাইস',
      category: 'Thai & Chinese',
      price: 380,
      description: 'Jasmine rice stir-fried with king prawns, seasoned chicken, farm eggs, spring onions, and authentic Thai herbs.',
      description_bn: 'প্রন, চিকেন ও তাজা সবজির সমন্বয়ে প্রস্তুত লোভনীয় থাই ফ্রাইড রাইস।',
      image_url: '/dishes/thai-fried-rice.jpg',
      gallery: ['/dishes/thai-fried-rice.jpg'],
      is_signature: false,
      is_popular: true,
      is_chef_recommendation: true,
      spice_level: 'Medium',
      prep_time: 15,
      sort_order: 11,
    }
  ];

  const INITIAL_PARTY_MENUS = [
    {
      id: 'party-1',
      title: 'PARTY MENU-1',
      title_bn: 'পার্টি মেনু-১',
      price_per_person: 650,
      min_guests: 20,
      sort_order: 1,
      description: 'Classic Bengali feast with traditional Mughlai favorites.',
      items: [
        'Plain Pullao',
        'Chicken Roast 1/4',
        'Mutton Rezala',
        'Beef Kalo Bhuna',
        'Mixed Vegetable (C)',
        'Green Salad'
      ],
      more_count: 3
    },
    {
      id: 'party-2',
      title: 'PARTY MENU-2',
      title_bn: 'পার্টি মেনু-২',
      price_per_person: 750,
      min_guests: 20,
      sort_order: 2,
      description: 'Adds Rupchanda fish to the classic spread.',
      items: [
        'Plain Pullao',
        'Chicken Roast 1/4',
        'Rupchanda 1PCS',
        'Mutton Rezala',
        'Beef Kalo Bhuna',
        'Mixed Vegetable (C)'
      ],
      more_count: 4
    },
    {
      id: 'party-3',
      title: 'PARTY MENU-3',
      title_bn: 'পার্টি মেনু-৩',
      price_per_person: 850,
      min_guests: 20,
      sort_order: 3,
      description: 'Rich korma and shami kabab for the discerning palate.',
      items: [
        'Plain Pullao',
        'Chicken Roast 1/4',
        'Mutton Korma',
        'Beef Rezala / Bhuna / Kalo Bhuna',
        'Chicken Shami Kabab',
        'Mixed Vegetable (C)'
      ],
      more_count: 4
    },
    {
      id: 'party-4',
      title: 'PARTY MENU-4',
      title_bn: 'পার্টি মেনু-৪',
      price_per_person: 950,
      min_guests: 20,
      sort_order: 4,
      description: 'The legendary Kacchi Biriyani centerpiece.',
      items: [
        'Kacchi Biriyani',
        'Chicken Roast 1/4',
        'Beef Bhuna',
        'Achar',
        'Green Salad',
        'Firni / Pudding'
      ],
      more_count: 2
    },
    {
      id: 'party-5',
      title: 'PARTY MENU-5',
      title_bn: 'পার্টি মেনু-৫',
      price_per_person: 1150,
      min_guests: 20,
      sort_order: 5,
      description: 'Premium package with tandoori prawn or rupchanda fry.',
      items: [
        'Kacchi Biriyani',
        'Chicken Roast',
        'Beef Bhuna',
        'Tandoori King Prawn / Rupchanda Fry',
        'Achar',
        'Green Salad'
      ],
      more_count: 3
    },
    {
      id: 'party-6',
      title: 'PARTY MENU-6',
      title_bn: 'পার্টি মেনু-৬',
      price_per_person: 1050,
      min_guests: 20,
      sort_order: 6,
      description: 'Thai & Chinese fusion feast for adventurous tastes.',
      items: [
        'Wonthon / Spring Roll',
        'Chicken Prawn',
        'Cashew nut Salad',
        'Thai Soup',
        'Chicken Fried Rice',
        'Fried Chicken'
      ],
      more_count: 5
    },
    {
      id: 'party-7',
      title: 'PARTY MENU-7',
      title_bn: 'পার্টি মেনু-৭',
      price_per_person: 1250,
      min_guests: 20,
      sort_order: 7,
      description: 'The ultimate Thai-inspired celebration package.',
      items: [
        'Fish Cake',
        'Thai Chicken Prawn Cashew Nut Salad / Waleska',
        'Tomyam Clear Soup',
        'Mixed Fried Rice',
        'Fried Chicken',
        'Prawn Sizzling / Prawn Chilli Garlic'
      ],
      more_count: 5
    }
  ];

  const INITIAL_REVIEWS = [
    {
      id: 'rev-1',
      author_name: 'Engr. Md. Saifullah',
      rating: 5,
      title: 'Best rooftop dining in Chattogram with panoramic sunset view',
      body: 'One of the best rooftop restaurants in Chittagong! Located on the 12th floor of Heaven City Centre, the panoramic skyline views during evening and sunset are breathtaking. We ordered the Special Mutton Kacchi Biryani and Beef Kala Bhuna — both were extraordinarily flavorful and tender. Highly recommended for family dinners.',
      content: 'One of the best rooftop restaurants in Chittagong! Located on the 12th floor of Heaven City Centre, the panoramic skyline views during evening and sunset are breathtaking. We ordered the Special Mutton Kacchi Biryani and Beef Kala Bhuna — both were extraordinarily flavorful and tender. Highly recommended for family dinners.',
      created_date: '2025-02-18',
      source: 'google',
      is_local_guide: true,
      guide_level: 'Level 6 · 45 reviews',
      dining_type: 'Dine in · Dinner',
      dish_name: 'Special Mutton Kacchi & Kala Bhuna',
      likes_count: 14,
      is_verified: true,
      is_approved: true,
    },
    {
      id: 'rev-2',
      author_name: 'Nusrat Jahan Chowdhury',
      rating: 5,
      title: 'Flawless party hall setup for 50+ guests',
      body: 'We arranged a family celebration in their banquet hall for 50 people. The stage decoration, balloon lighting, and staff hospitality were top notch. The Party Menu Package with Biryani, Roast, and Firni was delicious. Great venue with express lift and parking in Heaven City Centre.',
      content: 'We arranged a family celebration in their banquet hall for 50 people. The stage decoration, balloon lighting, and staff hospitality were top notch. The Party Menu Package with Biryani, Roast, and Firni was delicious. Great venue with express lift and parking in Heaven City Centre.',
      created_date: '2025-02-12',
      source: 'google',
      is_local_guide: true,
      guide_level: 'Level 5 · 28 reviews',
      dining_type: 'Event / Party · Banquet Hall',
      dish_name: 'Party Package 03 (Special Kacchi & Roast)',
      likes_count: 19,
      is_verified: true,
      is_approved: true,
    },
    {
      id: 'rev-3',
      author_name: 'Dr. Shahriar Kabir',
      rating: 5,
      title: 'Lavish interior, wooden ceilings, and authentic flavors',
      body: 'The ambiance is lavish with wooden lattice ceilings, warm hanging chandeliers, and comfortable seating. Their Thai soup and sizzling jumbo prawns are authentic and piping hot. Great multi-cuisine menu with reasonable pricing for such a premium 12th floor spot.',
      content: 'The ambiance is lavish with wooden lattice ceilings, warm hanging chandeliers, and comfortable seating. Their Thai soup and sizzling jumbo prawns are authentic and piping hot. Great multi-cuisine menu with reasonable pricing for such a premium 12th floor spot.',
      created_date: '2025-02-05',
      source: 'google',
      is_local_guide: true,
      guide_level: 'Level 7 · 62 reviews',
      dining_type: 'Dine in · Lunch',
      dish_name: 'Golden Sizzling Thai Jumbo Prawns',
      likes_count: 22,
      is_verified: true,
      is_approved: true,
    },
    {
      id: 'rev-4',
      author_name: 'Farzana Yasmin',
      rating: 5,
      title: 'Our favorite family destination in Pahartoli / Alankar area',
      body: 'Sun City Restaurant has become our go-to family dining place in the Alankar Mor area. The staff is very well-behaved and attentive. The neon Sun City logo wall makes a great photo backdrop. Don\'t miss their royal Borhani and Reshmi Kebab!',
      content: 'Sun City Restaurant has become our go-to family dining place in the Alankar Mor area. The staff is very well-behaved and attentive. The neon Sun City logo wall makes a great photo backdrop. Don\'t miss their royal Borhani and Reshmi Kebab!',
      created_date: '2025-01-29',
      source: 'google',
      is_local_guide: false,
      dining_type: 'Dine in · Family Dinner',
      dish_name: 'Reshmi Chicken Kebab Platter',
      likes_count: 8,
      is_verified: true,
      is_approved: true,
    },
    {
      id: 'rev-5',
      author_name: 'Rashidul Karim',
      rating: 5,
      title: 'Authentic Chittagong Kala Bhuna with hot butter naan',
      body: 'Spectacular 12th-floor open atmosphere, clean washrooms, speedy service, and tasty food. The Chittagong Kala Bhuna with hot garlic butter naan was pure perfection. A 10/10 experience in Chattogram.',
      content: 'Spectacular 12th-floor open atmosphere, clean washrooms, speedy service, and tasty food. The Chittagong Kala Bhuna with hot garlic butter naan was pure perfection. A 10/10 experience in Chattogram.',
      created_date: '2025-01-20',
      source: 'google',
      is_local_guide: true,
      guide_level: 'Level 6 · 38 reviews',
      dining_type: 'Dine in · Dinner',
      dish_name: 'Traditional Chittagong Beef Kala Bhuna',
      likes_count: 16,
      is_verified: true,
      is_approved: true,
    },
    {
      id: 'rev-6',
      author_name: 'Tahsin Mahmud',
      rating: 5,
      title: 'Corporate event was seamless and highly praised by team',
      body: 'Booked their Platinum party package for our company get-together. The management was extremely cooperative, sound system and hall setup were ready on time. All our colleagues loved the food and view.',
      content: 'Booked their Platinum party package for our company get-together. The management was extremely cooperative, sound system and hall setup were ready on time. All our colleagues loved the food and view.',
      created_date: '2025-01-14',
      source: 'google',
      is_local_guide: false,
      dining_type: 'Corporate Event · Banquet Hall',
      dish_name: 'Party Package 05 (Royal Buffet)',
      likes_count: 11,
      is_verified: true,
      is_approved: true,
    },
    {
      id: 'rev-7',
      author_name: 'Zubair Al Mamun',
      rating: 5,
      title: 'Feels like a 5-star hotel rooftop inside Heaven City Centre',
      body: 'Top quality food and luxury environment. It feels like a 5-star hotel rooftop inside Heaven City Centre. The night lights over the city make it the best romantic spot for couples and celebrations.',
      content: 'Top quality food and luxury environment. It feels like a 5-star hotel rooftop inside Heaven City Centre. The night lights over the city make it the best romantic spot for couples and celebrations.',
      created_date: '2024-12-28',
      source: 'google',
      is_local_guide: true,
      guide_level: 'Level 4 · 19 reviews',
      dining_type: 'Dine in · Dinner',
      dish_name: 'Shahi Mutton Rezala',
      likes_count: 7,
      is_verified: true,
      is_approved: true,
    },
    {
      id: 'rev-8',
      author_name: 'Afsana Mimi',
      rating: 5,
      title: 'Mouth-watering Kacchi biryani and lovely photo spot',
      body: 'Authentic Mughlai flavors! Kacchi biryani meat was melting in mouth and aroma was fantastic. The neon Sun City logo photo zone is really cute for pictures!',
      content: 'Authentic Mughlai flavors! Kacchi biryani meat was melting in mouth and aroma was fantastic. The neon Sun City logo photo zone is really cute for pictures!',
      created_date: '2024-12-15',
      source: 'google',
      is_local_guide: false,
      dining_type: 'Dine in · Weekend Lunch',
      dish_name: 'Special Mutton Kacchi Biryani',
      likes_count: 9,
      is_verified: true,
      is_approved: true,
    }
  ];

  const tables = {
    Dish: [...INITIAL_DISHES],
    PartyMenu: [...INITIAL_PARTY_MENUS],
    Review: [...INITIAL_REVIEWS],
    Reservation: [],
    User: []
  };

  const createEntityStore = (name) => ({
    list: async (sortField, limit) => {
      const items = tables[name] || [];
      return limit ? items.slice(0, limit) : items;
    },
    filter: async (criteria = {}, sortField, limit) => {
      let items = tables[name] || [];
      if (criteria && typeof criteria === 'object') {
        items = items.filter(item => {
          return Object.entries(criteria).every(([k, v]) => {
            if (v && typeof v === 'object' && '$gte' in v) {
              return item[k] >= v.$gte;
            }
            return item[k] === v;
          });
        });
      }
      return limit ? items.slice(0, limit) : items;
    },
    get: async (id) => {
      const items = tables[name] || [];
      return items.find(item => item.id === id) || null;
    },
    create: async (data) => {
      const newItem = { id: `${name.toLowerCase()}-${Date.now()}`, ...data };
      if (!tables[name]) tables[name] = [];
      tables[name].push(newItem);
      return newItem;
    },
    update: async (id, data) => {
      const items = tables[name] || [];
      const idx = items.findIndex(item => item.id === id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...data };
        return items[idx];
      }
      return null;
    },
    delete: async (id) => {
      if (tables[name]) {
        tables[name] = tables[name].filter(item => item.id !== id);
      }
      return { success: true };
    }
  });

  const entityProxy = new Proxy({}, {
    get: (target, entityName) => {
      if (!target[entityName]) {
        target[entityName] = createEntityStore(entityName);
      }
      return target[entityName];
    }
  });

  globalThis.__B44_DB__ = {
    app: {
      getPublicSettings: async () => ({
        id: 'sun-city-restaurant',
        public_settings: {}
      })
    },
    auth: {
      isAuthenticated: async () => {
        try {
          return Boolean(localStorage.getItem('suncity_auth_user'));
        } catch {
          return false;
        }
      },
      me: async () => {
        try {
          const u = localStorage.getItem('suncity_auth_user');
          return u ? JSON.parse(u) : null;
        } catch {
          return null;
        }
      },
      loginViaEmailPassword: async (email, password) => {
        if (!email || !password) throw new Error('Email and password are required');
        const user = {
          id: `usr-${Date.now()}`,
          email,
          name: email.split('@')[0],
          role: 'user'
        };
        try {
          localStorage.setItem('suncity_auth_user', JSON.stringify(user));
          localStorage.setItem('token', `mock-token-${Date.now()}`);
        } catch {}
        return { access_token: 'mock-token', user };
      },
      loginWithProvider: (provider, returnTo) => {
        const user = {
          id: `usr-google-${Date.now()}`,
          email: 'google.guest@example.com',
          name: 'Google Guest',
          role: 'user'
        };
        try {
          localStorage.setItem('suncity_auth_user', JSON.stringify(user));
          localStorage.setItem('token', `mock-token-${Date.now()}`);
        } catch {}
        window.location.href = returnTo || '/';
      },
      register: async ({ email, password }) => {
        if (!email || !password) throw new Error('Email and password are required');
        return { success: true };
      },
      verifyOtp: async ({ email, otpCode }) => {
        const user = {
          id: `usr-${Date.now()}`,
          email,
          name: email.split('@')[0],
          role: 'user'
        };
        try {
          localStorage.setItem('suncity_auth_user', JSON.stringify(user));
          localStorage.setItem('token', `mock-token-${Date.now()}`);
        } catch {}
        return { access_token: 'mock-token', user };
      },
      resendOtp: async () => ({ success: true }),
      setToken: (token) => {
        try {
          localStorage.setItem('token', token);
        } catch {}
      },
      resetPasswordRequest: async (email) => {
        if (!email) throw new Error('Email is required');
        return { success: true };
      },
      resetPassword: async ({ resetToken, newPassword }) => {
        if (!newPassword) throw new Error('Password is required');
        return { success: true };
      },
      logout: async (redirectUrl) => {
        try {
          localStorage.removeItem('suncity_auth_user');
          localStorage.removeItem('token');
        } catch {}
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      },
      redirectToLogin: (returnTo) => {
        window.location.href = '/login' + (returnTo ? '?returnTo=' + encodeURIComponent(returnTo) : '');
      }
    },
    entities: entityProxy,
    integrations: {
      Core: {
        UploadFile: async ({ file } = {}) => {
          if (file && typeof URL !== 'undefined' && URL.createObjectURL) {
            try {
              return { file_url: URL.createObjectURL(file) };
            } catch {}
          }
          return { file_url: 'https://media.db.com/images/public/6ab38855d4fc4d8e6a44e23b/72145bd6d_generated_6ce27a37.jpg' };
        },
        UploadPublicFile: async ({ file } = {}) => {
          if (file && typeof URL !== 'undefined' && URL.createObjectURL) {
            try {
              return { file_url: URL.createObjectURL(file) };
            } catch {}
          }
          return { file_url: 'https://media.db.com/images/public/6ab38855d4fc4d8e6a44e23b/72145bd6d_generated_6ce27a37.jpg' };
        }
      }
    }
  };
})();
