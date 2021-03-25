const Migrations = artifacts.require("Migrations");

module.exports = function (deployer, 0x1aabd1dd6db299788f23396fa5508b00256968f6) {
  deployer.deploy(Migrations);
};
