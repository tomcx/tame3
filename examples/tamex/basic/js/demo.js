/**
 *  @author T.Schmidt, 03.05.2012
 *  Very basic example for using TAME.
 */

//Global variables
var field1, field2, field5, field6, field7, field8, field9, 
    field10, field11, field12, field13, field20, field21,
    counter1, counter2, pollZyk1, runLight = [];


window.onload = function() {
    
    /*
     *  Examples for reading/writing on button click.
     */
    
    //Output fields, must be defined global.
    field1 = document.getElementById('field1').firstChild;
    field2 = document.getElementById('field2').firstChild;
    field5 = document.getElementById('field5').firstChild;
    field6 = document.getElementById('field6').firstChild;
    field7 = document.getElementById('field7').firstChild;
    field8 = document.getElementById('field8').firstChild;
    field9 = document.getElementById('field9').firstChild;
    field10 = document.getElementById('field10').firstChild;
    field11 = document.getElementById('field11').firstChild;
    field12 = document.getElementById('field12').firstChild;
    field13 = document.getElementById('field13').firstChild;
    field20 = document.getElementById('field20').firstChild;
    field21 = document.getElementById('field21').firstChild;
    
    //Functions for writing/reading data
    var pollWert1 = function() {
        Plc.readBool({addr: '%MX0.0', jvar: 'field1.data'});
    };
    var pollWert2 = function() {
        Plc.readBool({addr: '%MX0.1', jvar: 'field2.data'});
    };
    var pollWert5 = function() {
        Plc.readSint({addr: '%MB4', jvar: 'field5.data'});
    };
    var pollWert6 = function() {
        Plc.readInt({addr: '%MB8', jvar: 'field6.data'});
    };
    var pollWert7 = function() {
        Plc.readDint({addr: '%MB12', jvar: 'field7.data'});
    };
    var pollWert8 = function() {
        Plc.readString({addr: '%MB16', strlen: 11, jvar: 'field8.data'});
    };
    var pollWert9 = function() {
        Plc.readTime({addr: '%MB28', jvar: 'field9.data', format:'#m'});
    };
    var pollWert10 = function() {
        Plc.readTod({addr: '%MB52', jvar: 'field10.data', format:'#hh#:#mm#:#ss#:#msmsms'});
    };
    var pollWert11 = function() {
        Plc.readDt({addr: '%MB56', jvar: 'field11.data', format:'#DD#.#MM#.#YYYY#, #hh#:#mm#:#ss'});
        Plc.readDt({addr: '%MB56', jvar: 'field20.data'});
    };
    var pollWert12 = function() {
        Plc.readDate({addr: '%MB60', jvar: 'field12.data', format:'#WEEKDAY#, #DD#.#MM#.#YYYY'});
    };
    var pollWert13 = function() {
        Plc.readReal({addr: '%MB32', jvar: 'field13.data', decPlaces: 2});
        Plc.readReal({addr: '%MB32', jvar: 'field21.data'});
    };
    
    //Buttons
    //oc = on-complete, ocd = on-complete-delay (in ms)
    document.getElementById('button1').onclick = function() {
        var wert = document.getElementById('checkbox1').checked;
        Plc.writeBool({addr: '%MX0.0', val: wert, oc: pollWert1, ocd: 50});
    };
    document.getElementById('button2').onclick = function() {
        var wert = document.getElementById('checkbox2').checked;
        Plc.writeBool({addr: '%MX0.1', val: wert, oc: pollWert2, ocd: 50});
    };
    document.getElementById('button5').onclick = function() {
        var wert = document.getElementById('input1').value;
        Plc.writeSint({addr: '%MB4', val: wert, oc: pollWert5, ocd: 50});
    };
    document.getElementById('button6').onclick = function() {
        var wert = document.getElementById('input2').value;
        Plc.writeInt({addr: '%MB8', val: wert, oc: pollWert6, ocd: 50});
    };
    document.getElementById('button7').onclick = function() {
        var wert = document.getElementById('input3').value;
        Plc.writeDint({addr: '%MB12', val: wert, oc: pollWert7, ocd: 50});
    };
    document.getElementById('button8').onclick = function() {
        var wert = document.getElementById('input4').value;
        Plc.writeString({addr: '%MB16', strlen: 11, val: wert, oc: pollWert8, ocd: 50});
    };
    document.getElementById('button9').onclick = function() {
        var wert = document.getElementById('input5').value;
        Plc.writeTime({addr: '%MB28', val: wert, oc: pollWert9, ocd: 50, format:'#m'});
    };
    document.getElementById('button10').onclick = function() {
        var wert = new Date(new Date());
        Plc.writeTod({addr: '%MB52', val: wert, oc: pollWert10, ocd: 50});
    };
    document.getElementById('button11').onclick = function() {
        var wert = new Date(new Date());
        Plc.writeDt({addr: '%MB56', val: wert, oc: pollWert11, ocd: 50});
    };
    document.getElementById('button12').onclick = function() {
        var wert = new Date(new Date());
        Plc.writeDate({addr: '%MB60', val: wert, oc: pollWert12, ocd: 50});
    };
    document.getElementById('button13').onclick = function() {
        var wert = document.getElementById('input6').value;
        Plc.writeReal({addr: '%MB32', val: wert, oc: pollWert13, ocd: 50});
    };
    
    
        
    /*
     *  Example for cyclic reading. For better performance always try to 
     *  use only one fast cyclic request.
     */
    
    counter1 = document.getElementById('ramp1').firstChild;
    counter2 = document.getElementById('ramp2').firstChild;
     
    //This function reads the data of 2 counters and 5 boolean variables 
    //an calls itself again. Of course you can use "setInterval" instead.
    //Note that you can't read multiple data with the %MX-range, so set your
    //boolean variables to %MB-adresses.
    pollZyk1 = function(){
        Plc.readReq({
            addr: '%MB2000',
            seq: true,   //Set it to "false", if you want to address each PLC variable on it's own.
            id: 1,        //If an ID is given, the script waits for the end of the request before firing a new one.
            items: [
                {
                    jvar: 'counter1.data',
                    type: 'INT'
                },{
                    jvar: 'counter2.data',
                    type: 'INT'
                },{
                    jvar: 'runLight[0]',
                    type: 'BOOL'
                },{
                    jvar: 'runLight[1]',
                    type: 'BOOL'
                },{
                    jvar: 'runLight[2]',
                    type: 'BOOL'
                },{
                    jvar: 'runLight[3]',
                    type: 'BOOL'
                },{
                    jvar: 'runLight[4]',
                    type: 'BOOL'
                }
            ],
            oc: function() {
                //Set the background-color after reading data
                for (var i = 0; i < 5; i++) {
                    if (runLight[i] === true) {
                        document.getElementById('light' + i).style.backgroundColor = 'green';
                    } else {
                        document.getElementById('light' + i).style.backgroundColor = 'red';
                    }
                }
            }
        });
        
        window.setTimeout('pollZyk1()', 100); //Timeout 100 ms
    };

    
    /*
     *  Start
     */
    
    pollZyk1();
    pollWert1();
    pollWert2();
    pollWert5();
    pollWert6();
    pollWert7();
    pollWert8();
    pollWert9();
    pollWert10();
    pollWert11();
    pollWert12();
    pollWert13();

};


