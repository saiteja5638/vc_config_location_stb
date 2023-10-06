/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"location_stb/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
