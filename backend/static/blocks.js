// Arduino Setup Block
Blockly.Blocks['arduino_setup'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Setup");
        this.appendStatementInput("DO")
            .setCheck(null);
        this.setColour(120);
        this.setTooltip("The setup() function is called once when your sketch starts. Use it to initialize variables, pin modes, start using libraries, etc.");
        this.setHelpUrl("https://www.arduino.cc/reference/en/language/structure/setup-and-loop/setup/");
        this.setDeletable(false);
        this.setMovable(true);
    }
};

Blockly.Arduino['arduino_setup'] = function (block) {
    var statements_do = Blockly.Arduino.statementToCode(block, 'DO');
    var code = 'void setup() {\n' + statements_do + '}\n';
    return code;
};


Blockly.Blocks['arduino_loop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Loop");
        this.appendStatementInput("DO")
            .setCheck(null);
        this.setColour(120);
        this.setTooltip("The loop() function is executed repeatedly after setup(). It's the core of most sketches.");
        this.setHelpUrl("https://www.arduino.cc/reference/en/language/structure/setup-and-loop/loop/");
        this.setDeletable(false);
        this.setMovable(true);
    }
};

Blockly.Arduino['arduino_loop'] = function (block) {
    var statements_do = Blockly.Arduino.statementToCode(block, 'DO');
    var code = 'void loop() {\n' + statements_do + '}\n';
    return code;
};

Blockly.Blocks['arduino_digital_write'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Set digital pin");
        this.appendValueInput("PIN") // Change to value input for more flexibility (e.g., variables)
            .setCheck("Number")
            .appendField("pin"); // Label for the input
        this.appendDummyInput()
            .appendField("to");
        this.appendValueInput("STATE") // Change to value input (Boolean or Number)
            .setCheck(["Boolean", "Number"]); // Allow HIGH/LOW or true/false or 1/0
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Write a HIGH or a LOW value to a digital pin.");
        this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/digital-io/digitalwrite/");
    }
};

Blockly.Arduino['arduino_digital_write'] = function (block) {
    var pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '0'; // Default if not connected
    var state = Blockly.Arduino.valueToCode(block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || 'LOW'; // Default if not connected
    // Convert boolean 'true'/'false' to 'HIGH'/'LOW' if needed, or assume the user will input 'HIGH'/'LOW' strings or 1/0 numbers.
    // For simplicity, directly use the state value. Arduino handles 0/1 or HIGH/LOW correctly.
    return 'digitalWrite(' + pin + ', ' + state + ');\n';
};


// Digital Read Block
Blockly.Blocks['arduino_digital_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Read digital pin");
        this.appendValueInput("PIN") // Change to value input
            .setCheck("Number")
            .appendField("pin");
        this.setOutput(true, "Boolean"); // Returns HIGH or LOW, which can be interpreted as boolean
        this.setColour(230);
        this.setTooltip("Reads the value from a specified digital pin, either HIGH or LOW.");
        this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/digital-io/digitalread/");
    }
};

Blockly.Arduino['arduino_digital_read'] = function (block) {
    var pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '0';
    return ['digitalRead(' + pin + ')', Blockly.Arduino.ORDER_ATOMIC];
};

// Math Block (already pretty good)
Blockly.Blocks['arduino_math'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["+", "+"],
                ["-", "-"],
                ["*", "*"],
                ["/", "/"]
            ]), "OPERATOR");
        this.appendValueInput("B")
            .setCheck("Number");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Performs basic arithmetic operations.");
        this.setHelpUrl(""); // Consider adding a relevant help URL
    }
};

Blockly.Arduino['arduino_math'] = function (block) {
    var a = Blockly.Arduino.valueToCode(block, 'A', Blockly.Arduino.ORDER_ATOMIC);
    var b = Blockly.Arduino.valueToCode(block, 'B', Blockly.Arduino.ORDER_ATOMIC);
    var operator = block.getFieldValue('OPERATOR');
    // Ensure proper parentheses for order of operations, especially if complex expressions are nested.
    // For simple operations, ORDER_ATOMIC on inputs is usually sufficient.
    var code = a + " " + operator + " " + b;
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Repeat Block (Loop)
Blockly.Blocks['arduino_repeat'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Repeat");
        this.appendValueInput("COUNT") // Change to value input for variable iteration count
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("times");
        this.appendStatementInput("DO")
            .setCheck(null)
            .appendField("Do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("Repeats the contained blocks a specified number of times.");
        this.setHelpUrl(""); // Consider adding a relevant help URL
    }
};

Blockly.Arduino['arduino_repeat'] = function (block) {
    var count = Blockly.Arduino.valueToCode(block, 'COUNT', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var statements = Blockly.Arduino.statementToCode(block, 'DO');
    // Sanitize count to ensure it's a valid integer for the loop.
    var code = 'for (int i = 0; i < ' + count + '; i++) {\n' + statements + '}\n';
    return code;
};

// Serial Begin Block
Blockly.Blocks['arduino_serial_begin'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Start Serial at baud");
        this.appendValueInput("BAUD") // Change to value input
            .setCheck("Number");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Starts serial communication at the specified baud rate for debugging or communicating with a computer.");
        this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/communication/serial/begin/");
    }
};

Blockly.Arduino['arduino_serial_begin'] = function (block) {
    var baud = Blockly.Arduino.valueToCode(block, 'BAUD', Blockly.Arduino.ORDER_ATOMIC) || '9600';
    return 'Serial.begin(' + baud + ');\n';
};

// Serial Print Block
Blockly.Blocks['arduino_serial_print'] = {
    init: function () {
        this.appendValueInput("TEXT")
            .setCheck(null) // Allow any type to be printed (String, Number, Boolean, etc.)
            .appendField("Print to Serial");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Prints data to the serial port as human-readable ASCII text.");
        this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/communication/serial/println/");
    }
};

Blockly.Arduino['arduino_serial_print'] = function (block) {
    var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '""'; // Default to empty string if nothing connected
    return 'Serial.println(' + text + ');\n';
};