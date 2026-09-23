const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

export const RESTAURANT = {
  name: 'Sun City Restaurant',
  tagline: 'Savor the sun, taste the horizon',
  phone: '01714380876',
  phoneIntl: '8801714380876',
  email: 'suncityrestaurantctg@gmail.com',
  address: '12th Floor, Heaven City Centre, Chattogram',
  addressLine2: 'Located in: Heaven City Centre',
  hours: [
    { day: 'Wednesday', time: '10:30 AM – 11 PM' },
    { day: 'Thursday', time: '10:30 AM – 11 PM' },
    { day: 'Friday', time: '10:30 AM – 11 PM' },
    { day: 'Saturday', time: '10:30 AM – 11 PM' },
    { day: 'Sunday', time: '10:30 AM – 11 PM' },
    { day: 'Monday', time: 'Closed' },
    { day: 'Tuesday', time: '10:30 AM – 11 PM' },
  ],
  facebook: 'https://www.facebook.com/suncityrestaurantcom/',
  instagram: 'https://www.instagram.com/suncity_restaurant_ltd/',
  whatsapp: '8801714380876',
  mapsQuery: 'Sun City Restaurant, Heaven City Centre, Chattogram',
  googleMaps: 'https://www.google.com/maps/search/?api=1&query=Sun+City+Restaurant+Heaven+City+Centre+Chattogram',
  googleReviewUrl: 'https://www.google.com/maps/search/?api=1&query=Sun+City+Restaurant+Heaven+City+Centre+Chattogram',
  appleMaps: 'https://maps.apple.com/?q=Sun+City+Restaurant+Heaven+City+Centre+Chattogram',
  logo: '/logo-circle.png',
};

export const formatBDT = (n) => `৳${Math.round(n).toLocaleString('en-IN')}`;

export const whatsappLink = (message) =>
  `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(message)}`;