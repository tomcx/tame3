/**
 * @author T. Schmidt
 */

//Webservice definition for all examples
var Plc =  TAME.WebServiceClient.createClient({
    serviceUrl: 'http://192.168.1.2/TcAdsWebService/TcAdsWebService.dll',
    amsNetId: '192.168.1.2.1.1',
    amsPort: '801',     //default
    //dataAlign4: true,  //default, set it to "true" if you have an ARM based PLC device (i.e. CX90xx)
    language: 'ge',      //default, set it to "en" for english names of days and months
    symFileUrl: '../resources/demo.tpy'
});
