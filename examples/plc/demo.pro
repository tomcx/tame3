CoDeSys+(   �          �        @        @   2.3.10.0    @?    @                                     ȩ�O +    @      	-	Xdu c             ٭J        �   @   q   C:\TWINCAT\PLC\LIB\STANDARD.LIB @                                                                                          CONCAT               STR1               ��              STR2               ��                 CONCAT                                         ��66  �   ����           CTD           M             ��           Variable for CD Edge Detection      CD            ��           Count Down on rising edge    LOAD            ��           Load Start Value    PV           ��           Start Value       Q            ��           Counter reached 0    CV           ��           Current Counter Value             ��66  �   ����           CTU           M             ��            Variable for CU Edge Detection       CU            ��       
    Count Up    RESET            ��           Reset Counter to 0    PV           ��           Counter Limit       Q            ��           Counter reached the Limit    CV           ��           Current Counter Value             ��66  �   ����           CTUD           MU             ��            Variable for CU Edge Detection    MD             ��            Variable for CD Edge Detection       CU            ��	       
    Count Up    CD            ��
           Count Down    RESET            ��           Reset Counter to Null    LOAD            ��           Load Start Value    PV           ��           Start Value / Counter Limit       QU            ��           Counter reached Limit    QD            ��           Counter reached Null    CV           ��           Current Counter Value             ��66  �   ����           DELETE               STR               ��              LEN           ��              POS           ��                 DELETE                                         ��66  �   ����           F_TRIG           M             ��
                 CLK            ��           Signal to detect       Q            ��           Edge detected             ��66  �   ����           FIND               STR1               ��              STR2               ��                 FIND                                     ��66  �   ����           INSERT               STR1               ��              STR2               ��              POS           ��                 INSERT                                         ��66  �   ����           LEFT               STR               ��              SIZE           ��                 LEFT                                         ��66  �   ����           LEN               STR               ��                 LEN                                     ��66  �   ����           MID               STR               ��              LEN           ��              POS           ��                 MID                                         ��66  �   ����           R_TRIG           M             ��
                 CLK            ��           Signal to detect       Q            ��           Edge detected             ��66  �   ����           REPLACE               STR1               ��              STR2               ��              L           ��              P           ��                 REPLACE                                         ��66  �   ����           RIGHT               STR               ��              SIZE           ��                 RIGHT                                         ��66  �   ����           RS               SET            ��              RESET1            ��                 Q1            ��
                       ��66  �   ����           SEMA           X             ��                 CLAIM            ��	              RELEASE            ��
                 BUSY            ��                       ��66  �   ����           SR               SET1            ��              RESET            ��                 Q1            ��	                       ��66  �   ����           TOF           M             ��           internal variable 	   StartTime            ��           internal variable       IN            ��       ?    starts timer with falling edge, resets timer with rising edge    PT           ��           time to pass, before Q is set       Q            ��	       2    is FALSE, PT seconds after IN had a falling edge    ET           ��
           elapsed time             ��66  �   ����           TON           M             ��           internal variable 	   StartTime            ��           internal variable       IN            ��       ?    starts timer with rising edge, resets timer with falling edge    PT           ��           time to pass, before Q is set       Q            ��	       0    is TRUE, PT seconds after IN had a rising edge    ET           ��
           elapsed time             ��66  �   ����           TP        	   StartTime            ��           internal variable       IN            ��       !    Trigger for Start of the Signal    PT           ��       '    The length of the High-Signal in 10ms       Q            ��	           The pulse    ET           ��
       &    The current phase of the High-Signal             ��66  �   ����    R    @                                                                                          FB_RAMP           rtrigChangeDir                 R_TRIG   %               tonPulse                    TON   %               rsDown                   TogRS   %               
   bChangeDir            %           change direction
   nLimitHigh    �     %        
   limit high	   nLimitLow     ���   %        	   limit low   tPulse    2      %           pulse pause time for counter      nRamp           % 	                       � �N  @   ����           FB_RUNNINGLIGHT           tonPulse                    TON   '               bActive             '               tmp             '                  bRun            '               tPulse    �     '                  bQ1            '               bQ2            '               bQ3            ' 	              bQ4            ' 
              bQ5            '                        n%�N  @   ����           FB_SHIFTARRAY           tonPulse                    TON   #               i            #                  iValue1           #               iValue2           #               tPulse    2      #                      arrStore    	  
                   ST_ChartFields         #                    ȧ�N  @   ����           MAIN           fbRamp1                      FB_Ramp                   fbRamp2                      FB_Ramp                   fbShiftArray                    FB_ShiftArray                   fbRunningLight        
                FB_RunningLight                                    ~#�N  @   ����           TOGRS               CLK            !               SET            !               RESET1            !                  Q1            !               edge            ! 	                        ��N  @   ����            
         ( �      K   �     K   �     K   �     K   �                 �         +     ��localhost          �� ��@     �       ��    p�     ���\�wp �w�����¿w>�3     �� ��@        @�����@     �]!@� �]!\�        �]!   �]!�����   ��    ��� d� H�  �|��|������|�� ��@        �� ��@     t� �H����� t� �H����� ��     ,   ,                                                        K         @   ٭J�   /*BECKCONFI3*/
        !�� @   @   �   �     3               
   Standard            	ȩ�O         ��             VAR_GLOBAL
END_VAR
                                                                                  "   , n � �z             Standard
         MAIN����               [V�N                 $����  � 0H!                                    Standard ٭J	٭J                                       	ĩ�O                    VAR_CONFIG
END_VAR
                                                                                   '              , X t �           Globale_Variablen ٭J	ԛO      ��          �  VAR_GLOBAL
	In_BOOL1 AT %MX0.0: BOOL;
	In_BOOL2 AT %MX0.1: BOOL;

	In_SINT1 AT %MB4: SINT;
	In_SINT2 AT%MB5: SINT;
	In_SINT3 AT%MB6: SINT;
	In_SINT4 AT%MB7: SINT;
	In_INT1 AT %MB8: INT;
	In_INT2 AT %MB10: INT;
	In_DINT AT %MB12: DINT;
	In_STRING AT %MB16: STRING(11);
	In_TIME AT %MB28: TIME;
	In_REAL AT %MB32: REAL;

	TOD_Test AT %MB52: TOD;
	DT_Test AT %MB56: DT;
	DATE_Test AT %MB60: DATE;

	ArrayOfString AT%MB250: ARRAY[1..5] OF STRING(10);
	ArrayOfBool AT%MB310:  ARRAY[1..5] OF BOOL;

	ArrayOfTestStruct2 AT%MB352: ARRAY[1..4] OF ST_Test2;

	TestStruct AT%MB500:  ST_Test;

	ArrayTestStruct3 AT%MB600: ARRAY [1..20] OF ST_Test3;

	TestStruct4 AT%MB1200:  ST_Test4;

	Ramp1 AT %MB2000: INT;
	Ramp2 AT %MB2002: INT;
	RunningLight1 AT %MB2004: BOOL;
	RunningLight2 AT %MB2005: BOOL;
	RunningLight3 AT %MB2006: BOOL;
	RunningLight4 AT %MB2007: BOOL;
	RunningLight5 AT %MB2008: BOOL;

	ArrayChart AT%MB2100: ARRAY [1..10] OF ST_ChartFields;
END_VAR
                                                                                               '           	     	� �           Variablen_Konfiguration ٭J	٭J	       ��3              VAR_CONFIG
END_VAR
                                                                                                 K   |0|0 @A    @   MS Sans Serif @                �����                               �      �   ���  �3 ���   � ���                  DEFAULT             System      K   |0|0 @A    @   MS Sans Serif @                �����                         HH':'mm':'ss   dd'-'MM'-'yyyy'          &   ,     &
           ST_ChartFields ���N	���N                     Q   TYPE ST_ChartFields :
STRUCT
	graph1: INT;
	graph2: INT;
END_STRUCT
END_TYPE             "   ,     V�           ST_Test ^��N	^��N                      �   TYPE ST_Test :
STRUCT
	nByte: BYTE;
	fReal: REAL;
	iSint: SINT;
	tTime: TIME;
	arrString: ARRAY[1..5] OF STRING(6);
	iInt: INT;
END_STRUCT
END_TYPE                , B W �<           ST_Test2 W��N	W��N      ��^3����        �   TYPE ST_Test2 :
STRUCT
	sString: STRING(5) := 'xxxxx';
	fReal: REAL;
	iSint: SINT;
	iInt: INT;
	arrByte: ARRAY[1..5] OF BYTE;
END_STRUCT
END_TYPE                ,     0�           ST_Test3 ��N	��N       ^_��          �   TYPE ST_Test3 :
STRUCT
	sString: STRING(10) := '';
	fReal: REAL;
	iInt: INT;
	nByte: BYTE;
	bCheckbox: BOOL;
	arrBool: ARRAY[1..5] OF BOOL;
END_STRUCT
END_TYPE             $   , , : i           ST_Test4 �2�N	�2�N                      �   TYPE ST_Test4 :
STRUCT
	fReal: REAL;
	tTime: TIME;
	tTod: TOD;
	dtDate: DATE;
	arrString: ARRAY[1..5] OF STRING(6);
END_STRUCT
END_TYPE              %   ,     R�           FB_Ramp � �N	� �N      ��������        O  FUNCTION_BLOCK FB_Ramp
VAR_INPUT
	bChangeDir: BOOL;		(*change direction*)
	nLimitHigh: INT:= 32767;	(*limit high*)
	nLimitLow: INT:= -32768;	(*limit low*)
	tPulse: TIME:= T#50ms; 	(*pulse pause time for counter*)
END_VAR
VAR_OUTPUT
	nRamp: INT;
END_VAR
VAR
	rtrigChangeDir: R_TRIG;
	tonPulse: TON;
	rsDown: TogRS;
END_VAR�   tonPulse(in:=NOT tonPulse.Q, PT:=tPulse);
rsDown(set:=nRamp >= nLimitHigh, reset1:= nRamp <= nLimitLow, clk:=bChangeDir);

IF tonPulse.Q THEN
	IF rsDown.Q1 THEN
		nRamp := nRamp - 1;
	ELSE
		nRamp := nRamp +1;
	END_IF;
END_IF;
               '   , , : RD           FB_RunningLight �%�N	n%�N      P\��            �   FUNCTION_BLOCK FB_RunningLight
VAR_INPUT
	bRun: BOOL;
	tPulse: TIME:= T#500ms;
END_VAR
VAR_OUTPUT
	bQ1: BOOL;
	bQ2: BOOL;
	bQ3: BOOL;
	bQ4: BOOL;
	bQ5: BOOL;
END_VAR
VAR
	tonPulse: TON;
	bActive: BOOL;
	tmp: BOOL;
END_VARY  tonPulse(in:=NOT tonPulse.Q AND bRun, PT:=tPulse);

IF tonPulse.Q THEN
	bQ5:= bQ4;
	bQ4:= bQ3;
	bQ3:= bQ2;
	bQ2:= bQ1;
	bQ1:= tmp;
	tmp := bQ5;
END_IF;

IF NOT bRun THEN
	bQ1 := FALSE;
	bQ2 := FALSE;
	bQ3 := FALSE;
	bQ4 := FALSE;
	bQ5 := FALSE;
END_IF;

IF bRun AND NOT bActive THEN
	bQ1 := TRUE;
END_IF;

bActive := bRun;               #   , � � ��           FB_ShiftArray � �N	ȧ�N      unr  P
        �   FUNCTION_BLOCK FB_ShiftArray
VAR_INPUT
	iValue1: INT;
	iValue2: INT;
	tPulse: TIME:= T#50ms;
END_VAR
VAR_IN_OUT
	arrStore: ARRAY [1..10] OF ST_ChartFields;
END_VAR
VAR
	tonPulse: TON;
	i: BYTE;
END_VAR  tonPulse(in:=NOT tonPulse.Q, PT:=tPulse);

IF tonPulse.Q THEN
	FOR i := 2 TO 10 DO
 		arrStore[i - 1].graph1  :=arrStore[i].graph1;
		arrStore[i - 1].graph2  :=arrStore[i].graph2;
	END_FOR;
	arrStore[10].graph1 := iValue1;
	arrStore[10].graph2 := iValue2;
END_IF;                   , , : ��           MAIN �.�N	~#�N      ��������        �   PROGRAM MAIN
VAR
	fbRamp1: FB_Ramp;
	fbRamp2: FB_Ramp;
	fbShiftArray: FB_ShiftArray;
	fbRunningLight: FB_RunningLight;
END_VAR      fbRamp1FALSE100-100AT#20msFB_Ramp        Ramp1     fbRamp2FALSE100-100AT#100msFB_Ramp        Ramp2     fbShiftArrayRamp1Ramp2T#500msA
ArrayChartFB_ShiftArray           fbRunningLightTRUEAT#300msFB_RunningLight  RunningLight2 RunningLight3 RunningLight4 RunningLight5      RunningLight1d                  !   ,   h           TogRS '��N	 ��N      unr  P
        �   FUNCTION_BLOCK TogRS
VAR_INPUT
	CLK : BOOL;
	SET: BOOL;
	RESET1 : BOOL;
END_VAR
VAR_OUTPUT
	Q1 : BOOL;
	edge : BOOL;
END_VAR

y   IF RESET1 THEN
	Q1 := 0;
ELSIF SET THEN
	Q1:= 1;
ELSIF CLK AND NOT edge THEN
	Q1 := NOT Q1;
END_IF;
edge := clk;
                 ����, B W ��         "   STANDARD.LIB 5.6.98 13:03:02 @f�w5      CONCAT @                	   CTD @        	   CTU @        
   CTUD @           DELETE @           F_TRIG @        
   FIND @           INSERT @        
   LEFT @        	   LEN @        	   MID @           R_TRIG @           REPLACE @           RIGHT @           RS @        
   SEMA @           SR @        	   TOF @        	   TON @           TP @              Global Variables 0 @                          utBO;po           2                ����������������  
             ����   ��4          ����  �p��`�                   	   Bausteine                 FB_Ramp  %                   FB_RunningLight  '                   FB_ShiftArray  #                  MAIN                      TogRS  !   ����           
   Datentypen                 ST_ChartFields  &                   ST_Test  "                  ST_Test2                     ST_Test3                     ST_Test4  $   ����             Visualisierungen  ����              Globale Variablen                 Globale_Variablen                     Variablen_Konfiguration  	   ����                                                             ٭J                         	   localhost            P      	   localhost            P      	   localhost            P          �|�