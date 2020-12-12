var Service, Characteristic;
var TC_Module =  require('./lib/tc_connect');

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-total-connect-security-mod", "TotalConnectSecurityPanel", TC2Accessory);
}

/*
{
        "accessory": "TotalConnectSecurity",
        "name": "Security System",
        "username": "my_username",
        "password": "xxx",
        "appID": "14588",
        "version": "1.0.0"
   }
* */

function TC2Accessory(log, config) {

    this.log = log;
    this.name = config["name"];


    this.tcService = new TC_Module(this.log, config);

    //this.service = new Service.Switch(this.name);
    this.service = new Service.SecuritySystem(this.name);


    this.service
        .getCharacteristic(Characteristic.SecuritySystemTargetState)
        .on("get", this.getTarget.bind(this))
        .on("set", this.setTarget.bind(this));
    this.service
        .getCharacteristic(Characteristic.SecuritySystemCurrentState)
        .on('get', this.getCurrent.bind(this));

}

TC2Accessory.prototype.getTarget = function(callback) {
    this.log("Get state of SecuritySystemTargetState was called");

    //this.tcService.tcIsArmed(callback);
    const currentValue = Characteristic.SecuritySystemTargetState.STAY_ARM;
    callback(null, currentValue);

}


TC2Accessory.prototype.getCurrent = function(callback) {
  this.log("Get state of SecuritySystemCurrentState was called");

  const currentValue = Characteristic.SecuritySystemTargetState.STAY_ARM;
  callback(null, currentValue);

  //this.tcService.tcIsArmed(callback);

}
TC2Accessory.prototype.setTarget = function(state, callback) {

    this.log('Set State Handler was called');

    this.log("Triggered Set State to Value: %s", state);
    this.service.setCharacteristic(Characteristic.SecuritySystemCurrentState, state);
    callback(null);

    // var isOn = false;
    // // Read the state here
    // this.log('the state we are about to set in the index function is %s', state);
    //
    // //this.log("Set state to %s", isOn ? "on" : "off");
    //
    // if(isOn)
    //     this.tcService.tcArm(callback);
    // else
    //     this.tcService.tcDisarm(callback);

}

TC2Accessory.prototype.getServices = function() {
    return [this.service];
}
