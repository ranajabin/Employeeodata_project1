sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("employeeprj.employeeodataproject.controller.View1", {
            onInit: function () {
                this.onReadAll();

                // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                // oRouter.getRoute("View2").attachPatternMatched(this.onRouteMatch, this);

            },

            onReadAll: function () {
                // onRouteMatch: function () {

                var that = this;
                debugger;

                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZTEST_EMP_SALARY_SRV/?$orderby=EmpId desc")
                // var oModel = that.getOwnerComponent().getModel();                

                // var oInput1 = that.byId("_inp1").getValue();
                // oModel.read("/zemp_detailsSet('0000000001')", {
                oModel.read("/zemp_detailsSet", {
                    success: function (odata1) {
                        var oModel1 = new sap.ui.model.json.JSONModel();

                        oModel1.setData(odata1);
                        that.getView().setModel(oModel1, "Data1");
                        MessageBox.success("Success");
                        // alert("Success");
                    },
                    error: function (error) {
                        sap.ui.core.BusyIndicator.hide();
                        var messsage = error;
                        var msg = $(error.response.body).find('message').first().text();
                        var action = "OK";
                        new sap.m.MessageBox.error(msg, {
                            onClose: function () {
                                if (action === "OK") {

                                }
                            }
                        })
                    }
                    // error: function (oError) {
                    //     MessageBox.error("Error");
                    // }
                });
            },

            handleCreateStatement: function (oEvent) {
                debugger;

                // var that = this;

                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZTEST_EMP_SALARY_SRV/");

                var empid = sap.ui.getCore().byId("_idemp").getValue();
                var empname = sap.ui.getCore().byId("_idname").getValue();
                var empmob = sap.ui.getCore().byId("_idmob").getValue();
                var empemail = sap.ui.getCore().byId("_idemail").getValue();
                var empdept = sap.ui.getCore().byId("_iddept").getValue();
                var empbpay = sap.ui.getCore().byId("_idbpay").getValue();
                var emphra = sap.ui.getCore().byId("_idhra").getValue();
                var empspcla = sap.ui.getCore().byId("_idspcl").getValue();
                var empshfta = sap.ui.getCore().byId("_idshft").getValue();
                var empmpay = sap.ui.getCore().byId("_idmpay").getValue();


                var Payload = {
                    "EmpId": empid,
                    "EmpName": empname,
                    "EmpPhone": empmob,
                    "EmpEmail": empemail,
                    "EmpDep": empdept,
                    "BasicPay": empbpay,
                    "Hra": emphra,
                    "SplAllowance": empspcla,
                    "ShiftAllowance": empshfta,
                    "MonthlyPay": empmpay
                };

                oModel.create("/zemp_detailsSet", Payload, {
                    success: function (Data) {
                        method: "POST",
                            MessageBox.success("Created Successfully!");
                        //   alert("Created Successfully!");
                        /*  this._Dialog.close();
                          return;   */

                        //  var that = this;
                        var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZTEST_EMP_SALARY_SRV/");


                        oModel.read("/zemp_detailsSet", {
                            success: function (odata1) {
                                var oModel1 = new sap.ui.model.json.JSONModel();
                                oModel1.setData(odata1);
                                this.getView().setModel(oModel1, "Data1");
                                //  alert(odata1);
                            },
                            /*   error: function (oError) {
                                   alert("Error");
                               }   */
                        });
                    },
                    error: function (error) {
                        sap.ui.core.BusyIndicator.hide();
                        var messsage = error;
                        var msg = $(error.response.body).find('message').first().text();
                        var action = "OK";
                        new sap.m.MessageBox.error(msg, {
                            onClose: function () {
                                if (action === "OK") {

                                }
                            }
                        })
                    }
                    // error: function (oError) {                       
                    //     MessageBox.error("Error");
                    // }
                });

                sap.ui.getCore().byId("_idemp").setValue("");
                sap.ui.getCore().byId("_idname").setValue("");
                sap.ui.getCore().byId("_idmob").setValue("");
                sap.ui.getCore().byId("_idemail").setValue("");
                sap.ui.getCore().byId("_iddept").setValue("");
                sap.ui.getCore().byId("_idbpay").setValue("");
                sap.ui.getCore().byId("_idhra").setValue("");
                sap.ui.getCore().byId("_idspcl").setValue("");
                sap.ui.getCore().byId("_idshft").setValue("");
                sap.ui.getCore().byId("_idmpay").setValue("");

                this._Dialog.close();
            },

            handleEditStatement: function (oEvent) {
                debugger;
                var that = this;
                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZTEST_EMP_SALARY_SRV/");

                var oTable = that.getView().byId("table1");
                var oSelectedItems = oTable.getSelectedItems();


                if (oSelectedItems.length > 0) {

                    if (oEvent.getSource().getText() === "Edit") {
                        oEvent.getSource().setText("Submit");

                        for (var j = 0; j < oSelectedItems.length; j++) {

                            oSelectedItems[j].mAggregations.cells[1].setEditable(true);
                            oSelectedItems[j].mAggregations.cells[2].setEditable(true);
                            oSelectedItems[j].mAggregations.cells[3].setEditable(true);
                            oSelectedItems[j].mAggregations.cells[4].setEditable(true);
                            oSelectedItems[j].mAggregations.cells[5].setEditable(true);
                            oSelectedItems[j].mAggregations.cells[6].setEditable(true);
                            oSelectedItems[j].mAggregations.cells[7].setEditable(true);
                            oSelectedItems[j].mAggregations.cells[8].setEditable(true);
                            oSelectedItems[j].mAggregations.cells[9].setEditable(true);


                            MessageToast.show("Edit mode has been Enabled!");
                        }
                    }
                    else {
                        oEvent.getSource().setText("Edit");

                        for (var j = 0; j < oSelectedItems.length; j++) {

                            var empid = oSelectedItems[j].mAggregations.cells[0].mProperties.text;
                            var empname = oSelectedItems[j].mAggregations.cells[1].mProperties.value;
                            var empmob = oSelectedItems[j].mAggregations.cells[2].mProperties.value;
                            var empemail = oSelectedItems[j].mAggregations.cells[3].mProperties.value;
                            var empdept = oSelectedItems[j].mAggregations.cells[4].mProperties.value;
                            var empbpay = oSelectedItems[j].mAggregations.cells[5].mProperties.value;
                            var emphra = oSelectedItems[j].mAggregations.cells[6].mProperties.value;
                            var empspcla = oSelectedItems[j].mAggregations.cells[7].mProperties.value;
                            var empshfta = oSelectedItems[j].mAggregations.cells[8].mProperties.value;
                            var empmpay = oSelectedItems[j].mAggregations.cells[9].mProperties.value;


                            oSelectedItems[j].mAggregations.cells[1].setEditable(false);
                            oSelectedItems[j].mAggregations.cells[2].setEditable(false);
                            oSelectedItems[j].mAggregations.cells[3].setEditable(false);
                            oSelectedItems[j].mAggregations.cells[4].setEditable(false);
                            oSelectedItems[j].mAggregations.cells[5].setEditable(false);
                            oSelectedItems[j].mAggregations.cells[6].setEditable(false);
                            oSelectedItems[j].mAggregations.cells[7].setEditable(false);
                            oSelectedItems[j].mAggregations.cells[8].setEditable(false);
                            oSelectedItems[j].mAggregations.cells[9].setEditable(false);


                            var PayloadArr = [];

                            var Payload = {
                                "EmpId": empid,
                                "EmpName": empname,
                                "EmpPhone": empmob,
                                "EmpEmail": empemail,
                                "EmpDep": empdept,
                                "BasicPay": empbpay,
                                "Hra": emphra,
                                "SplAllowance": empspcla,
                                "ShiftAllowance": empshfta,
                                "MonthlyPay": empmpay
                            };

                            PayloadArr.push(Payload);

                            var len = PayloadArr.length;

                            for (var i = 0; i < len; i++) {

                                var oId = oSelectedItems[i].mAggregations.cells[0].mProperties.text;

                                oModel.update("/zemp_detailsSet('" + oId + "')", PayloadArr[i], {
                                    method: "PUT",
                                    success: function (Data) {
                                        MessageBox.success("Record Updated!");

                                        var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZTEST_EMP_SALARY_SRV/");


                                        oModel.read("/zemp_detailsSet", {
                                            success: function (odata1) {

                                                // var oModel1 = new sap.ui.model.json.JSONModel();
                                                // oModel1.setData(odata1);
                                                // that.getView().setModel(oModel1, "Data1");

                                                // oModel.submitChanges({groupId: "oId"});
                                                //  alert(odata1);
                                            },
                                            error: function (oError) {
                                                MessageBox.error("Error");
                                            }
                                        });
                                    },

                                    error: function (error) {
                                        sap.ui.core.BusyIndicator.hide();
                                        var messsage = error;
                                        var msg = $(error.response.body).find('message').first().text();
                                        var action = "OK";
                                        new sap.m.MessageBox.error(msg, {
                                            onClose: function () {
                                                if (action === "OK") {

                                                }
                                            }
                                        })
                                    }
                                    // error: function (oError) {
                                    //     MessageBox.error("Error");
                                    // }
                                });
                            }
                        }
                    }
                } else {
                    MessageToast.show("Please select a row to Update!");
                }
            },

            handleDeleteStatement: function (oEvent) {
                debugger;
                var that = this;
                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZTEST_EMP_SALARY_SRV/");

                var oTable = this.getView().byId("table1");
                var oSelectedItems = oTable.getSelectedItems();

                if (oSelectedItems.length > 0) {

                    var oId = oSelectedItems[0].mAggregations.cells[0].mProperties.text;

                    oModel.remove("/zemp_detailsSet('" + oId + "')", {

                        method: "DELETE",
                        success: function (Data) {
                            //  alert("success");
                            alert("Are you sure, you want to delete? ");
                            var t = this;
                            var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZTEST_EMP_SALARY_SRV/");

                            //   t.onReadAll();

                            oModel.read("/zemp_detailsSet", {
                                success: function (odata1) {
                                    var oModel1 = new sap.ui.model.json.JSONModel();
                                    oModel1.setData(odata1);
                                    t.getView().setModel(oModel1, "Data1");
                                    MessageBox.success("Record Deleted Successfully..");
                                    //  alert("Record Successfully Deleted..")
                                    //  alert(odata1);
                                },
                                error: function (error) {
                                    sap.ui.core.BusyIndicator.hide();
                                    var messsage = error;
                                    var msg = $(error.response.body).find('message').first().text();
                                    var action = "OK";
                                    new sap.m.MessageBox.error(msg, {
                                        onClose: function () {
                                            if (action === "OK") {

                                            }
                                        }
                                    })
                                }
                                // error: function (oError) {
                                //     MessageBox.error("Error");                                   
                                // }
                            });
                        },
                        error: function (oError) {
                            MessageBox.error("Error");
                        }
                    })
                } else {
                    MessageToast.show("Please select a row to delete!");
                    //   alert("Please select a row to delete!");
                }
            },

            onNavView2: function (oEvent) {

                debugger;
                var keyId = oEvent.oSource.mProperties.text;
                var loRouter = sap.ui.core.UIComponent.getRouterFor(this);
                loRouter.navTo("View2", { Id: keyId });
                // loRouter.navTo("View2");
            },

            onLoadDialog1: function () {
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "employeeprj.employeeodataproject.fragments.fragment1"
                    });
                }
                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },

            handleCloseDialog: function () {
                this.byId("pDialog").close();
            },

            onLoadDialog2: function () {

                if (!this._Dialog) {
                    this._Dialog = sap.ui.xmlfragment("employeeprj.employeeodataproject.fragments.fragment2", this);
                    this.getView().addDependent(this._Dialog);
                }
                this._Dialog.open();
            },

            onClose: function () {

                this._Dialog.close();
            },

            handleOkDialog: function () {
                var that = this;
                debugger;
                //  var _eid, _ename;

                var oModel11 = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZTEST_EMP_SALARY_SRV/")
                var oInput = that.byId("_idEmp1").getValue();
                //   var oInput = "0000000002";
                oModel11.read("/zemp_detailsSet('" + oInput + "')", {
                    // oModel11.read("/zemp_detailsSet('0000000001')", {
                    success: function (odata1) {
                        //     var oModel11 = new sap.ui.model.json.JSONModel();

                        //     oModel11.setData(odata1);
                        //     that.getView().setModel(oModel11, "Data11");
                        //     // MessageBox.success("Success");
                        alert(odata1.EmpName);
                        //     // alert("Success");

                        that.byId("_idEmp1").setValue(odata1.EmpId);
                        that.byId("_idEmpNm1").setValue(odata1.EmpName);
                        that.byId("_idEmpmob1").setValue(odata1.EmpPhone);
                        that.byId("_idEmpEml1").setValue(odata1.EmpEmail);
                        that.byId("_idEmpDep1").setValue(odata1.EmpDep);
                        that.byId("_idEmpBpay1").setValue(odata1.BasicPay);
                        that.byId("_idEmpHra1").setValue(odata1.Hra);
                        that.byId("_idEmpSplA1").setValue(odata1.SplAllowance);
                        that.byId("_idEmpShftA1").setValue(odata1.ShiftAllowance);
                        that.byId("_idEmpMP1").setValue(odata1.MonthlyPay);
                    },
                    error: function (error) {
                        sap.ui.core.BusyIndicator.hide();
                        var messsage = error;
                        var msg = $(error.response.body).find('message').first().text();
                        var action = "OK";
                        new sap.m.MessageBox.error(msg, {
                            onClose: function () {
                                if (action === "OK") {

                                }
                            }
                        })
                    }
                    // error: function (oError) {
                    //     MessageBox.error("Error");
                    //     // alert("Error");
                    // }
                });
            },


            onFilterSearch: function (oEvent) {
                debugger;

                var sQuery = oEvent.getParameter("query"),
                    oTable = this.getView().byId("table1"),
                    oBinding = oTable.getBinding("items");

                if (oEvent.getId() == "liveChange") {
                    sQuery = oEvent.getParameter("query");
                }
                if (sQuery) {
                    var oFilter1 = new sap.ui.model.Filter('EmpId', 'Contains', sQuery);
                    var oFilter2 = new sap.ui.model.Filter('EmpName', 'Contains', sQuery);
                    var oFilter3 = new sap.ui.model.Filter('EmpPhone', 'Contains', sQuery);
                    var oFilter4 = new sap.ui.model.Filter('EmpEmail', 'Contains', sQuery);
                    var oFilter5 = new sap.ui.model.Filter('EmpDep', 'Contains', sQuery);
                    var oFilter6 = new sap.ui.model.Filter('BasicPay', 'Contains', sQuery);
                    var oFilter7 = new sap.ui.model.Filter('Hra', 'Contains', sQuery);
                    var oFilter8 = new sap.ui.model.Filter('SplAllowance', 'Contains', sQuery);
                    var oFilter9 = new sap.ui.model.Filter('ShiftAllowance', 'Contains', sQuery);
                    var oFilter10 = new sap.ui.model.Filter('MonthlyPay', 'Contains', sQuery);

                    var aFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5, oFilter6, oFilter7, oFilter8, oFilter9, oFilter10]);
                    // var aFilter = new sap.ui.model.Filter([oFilter1]);
                }
                oBinding.filter(aFilter);
            },

            onPressGo: function () {
                debugger;

                // var oBinding = this.getView().byId("Table1").getBinding("rows"),
                var oTable = this.getView().byId("table1"),
                    oBinding = oTable.getBinding("items");

                var oFinalFilter = [],
                    aFilterEmpId = [],
                    aFilterEmpName = [],
                    aFilterEmpMob = [],
                    aFilterEmpemail = [],
                    aFIlterEmpDept = [],
                    aFilterBasicPay = [],
                    aFilterHra = [],
                    aFilterSpclA = [],
                    aFilterShftA = [],
                    aFilterMnthlyPay = [];

                //   var sQuery = this.byId("_idName").getSelectedItems()[0].mProperties.text;
                var sEmpId = this.byId("_empid").getSelectedItems(),
                    sEmpName = this.byId("_empname").getSelectedItems(),
                    sEmpMob = this.byId("_empPhone").getSelectedItems(),
                    sEmpemail = this.byId("_empEmail").getSelectedItems(),
                    sEmpDept = this.byId("_empDept").getSelectedItems(),
                    sBasicPay = this.byId("_empBPay").getSelectedItems(),
                    sHra = this.byId("_empHra").getSelectedItems(),
                    sSpclA = this.byId("_empSpclA").getSelectedItems(),
                    sShftA = this.byId("_empShftA").getSelectedItems(),
                    sMnthlyPay = this.byId("_empMPay").getSelectedItems();

                if (
                    !sEmpId.length > 0 && !sEmpName.length > 0 && !sEmpMob.length > 0 &&
                    !sEmpemail.length > 0 && !sEmpDept.length > 0 && !sBasicPay.length > 0 &&
                    !sHra.length > 0 && !sSpclA.length > 0 && !sShftA.length > 0 &&
                    !sMnthlyPay.length > 0
                ) {
                    !oBinding.filter([]);
                } else {
                    for (var i = 0; i < sEmpId.length; i++) {
                        aFilterEmpId.push(
                            new sap.ui.model.Filter({
                                path: "EmpId",
                                operator: FilterOperator.EQ,
                                value1: sEmpId[i].getText(),
                            })
                        );
                    }
                    for (var i = 0; i < sEmpName.length; i++) {
                        aFilterEmpName.push(
                            new sap.ui.model.Filter({
                                path: "EmpName",
                                operator: FilterOperator.EQ,
                                value1: sEmpName[i].getText(),
                            })
                        );
                    }
                    for (var i = 0; i < sEmpMob.length; i++) {
                        aFilterEmpMob.push(
                            new sap.ui.model.Filter({
                                path: "EmpPhone",
                                operator: FilterOperator.EQ,
                                value1: sEmpMob[i].getText(),
                            })
                        );
                    }
                    for (var i = 0; i < sEmpemail.length; i++) {
                        aFilterEmpemail.push(
                            new sap.ui.model.Filter({
                                path: "EmpEmail",
                                operator: FilterOperator.EQ,
                                value1: sEmpemail[i].getText(),
                            })
                        );
                    }
                    for (var i = 0; i < sEmpDept.length; i++) {
                        aFIlterEmpDept.push(
                            new sap.ui.model.Filter({
                                path: "EmpDep",
                                operator: FilterOperator.EQ,
                                value1: sEmpDept[i].getText(),
                            })
                        );
                    }
                    for (var i = 0; i < sBasicPay.length; i++) {
                        aFilterBasicPay.push(
                            new sap.ui.model.Filter({
                                path: "BasicPay",
                                operator: FilterOperator.EQ,
                                value1: sBasicPay[i].getText(),
                            })
                        );
                    }
                    for (var i = 0; i < sHra.length; i++) {
                        aFilterHra.push(
                            new sap.ui.model.Filter({
                                path: "Hra",
                                operator: FilterOperator.EQ,
                                value1: sHra[i].getText(),
                            })
                        );
                    }
                    for (var i = 0; i < sSpclA.length; i++) {
                        aFilterSpclA.push(
                            new sap.ui.model.Filter({
                                path: "SplAllowance",
                                operator: FilterOperator.EQ,
                                value1: sSpclA[i].getText(),
                            })
                        );
                    }
                    for (var i = 0; i < sShftA.length; i++) {
                        aFilterShftA.push(
                            new sap.ui.model.Filter({
                                path: "ShiftAllowance",
                                operator: FilterOperator.EQ,
                                value1: sShftA[i].getText(),
                            })
                        );
                    }
                    for (var i = 0; i < sMnthlyPay.length; i++) {
                        aFilterMnthlyPay.push(
                            new sap.ui.model.Filter({
                                path: "MonthlyPay",
                                operator: FilterOperator.EQ,
                                value1: sMnthlyPay[i].getText(),
                            })
                        );
                    }

                    if (aFilterEmpId.length > 0) {
                        oFinalFilter.push(new sap.ui.model.Filter({
                            and: false,
                            filters: aFilterEmpId,
                        }));
                    }
                    if (aFilterEmpName.length > 0) {
                        oFinalFilter.push(new sap.ui.model.Filter({
                            and: false,
                            filters: aFilterEmpName,
                        }));
                    }
                    if (aFilterEmpMob.length > 0) {
                        oFinalFilter.push(new sap.ui.model.Filter({
                            and: false,
                            filters: aFilterEmpMob,
                        }));
                    }
                    if (aFilterEmpemail.length > 0) {
                        oFinalFilter.push(new sap.ui.model.Filter({
                            and: false,
                            filters: aFilterEmpemail,
                        }));
                    }
                    if (aFIlterEmpDept.length > 0) {
                        oFinalFilter.push(new sap.ui.model.Filter({
                            and: false,
                            filters: aFIlterEmpDept,
                        }));
                    }
                    if (aFilterBasicPay.length > 0) {
                        oFinalFilter.push(new sap.ui.model.Filter({
                            and: false,
                            filters: aFilterBasicPay,
                        }));
                    }
                    if (aFilterHra.length > 0) {
                        oFinalFilter.push(new sap.ui.model.Filter({
                            and: false,
                            filters: aFilterHra,
                        }));
                    }
                    if (aFilterSpclA.length > 0) {
                        oFinalFilter.push(new sap.ui.model.Filter({
                            and: false,
                            filters: aFilterSpclA,
                        }));
                    }
                    if (aFilterShftA.length > 0) {
                        oFinalFilter.push(new sap.ui.model.Filter({
                            and: false,
                            filters: aFilterShftA,
                        }));
                    }
                    if (aFilterMnthlyPay.length > 0) {
                        oFinalFilter.push(new sap.ui.model.Filter({
                            and: false,
                            filters: aFilterMnthlyPay,
                        }));
                    }
                    oBinding.filter(oFinalFilter);
                }
                MessageToast.show("Filter Button has been Pressed!");
            },
        });
    });
