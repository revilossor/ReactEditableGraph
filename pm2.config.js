module.exports = {
  apps: [
    {
      name: "ReactEditableGraph",
      script: "server",

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: "one two",
      instances: 1,
      autorestart: true,
      watch: ["server"],
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
