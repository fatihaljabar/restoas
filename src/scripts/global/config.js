const CONFIG = {
    KEY: process.env.KEY,
    BASE_URL: 'https://restaurant-api.dicoding.dev',
    BASE_IMAGE_URL: 'https://restaurant-api.dicoding.dev/images/large/',
    CACHE_NAME: new Date().toISOString(),
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_VERSION: process.env.DATABASE_VERSION,
    OBJECT_STORE_NAME: process.env.OBJECT_STORE_NAME,
};

export default CONFIG;