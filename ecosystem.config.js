module.exports = {
  apps: [
    {
      name: "Config-Server",
      script: "java",
      args: ["-jar", "./Config-Server/target/Config-Server-1.0.0.jar"],
      cwd: ".",
      autorestart: true,
      restart_delay: 8000,
      max_restarts: 10,
      out_file: "./logs/config-server-out.log",
      error_file: "./logs/config-server-error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    },
    {
      name: "platform-registry",
      script: "java",
      args: ["-jar", "./platform-registry/target/Service-Registry-1.0.0.jar"],
      cwd: ".",
      autorestart: true,
      restart_delay: 8000,
      max_restarts: 10,
      out_file: "./logs/platform-registry-out.log",
      error_file: "./logs/platform-registry-error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    },
    {
      name: "Api-Gateway",
      script: "java",
      args: ["-jar", "./Api-gateway/target/Api-Gateway-1.0.0.jar"],
      cwd: ".",
      autorestart: true,
      restart_delay: 8000,
      max_restarts: 10,
      out_file: "./logs/api-gateway-out.log",
      error_file: "./logs/api-gateway-error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    }
  ]
};