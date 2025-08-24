sap.ui.define([
    "sap/ui/core/UIComponent",
    "zfibudgetreport/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("zfibudgetreport.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
            this.setModel(new sap.ui.model.json.JSONModel(), "LocalModel");
            this.setModel(new sap.ui.model.json.JSONModel(), "PernrRange");
            this.setModel(new sap.ui.model.json.JSONModel(), "ExpType");
            this.setModel(new sap.ui.model.json.JSONModel(), "Status");
            this.setModel(new sap.ui.model.json.JSONModel(), "tabledata");
            this.setModel(new sap.ui.model.json.JSONModel(), "onpressPernr");
            this.setModel(new sap.ui.model.json.JSONModel(), "onpressProcessTo");
            this.setModel(new sap.ui.model.json.JSONModel(), "onpressBreqno");
            this.setModel(new sap.ui.model.json.JSONModel(), "onpress");
            this.setModel(new sap.ui.model.json.JSONModel(), "Header");
            // enable routing
            this.getRouter().initialize();
        }
    });
});