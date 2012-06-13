/**
 *  @author T.Schmidt, 30.05.2012
 *  Example of SumReadRequest.
 */

//A global variable as namespace
var Demo = {
    inputFields: [],
    displayFields: []
};


window.onload = function() {
    
    //Get the symbols
    Plc.logSymbols();
    
    //I'm lazy, so I store the input/display fields in an array
    (function () {
        for (var i = 0; i < 10; i++) {
            Demo.inputFields[i] = document.getElementById("input" + i);
            Demo.displayFields[i] = document.getElementById("show" + i).firstChild;
        }
    })();
    
    //Button for sending values to the PLC, can be a local variable.
    //50ms after writing the function for reading is called.
    var button1 = document.getElementById("button1");
    
    //Write request: The variables in the PLC have to 
    //follow one another in a direct sequence.
    button1.onclick = function(){
        Plc.sumReadReq({
            items: [{
                addr:  '%MB4',
                jvar: 'Demo.displayFields[0].data',
                type: 'SINT'
            },{
                addr:  '%MB5',
                jvar: 'Demo.displayFields[1].data',
                type: 'SINT'
            },{
                addr:  '%MB6',
                jvar: 'Demo.displayFields[2].data',
                type: 'SINT'
            },{
                addr:  '%MB7',
                jvar: 'Demo.displayFields[3].data',
                type: 'SINT'
            },{
                addr:  '%MB8',
                jvar: 'Demo.displayFields[4].data',
                type: 'INT'
            },{
                addr:  '%MB10',
                jvar: 'Demo.displayFields[5].data',
                type: 'INT'
            },{
                addr:  '%MB12',
                jvar: 'Demo.displayFields[6].data',
                type: 'DINT'
            },{
                addr:  '%MB16',
                jvar: 'Demo.displayFields[7].data',
                type: 'STRING.11'
            },{
                jvar: 'Demo.displayFields[8].data',
                type: 'TIME.#m'
            },{
                jvar: 'Demo.displayFields[9].data',
                type: 'REAL.2'
            }]
        });
    };
    
    //Read request: If the variables in the PLC follow one another in a
    //direct sequence, you can use the 'cont' option and omit the variable
    //addresses. 
    Demo.readData = function() {
        Plc.sumReadReq({
            items: [{
                addr:  '%MB4',
                jvar: 'Demo.displayFields[0].data',
                type: 'SINT'
            },{
                addr:  '%MB5',
                jvar: 'Demo.displayFields[1].data',
                type: 'SINT'
            },{
                addr:  '%MB6',
                jvar: 'Demo.displayFields[2].data',
                type: 'SINT'
            },{
                addr:  '%MB7',
                jvar: 'Demo.displayFields[3].data',
                type: 'SINT'
            },{
                jvar: 'Demo.displayFields[4].data',
                type: 'INT'
            },{
                jvar: 'Demo.displayFields[5].data',
                type: 'INT'
            },{
                jvar: 'Demo.displayFields[6].data',
                type: 'DINT'
            },{
                jvar: 'Demo.displayFields[7].data',
                type: 'STRING.11'
            },{
                jvar: 'Demo.displayFields[8].data',
                type: 'TIME.#m'
            },{
                jvar: 'Demo.displayFields[9].data',
                type: 'REAL.2'
            }]
        });
    };
    
};


