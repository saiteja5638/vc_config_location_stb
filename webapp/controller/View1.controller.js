sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        var that;
        return Controller.extend("locationstb.controller.View1", {
            onInit: function () {
                that =this;
                if (!that.create) {

                    that.create = sap.ui.xmlfragment("locationstb.view.hide", that);
                }
                var jQueryScript = document.createElement('script');
                jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
                document.head.appendChild(jQueryScript);
    
                var jQueryScript = document.createElement('script');
                jQueryScript.setAttribute('src', 'https://unpkg.com/xlsx/dist/xlsx.full.min.js');
                document.head.appendChild(jQueryScript);

                var oModel = new sap.ui.model.json.JSONModel()
                var odata = that.getOwnerComponent().getModel()

                that.byId("table").getColumns().forEach(obj=>{
                    obj.setVisible(false)
                })

                odata.read("/LOCATION",{
                    success:function(response)
                    {
                        console.log(response.results)

                        oModel.setData({
                            items:response.results
                        })
                    },
                    error:function(err)
                    {
                        console.log(err)
                    }
                })

                that.byId("table").setModel(oModel)
            },
            onFileSelect:function(e)
            {
                this._import(e.getParameter("files") && e.getParameter("files")[0]);
            },
            _import(file)
            {


                var oModel = new sap.ui.model.json.JSONModel();
                var oTable = this.getView().byId("table")
                var excelData = {};

                if (file && window.FileReader) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, {
                            type: 'binary'
                        });
                        workbook.SheetNames.forEach(function (sheetName) {
                            // Here is your object for every sheet in workbook
                            excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        });
                        oModel.setData({
                            items:excelData
                        })

                        oTable.setModel(oModel)
                    };
                    reader.onerror = function (ex) {
                        console.log(ex);
                    };
                    reader.readAsBinaryString(file);
                }

                that.byId("_IDGenFileUploader1").setValue("")

            },
            hide_columns:function()
            {
                let table = that.byId("table")

                that.create.open()

                
            },
            close_hide:function()
            {
                that.create.close()
            },
            on_hide_select:function()
            {
                that.create.close()

                 let table =   sap.ui.getCore().byId("_IDGenTable1")
                
                 let main_table = that.byId("table")

                 if(table.getSelectedItems().length>0)
                 {
                    table.getSelectedItems().forEach(
                        obj=>{
                            main_table.getColumns().forEach(
                                obj1=>{
                                    if(obj.getCells()[0].getText()==obj1.getHeader().getText())
                                    {
                                        obj1.setVisible(true)
                                    }
                                }
                            )
                        }
                     )
                 }
                 else
                 {
                    that.byId("table").getColumns().forEach(obj=>{
                        obj.setVisible(false)
                    })
                 }
                
            },
            close_hide:function()
            {
                that.create.close()
            }
        

        });
    });
