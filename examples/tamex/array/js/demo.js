/**
 *  @author T.Schmidt, 31.10.2011
 *  Example using arrays with TAME.
 */

//A global variable as namespace
var Demo = {
    stringArrayIn: [],
    stringArrayOut: [],
    boolArrayIn: [],
    boolArrayOut: []
};
            

window.onload = function(){
    
    /*
     * Array of STRING
     */

    //Button for sending values to the PLC, can be a local variable.
    //50ms after writing the function for reading is called.
    var button1 = document.getElementById("button1");

    button1.onclick = function(){
        for (var i = 0; i < 5; i++) {
            Demo.stringArrayOut[i] = document.getElementById("inputstring" + i).value;
        }
        var item = parseInt((document.getElementById("stringIdx").value), 10);
        Plc.writeArrayOfString({
            addr: '%MB250',
            val: Demo.stringArrayOut,
            item: item,
            arrlen: 5,
            strlen: 10,
            oc: Demo.readStringArray,
            ocd: 50
        });
    };

    Demo.readStringArray = function(){
        Plc.readArrayOfString({
            addr: '%MB250',
            strlen: 10,
            arrlen: 5,
            jvar: 'Demo.stringArrayIn',
            oc: function() {
                 for (var i = 0; i < 5; i++) {
                    document.getElementById("showstring" + i).firstChild.data = Demo.stringArrayIn[i];
                }
            }
        });
    };
    
    
    /*
     * Array of BOOL
     */
    
    var button2 = document.getElementById("button2");

    button2.onclick = function(){
        for (var i = 0; i < 5; i++) {
            Demo.boolArrayOut[i] = document.getElementById("inputbool" + i).checked;
        }
        var item2 = parseInt((document.getElementById("boolIdx").value), 10);
        Plc.writeArrayOfBool({
            addr: '%MB310',
            val: Demo.boolArrayOut,
            item: item2,
            arrlen: 5,
            oc: Demo.readBoolArray,
            ocd: 50
        });
    };

    Demo.readBoolArray = function(){
        Plc.readArrayOfBool({
            addr: '%MB310',
            arrlen: 5,
            jvar: 'Demo.boolArrayIn',
            oc: function() {
                 for (var i = 0; i < 5; i++) {
                    document.getElementById("showbool" + i).firstChild.data = Demo.boolArrayIn[i];
                }
            }
        });
    };
    
};


