module.exports = {
  apps: [
    {
      name: "Config-Server",
      script: "java",
      args: "-jar ./Config-Server/target/Config-Server-1.0.0.jar",
      log_file: "./logs/config-server-out.log",
    },
    {
      name: "platform-registry",
      script: "java",
      args: "-jar ./platform-registry/target/Service-Registry-1.0.0.jar",
      log_file: "./logs/platform-registry-out.log",
    },
    {
      name: "Api-gateway",
      script: "java",
      args: "-jar ./Api-gateway/target/Api-Gateway-1.0.0.jar",
      log_file: "./logs/api-gateway-out.log",
    }
  ]
};