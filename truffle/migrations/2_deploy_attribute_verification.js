
const AttributeVerification=artifacts.require("AttributeVerification")

module.exports = function (deployer) {
  deployer.deploy(AttributeVerification);
};
