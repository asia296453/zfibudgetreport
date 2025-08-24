sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/m/MessageBox", 'sap/ui/model/Filter',
    "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "sap/ui/core/Fragment", "sap/m/UploadCollectionParameter",
    "sap/m/MessageToast", "sap/m/UploadCollectionParameter",
    'sap/ui/core/util/Export',
    'sap/ui/core/util/ExportTypeCSV',
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library"
], function (e, t, MessageBox, Filter, FilterOperator, JSONModel, Fragment, r, MessageToast, UploadCollectionParameter, Export, ExportTypeCSV, Spreadsheet, x) {
    "use strict";
    var EdmType = x.EdmType;
    return e.extend("zfibudgetreport.controller.BaseController", {
        onInit() {
        },
        getRouter: function () {
            return this.getOwnerComponent().getRouter()
        },
        getModel: function (e) {
            return this.getView().getModel(e)
        },
        setModel: function (e, t) {
            return this.getView().setModel(e, t)
        },
        showBusy: function (bBusy) {
            if (bBusy) {
                sap.ui.core.BusyIndicator.show(0);
            } else {
                sap.ui.core.BusyIndicator.hide();
            }
        },
        getText: function (sProperty, aArgs) {
            if (!this._oResourceBundle) {
                this._oResourceBundle = this.getModel("i18n").getResourceBundle();
            }
            return this._oResourceBundle.getText(sProperty, aArgs);
        },

        getResourceBundle: function (sText) {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle()
        },

        onAddrowPernr: function (oEvent) {
            var ssel = this.getOwnerComponent().getModel("onpress").getProperty("/results");
            var sval = {
                "value": ''
            }
            if (ssel === 'P') {
                var oval = this.getOwnerComponent().getModel("onpressPernr").getProperty("/results");
                oval.push(sval);
                this.getOwnerComponent().getModel("onpressPernr").setProperty("/results", oval);
            }
            if (ssel === 'E') {
                var oval = this.getOwnerComponent().getModel("onpressProcessTo").getProperty("/results");
                oval.push(sval);
                this.getOwnerComponent().getModel("onpressProcessTo").setProperty("/results", oval);
            }
            if (ssel === 'C') {
                var oval = this.getOwnerComponent().getModel("onpressBreqno").getProperty("/results");
                oval.push(sval);
                this.getOwnerComponent().getModel("onpressBreqno").setProperty("/results", oval);
            }
        },

        deleteRowPernr: function (oEvent) {
            var ssel = this.getOwnerComponent().getModel("onpress").getProperty("/results");
            if (ssel === 'P') {
                var ideleteRecord = oEvent.getSource().getParent().getId().split("-")[2];
                var stablelenght = this.getOwnerComponent().getModel("onpressPernr").getProperty("/results").length;
                if (stablelenght > 1) {
                    var odata = this.getView().getModel("onpressPernr").getProperty("/results");
                    odata.splice(parseInt(ideleteRecord), 1); //removing 1 record from i th index.
                    this.getView().getModel("onpressPernr").refresh(true);
                }
            }
            if (ssel === 'E') {
                var ideleteRecord = oEvent.getSource().getParent().getId().split("-")[2];
                var stablelenght = this.getOwnerComponent().getModel("onpressProcessTo").getProperty("/results").length;
                if (stablelenght > 1) {
                    var odata = this.getView().getModel("onpressProcessTo").getProperty("/results");
                    odata.splice(parseInt(ideleteRecord), 1); //removing 1 record from i th index.
                    this.getView().getModel("onpressProcessTo").refresh(true);
                }
            }
            if (ssel === 'C') {
                var ideleteRecord = oEvent.getSource().getParent().getId().split("-")[2];
                var stablelenght = this.getOwnerComponent().getModel("onpressBreqno").getProperty("/results").length;
                if (stablelenght > 1) {
                    var odata = this.getView().getModel("onpressBreqno").getProperty("/results");
                    odata.splice(parseInt(ideleteRecord), 1); //removing 1 record from i th index.
                    this.getView().getModel("onpressBreqno").refresh(true);
                }
            }
        },
        onpressPernr: function (oEvent) {
            this.getOwnerComponent().getModel("onpress").setProperty("/results", "P");
            this.onpressbtn();
        },
        onpressProcess: function (oEvent) {
            this.getOwnerComponent().getModel("onpress").setProperty("/results", "E");
            this.onpressbtn();
        },
        onpressBreqno: function (oEvent) {
            this.getOwnerComponent().getModel("onpress").setProperty("/results", "C");
            this.onpressbtn();
        },
        onpressbtn: function () {

            var ssel = this.getOwnerComponent().getModel("onpress").getProperty("/results");

            if (ssel === 'P') {
                if (!this.onpress1) {
                    var sval = {
                        "Value": ''
                    }
                    var oval = [];
                    oval.push(sval);
                    this.getOwnerComponent().getModel("onpressPernr").setProperty("/results", oval);
                    this.onpress1 = sap.ui.xmlfragment("zfibudgetreport.fragment.Pernr", this);
                    this.getView().addDependent(this.onpress1);
                }
                this.onpress1.open();
            }

            if (ssel === 'E') {
                if (!this.onpress2) {
                    var sval = {
                        "Value": ''
                    }
                    var oval = [];
                    oval.push(sval);
                    this.getOwnerComponent().getModel("onpressProcessTo").setProperty("/results", oval);
                    this.onpress2 = sap.ui.xmlfragment("zfibudgetreport.fragment.Process", this);
                    this.getView().addDependent(this.onpress2);
                }
                this.onpress2.open();
            }
            if (ssel === 'C') {
                if (!this.onpress3) {
                    var sval = {
                        "Value": ''
                    }
                    var oval = [];
                    oval.push(sval);
                    this.getOwnerComponent().getModel("onpressBreqno").setProperty("/results", oval);
                    this.onpress3 = sap.ui.xmlfragment("zfibudgetreport.fragment.Breqno", this);
                    this.getView().addDependent(this.onpress3);
                }
                this.onpress3.open();

            }

        },
        onclosePernr: function (oEvent) {
            var ssel = this.getOwnerComponent().getModel("onpress").getProperty("/results");

            if (ssel === 'P') {
                this.onpress1.close();
            }

            if (ssel === 'E') {
                this.onpress2.close();
            }
            if (ssel === 'C') {
                this.onpress3.close();
            }
            this.getOwnerComponent().getModel("onpress").setProperty("/results", "");
        },


        onOpenExpType: function (oEvent) {
            if (!this.ExpType) {
                this.ExpType = sap.ui.xmlfragment("zfibudgetreport.fragment.ExpType", this);
                this.getView().addDependent(this.ExpType);
            };
            this.getOdata("/EXPTYPESet", "ExpType", null);
            this.extyp = 'From';
            this.ExpType.open();
        },
        onOpenExpType1: function (oEvent) {
            if (!this.ExpType) {
                this.ExpType = sap.ui.xmlfragment("zfibudgetreport.fragment.ExpType", this);
                this.getView().addDependent(this.ExpType);
            };
            this.getOdata("/EXPTYPESet", "ExpType", null);
            this.extyp = 'To';
            this.ExpType.open();
        },
        handleValueHelpExpType: function (e) {

            var sProcess = e.getParameter("selectedItem").getProperty("title");
            if (this.extyp === 'From') {
                this.getOwnerComponent().getModel("LocalModel").getData().results.ProcessFrom = sProcess;
                this.getOwnerComponent().getModel("LocalModel").refresh(true);
                this.extyp = "";
            }
            else if (this.extyp === 'To') {
                this.getOwnerComponent().getModel("LocalModel").getData().results.ProcessTo = sProcess;
                this.getOwnerComponent().getModel("LocalModel").refresh(true);
                this.extyp = "";
            }

            //    this.showBusy(true);
            //     this.getView().getModel().read("/EXPTYPESet(ExpType='" + e.getParameter("selectedItem").getProperty("title") + "')", {
            //            // filters: [oFilter],
            //             success: function (oData) {
            //                 this.showBusy(false);

            //                 this.getView().getModel("create").getData().results.ExpType = oData.ExpType ;
            //                 this.getView().getModel("create").getData().results.ExpName = oData.ExpName ;
            //                 this.getView().getModel("create").getData().results.Saknr = oData.Saknr;
            //                 this.getView().getModel("create").getData().results.Stext = oData.Txt50;
            //                 this.getView().getModel("create").refresh(true);
            //             }.bind(this),
            //             error: function (oError) {
            //                 this.showBusy(false);
            //             }.bind(this)
            //         });


        },
        onDataReceived: function (oControlEvent) {
            var itemCount = oControlEvent.getParameters().getParameter('data')['results'];
            // this.getView().getModel("tabledata").setProperty("/results",itemCount);

        },
        onExport: function (OEvt) {
            var aCols, aData, oSettings;

            aCols = this.createColumnConfig();
            aData = this.getView().getModel("tabledata").getProperty("/results")
            // for(var i = 0 ; i<aData.length ; i++)
            // {
            // 	aData[i].Status = this.formateStatus(aData[i].Status);
            // }

            oSettings = {
                workbook: {
                    columns: aCols
                },
                dataSource: aData,
                fileName: "Authorization to Exceed Budget Report"
            };

            new Spreadsheet(oSettings)
                .build()
                .then(function () {
                    MessageToast.show("Export has finished");
                });

        },
        createColumnConfig: function () {
            return [
                { property: "Breqno", label: "Budget Request No" },
                { property: "Britem", label: "Document Line" },
                { property: "Btext", label: "Budget Request Desc." },
                { property: "Process", label: "Budgeting Process" },
                { property: "Ptext", label: "Text" },
                { property: "Docdate", label: "Document Date" ,type: EdmType.Date},
                { property: "Docyear", label: "Document Year" },
                { property: "Kostl", label: "Cost Center" },
                { property: "Ktext", label: "Description" },
                { property: "Dept", label: "Tracking Number" },
                { property: "Dtext", label: "Description" },
                { property: "Divis", label: "Character Field with Length 10" },
                { property: "Ditxt", label: "Char" },
                { property: "Status", label: "Budget Request Stat" },
                { property: "Crtby", label: "User Name" },
                { property: "Crtdat", label: "Current Date" ,type: EdmType.Date},
                { property: "Crttime", label: "Time" },
                { property: "FmArea", label: "FM Area" },
                { property: "Docnr", label: "Document Number" },
                { property: "Message", label: "Message Text" },
                { property: "Fundsctr", label: "Funds Center" },
                { property: "Fctxt", label: "Name" },
                { property: "Cmmtitem", label: "Commitment Item" },
                { property: "Cmtxt", label: "Name" },
                { property: "Amt", label: "Amount TC" },
                { property: "Curr", label: "currency-code" }

            ];
        },

        formatstatusapp: function (sText) {
            var sTxt = '';
            if (sText === '' || sText === 'SAVE' || sText === 'IN') {
                sTxt = 'In Process';
            } else if (sText === 'SUFA') {
                sTxt = 'Submitted for Approval';
            }
            else if (sText === 'AP') {
                sTxt = 'Approved';

            } else if (sText === 'RE') {
                sTxt = 'Reopen';
            }
            else if (sText === 'RJ') {
                sTxt = 'Rejected';
            } else if (sText === 'PO') {
                sTxt = 'Posted';
            }

            return sTxt;
        },
        timeformat: function (val) {
            if (val !== null) {
                if (typeof val === 'string' || val instanceof String) {
                    val = val.replace(/^PT/, '').replace(/S$/, '');
                    val = val.replace('H', ':').replace('M', ':');

                    var multipler = 60 * 60;
                    var result = 0;
                    val.split(':').forEach(function (token) {
                        result += token * multipler;
                        multipler = multipler / 60;
                    });
                    var timeinmiliseconds = result * 1000;

                    var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
                        pattern: "KK:mm:ss a"
                    });
                    var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
                    return timeFormat.format(new Date(timeinmiliseconds + TZOffsetMs));
                } else {
                    val = val.ms;
                    var ms = val % 1000;
                    val = (val - ms) / 1000;
                    var secs = val % 60;
                    val = (val - secs) / 60;
                    var mins = val % 60;
                    var hrs = (val - mins) / 60;

                    return hrs + ':' + mins + ':' + secs;
                }
            }
        },
        DateFormatStr: function (oVal) {
            if (oVal !== null) {
                if (typeof oVal === 'string' || oVal instanceof String) {
                    return oVal.substr(8, 2) + "-" + oVal.substr(5, 2) + "-" + oVal.substr(0, 4);
                } else if (oVal instanceof Date) {
                    var sDate = oVal.toJSON();
                    return sDate.substr(8, 2) + "-" + sDate.substr(5, 2) + "-" + sDate.substr(0, 4);

                }
            }
        },
        getOdata: function (surl, smodelname, ofilter) {
            return new Promise((resolve, reject) => {
                if (ofilter === null) {
                    this.showBusy(true);
                    this.getOwnerComponent().getModel().read(surl, {
                        success: function (oData) {
                            this.showBusy(false);
                            if (oData.results !== undefined) {
                                this.getModel(smodelname).setProperty("/results", oData.results);
                                resolve(oData.results);
                            } else {
                                this.getModel(smodelname).setProperty("/results", oData);
                                resolve(oData);
                            }

                        }.bind(this),
                        error: function (oError) {
                            this.showBusy(false);
                            var msg = JSON.parse(oError.responseText).error.message.value;
                            MessageBox.error(msg);
                            reject();
                        }.bind(this)
                    });
                } else {
                    this.showBusy(true);
                    this.getOwnerComponent().getModel().read(surl, {
                        filters: [ofilter],
                        success: function (oData) {
                            this.showBusy(false);
                            if (oData.results !== undefined) {
                                this.getModel(smodelname).setProperty("/results", oData.results);
                                resolve(oData.results);
                            } else {
                                this.getModel(smodelname).setProperty("/results", oData);
                                resolve(oData);
                            }
                        }.bind(this),
                        error: function (oError) {
                            this.showBusy(false);
                            var msg = JSON.parse(oError.responseText).error.message.value;
                            MessageBox.error(msg);
                            reject();
                        }.bind(this)
                    });
                }
            });
        },

    });
});