document.addEventListener("deviceready", function () {
  console.log("iOSRTCApp >>> deviceready event");

  // if iOS devices
  if (window.device.platform === "iOS") {
    cordova.plugins.iosrtc.debug.enable("*");

    // Pollute global namespace with WebRTC stuff.
    cordova.plugins.iosrtc.registerGlobals();

    window.addEventListener("orientationchange", function () {
      console.log("iOSRTCApp >>> orientationchange event");

      updateVideos();
    });

    window.updateVideos = function () {
      console.debug("iOSRTCApp >>> update iosrtc videos");

      // NOTE: hack, but needed due to CSS transitions and so on.
      [0, 500, 1000, 1500].forEach(function (delay) {
        setTimeout(function () {
          cordova.plugins.iosrtc.refreshVideos();
        }, delay);
      });
    };
  }
  // Non iOS devices.
  else {
  window.updateVideos = function () {};
  }


});  // End of ondeviceready.