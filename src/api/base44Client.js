const fallbackEntities = new Proxy({}, {
  get: () => ({
    list: async () => [],
    filter: async () => [],
    get: async () => null,
    create: async (data) => ({ id: `mock-${Date.now()}`, ...data }),
    update: async (id, data) => ({ id, ...data }),
    delete: async () => ({ success: true })
  })
});

const defaultDb = {
  app: {
    getPublicSettings: async () => ({ id: 'sun-city-restaurant', public_settings: {} })
  },
  auth: {
    isAuthenticated: async () => false,
    me: async () => null,
    loginViaEmailPassword: async () => ({ access_token: 'mock-token', user: { email: 'guest@suncity.com' } }),
    loginWithProvider: () => {},
    register: async () => ({ success: true }),
    verifyOtp: async () => ({ access_token: 'mock-token' }),
    resendOtp: async () => ({ success: true }),
    setToken: () => {},
    resetPasswordRequest: async () => ({ success: true }),
    resetPassword: async () => ({ success: true }),
    logout: async () => {},
    redirectToLogin: () => {}
  },
  entities: fallbackEntities,
  integrations: {
    Core: {
      UploadFile: async () => ({ file_url: '' }),
      UploadPublicFile: async () => ({ file_url: '' })
    }
  }
};

export const db = new Proxy({}, {
  get: (_target, prop) => {
    if (globalThis.__B44_DB__ && prop in globalThis.__B44_DB__) {
      return globalThis.__B44_DB__[prop];
    }
    return defaultDb[prop] || undefined;
  }
});

export const base44 = db;
export default db;