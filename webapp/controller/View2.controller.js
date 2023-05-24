sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("employeeprj.employeeodataproject.controller.View2", {
            onInit: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("View2").attachPatternMatched(this.onRouteMatch, this);

            },
            onNavBack: function () {
                history.go(-1);
            },

            onRouteMatch: function (evt) {
                var that = this;
                debugger;

                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZTEST_EMP_SALARY_SRV/")

                var keyId2 = evt.mParameters.arguments.Id;

                oModel.read("/zemp_detailsSet('" + keyId2 + "')", {
                    success: function (odata1) {
                        var oModel1 = new sap.ui.model.json.JSONModel();
                        oModel1.setData(odata1);
                        that.getView().setModel(oModel1, "Data1");

                        //  alert("Success");

                        //  that.byId("_idEmp1").setValue(odata1.EmpId);
                        //  that.byId("_idEmpNm1").setValue(odata1.EmpName);
                        //  that.byId("_idEmpmob1").setValue(odata1.EmpPhone);
                        //  that.byId("_idEmpEml1").setValue(odata1.EmpEmail);
                        //  that.byId("_idEmpDep1").setValue(odata1.EmpDep);
                        //  that.byId("_idEmpBpay1").setValue(odata1.BasicPay);
                        //  that.byId("_idEmpHra1").setValue(odata1.Hra);
                        //  that.byId("_idEmpSplA1").setValue(odata1.SplAllowance);
                        //  that.byId("_idEmpShftA1").setValue(odata1.ShiftAllowance);
                        //  that.byId("_idEmpMP1").setValue(odata1.MonthlyPay);
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
                    //       alert("Error");
                    // }                    
                });
            }
        });
    });
