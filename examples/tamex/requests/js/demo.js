/**
 *  @author T.Schmidt, 31.10.2011
 *  Example of read and write requests.
 */

//A global variable as namespace
var Demo = {
    inputFields: [],
    displayFields: []
};


window.onload = function(){
    
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
        Plc.writeReq({
            addr: '%MB4',
            oc: Demo.readData,
            ocd: 50,
            items: [{
                val: Demo.inputFields[0].value,
                type: 'SINT'
            },{
                val: Demo.inputFields[1].value,
                type: 'SINT'
            },{
                val: Demo.inputFields[2].value,
                type: 'SINT'
            },{
                val: Demo.inputFields[3].value,
                type: 'SINT'
            },{
                val: Demo.inputFields[4].value,
                type: 'INT'
            },{
                val: Demo.inputFields[5].value,
                type: 'INT'
            },{
                val: Demo.inputFields[6].value,
                type: 'DINT'
            },{
                val: Demo.inputFields[7].value,
                type: 'STRING.11'
            },{
                val: Demo.inputFields[8].value,
                type: 'TIME.#m'
            },{
                val: Demo.inputFields[9].value,
                type: 'REAL.2'
            }]
        });
    };
    
    //Read request: If the variables in the PLC follow one another in a
    //direct sequence, you can use the 'cont' option and omit the variable
    //addresses. 
    Demo.readData = function(){
        Plc.readReq({
            addr: '%MB4',
            seq: true,
            items: [{
                jvar: 'Demo.displayFields[0].data',
                type: 'SINT'
            },{
                jvar: 'Demo.displayFields[1].data',
                type: 'SINT'
            },{
                jvar: 'Demo.displayFields[2].data',
                type: 'SINT'
            },{
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
    
    //Read request: If the variables in the PLC doesnt't follow one another in a
    //direct sequence, you can adress each single variable on its own. 
    //Specify the address as a number without %M,%Q or %I in an ascending order.
    //An advantage of this system is shown at address 5: You can write the data of
    //a PLC variable to more then one javascript variable.
    //Note that the request reads the complete data from the start address to the last
    //address. So it's a good idea to set the PLC adresses as close as possible.
    /*
    Demo.readData = function(){
        Plc.readReq({
            addr: '%MB4',
            items: [{
                addr: 4,
                jvar: 'Demo.displayFields[0].data',
                type: 'SINT'
            },{
                addr: 5,
                jvar: 'Demo.displayFields[1].data',
                type: 'SINT'
            },{
                addr: 5,
                jvar: 'AnotherDisplayField.data',
                type: 'SINT'
            },{
                addr: 6,
                jvar: 'Demo.displayFields[2].data',
                type: 'SINT'
            },{
                addr: 7,
                jvar: 'Demo.displayFields[3].data',
                type: 'SINT'
            },{
                addr: 10,
                jvar: 'Demo.displayFields[4].data',
                type: 'INT'
            },{
                addr: 12,
                jvar: 'Demo.displayFields[5].data',
                type: 'INT'
            },{
                addr: 17,
                jvar: 'Demo.displayFields[6].data',
                type: 'DINT'
            },{
                addr: 23,
                jvar: 'Demo.displayFields[7].data',
                type: 'STRING.10'
            },{
                addr: 34,
                jvar: 'Demo.displayFields[8].data',
                type: 'TIME.#m'
            },{
                addr: 39,
                jvar: 'Demo.displayFields[9].data',
                type: 'REAL.2'
            }]
        });
    };
    */
    
};


