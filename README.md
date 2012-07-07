TAME 3: TwinCAT ADS Made Easy
=============================


Introduction
------------

TAME is JavaScript library created for an easy and comfortable access to the TwinCAT ADS WebService. The name is an 
acronym for „TwinCAT ADS Made Easy“ and stands also for „taming“ the complexity of ADS and AJAX requests. 
Originally a „wast product“ from the programming of a browser based visualisation for my home, it has become a (in my
opinion) useful little piece of software and I hope it will help others who want to develop their own visualisations. 
I'm not a professional programmer (in fact this is my first "seroius" project), so don't get upset when you look at 
the code.

The library allows to exchange data with a TwinCAT PLC without any knowledge of ADS. The browser connects to the 
webserver running on the PLC device and the ADS commands are wrapped in AJAX/SOAP requests. Have a look at the
manual and the examples for more information.

If you want to know more about the basics of the access to the ADS WebService with JavaScript look at the example 
[here] (http://infosys.beckhoff.com/content/1031/tcsample_webservice/html/webservice_samplejs.html).


Features
--------

There are methods for read and write access to single variables, variable blocks, arrays and structures in the TwinCAT 
PLC. New in this version is the SumReadRequest. It allows to read multiple PLC variables without the need of fixed 
addresses. Variables can now be accessed by name, a major improvement to TAME 2.

Supported data types are BOOL, BYTE, WORD, DWORD, USINT, SINT, UINT, INT, UDINT, DINT, TIME, TOD, DT, DATE, REAL, LREAL 
and STRING. There is also a special „type“ named INT1DP: It's an INT in the PLC, but in JavaScript the variable is of 
type float with 1 decimal place (i.e. a value of 568 in the PLC is 56.8 in JavaScript). The library provides built-in 
conversion of date and time values to formatted strings and REAL values can be rounded to a desired number of decimal 
places. For writing arrays and arrays of structures there is an option to choose only one array item to send to the 
PLC instead of the whole array. Another feature is the automatic structure padding for exchanging data with 
ARM-based devices (i.e. CX90xx).


Requirements
------------

Requried is a running ADS WebService, look at the [Beckhoff Infosys] (http://infosys.beckhoff.com) for more information 
about the installation.


License
-------

TAME is dual licensed under the MIT and the GPLv3 license. 

Beckhoff® and TwinCAT® are registered trademarks of Beckhoff Automation GmbH.


