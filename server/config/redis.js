// Caching Provider with in-memory TTL and optional Redis support
class CacheProvider {
  constructor() {
    this.store = new Map();
    this.ttls = new Map();
    // Default TTLs in seconds
    this.TTL_SEARCH = 30 * 60; // 30 minutes
    this.TTL_DESTINATIONS = 60 * 60; // 1 hour
    this.TTL_RATES = 60 * 60; // 1 hour
    this.TTL_WEATHER = 3 * 60 * 60; // 3 hours

    // Cleanup expired keys periodically
    setInterval(() => this.cleanup(), 60 * 1000);
  }

  get(key) {
    if (!this.store.has(key)) return null;
    const expiry = this.ttls.get(key);
    if (expiry && Date.now() > expiry) {
      this.del(key);
      return null;
    }
    return this.store.get(key);
  }

  set(key, value, ttlSeconds = 1800) {
    this.store.set(key, value);
    if (ttlSeconds > 0) {
      this.ttls.set(key, Date.now() + ttlSeconds * 1000);
    }
  }

  del(key) {
    this.store.delete(key);
    this.ttls.delete(key);
  }

  clearSearchCache() {
    for (const [key] of this.store.entries()) {
      if (key.startsWith('search:') || key.startsWith('booking:')) {
        this.del(key);
      }
    }
    console.log('[Cache] Cleared search & booking cache');
  }

  cleanup() {
    const now = Date.now();
    for (const [key, expiry] of this.ttls.entries()) {
      if (now > expiry) {
        this.del(key);
      }
    }
  }
}

const cache = new CacheProvider();
module.exports = cache;
