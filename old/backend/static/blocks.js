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
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
                ["8", "8"],
                ["9", "9"],
                ["10", "10"],
                ["11", "11"],
                ["12", "12"],
                ["13", "13"],
                ["A0", "A0"],
                ["A1", "A1"],
                ["A2", "A2"],
                ["A3", "A3"],
                ["A4", "A4"],
                ["A5", "A5"]
            ]), "STATE");
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

Blockly.Blocks['arduino_analog_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Read analog pin");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["A0", "A0"],
                ["A1", "A1"],
                ["A2", "A2"],
                ["A3", "A3"],
                ["A4", "A4"],
                ["A5", "A5"],
                ["3", "3"],
                ["5", "5"],
                ["6", "6"],
                ["9", "9"],
                ["10", "10"],
                ["11", "11"],
            ]), "PIN");
        this.setOutput(true, "Number"); // Returns a number between 0 and 1023
        this.setColour(230);
        this.setTooltip("Reads the value from a specified analog pin, which can be between 0 and 1023.");
        this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/analog-io/analogread/");
    }
}

Blockly.Arduino['arduino_analog_read'] = function (block) {
    var pin = block.getFieldValue('PIN');
    // Use analogRead function to read the value from the specified analog pin
    return ['analogRead(' + pin + ')', Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Blocks['arduino_analog_write'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Set analog pin");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["A1", "A1"],
                ["A2", "A2"],
                ["A3", "A3"],
                ["A4", "A4"],
                ["A5", "A5"]
            ]), "PIN");
        this.appendDummyInput()
            .appendField("to");
        this.appendValueInput("VALUE") // Change to value input (0-255)
            .setCheck("Number");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Write a PWM value (0-255) to an analog pin.");
        this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/analog-io/analogwrite/");
    }
}

Blockly.Arduino['arduino_analog_read'] = function (block) {
    var pin = block.getFieldValue('PIN');
    // Use analogRead function to read the value from the specified analog pin
    return ['analogRead(' + pin + ')', Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Blocks['number_input'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 0), "NUMBER")
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Input a number.");
        this.setHelpUrl("https://www.gnu.org/software/gnu-c-manual/gnu-c-manual.html"); // gnu-c-manual, find it yourself in the numerous directories
    }
}

Blockly.Arduino['number_input'] = function (block) {
    var number = block.getFieldValue('NUMBER');
    // Return the number as a string
    return [number, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Blocks['text'] = {
    init: function () {
        this.appendDummyInput('IN')
            .appendField(new Blockly.FieldTextInput(''), 'NAME');
        this.setOutput(true, 'String');
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour('105');
    }
};

Blockly.Arduino['text'] = function (block) {
    var input = block.getFieldvalue('IN')
    return [`"${input}"`, Blockly.Arduino.ORDER_ATOMIC]
}

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
        let shadowBlock = this.workspace.newBlock('number_input');
        shadowBlock.setShadow(true);
        shadowBlock.getField('NUMBER').setValue(5); // Default repeat count
        this.getInput('COUNT').connection.connect(shadowBlock.outputConnection);
    }
};

Blockly.Arduino['arduino_repeat'] = function (block) {
    return `for (int i = 0; i < ${Blockly.Arduino.valueToCode(block, 'COUNT', Blockly.Arduino.ORDER_ATOMIC) || '0'} ; i++) {\n${Blockly.Arduino.statementToCode(block, 'DO')} }\n`;
};

Blockly.Blocks['delay'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Delay for");
        this.appendValueInput("TIME")
            .setCheck("Number")
            .appendField("ms");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("Pauses the program for a specified number of milliseconds.");
        this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/time/delay/");
        let shadowBlock = this.workspace.newBlock('number_input');
        shadowBlock.setShadow(true);
        shadowBlock.getField('NUMBER').setValue(5);
        this.getInput('TIME').connection.connect(shadowBlock.outputConnection);
    },
}

Blockly.Arduino['delay'] = function (block) {
    return `delay(${Blockly.Arduino.valueToCode(block, 'TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000'});\n`;
}

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
    return `Serial.begin(${Blockly.Arduino.valueToCode(block, 'BAUD', Blockly.Arduino.ORDER_ATOMIC) || '9600'});\n`;
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

Blockly.Blocks['new_variable'] = {
    init: function () {
        this.appendDummyInput('')
            .appendField('Create a new')
            .appendField(new Blockly.FieldDropdown([
                ['Number', 'double'],
                ['Boolean', 'bool']
            ]), 'TYPE')
            .appendField('with name')
            .appendField(new Blockly.FieldTextInput('New Variable'), 'NAME')
            .appendField('and assign');
        this.appendValueInput('VALUE');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(30);
    }
};

Blockly.Arduino['new_variable'] = function (block) {
    return `${Blockly.Arduino.valueToCode(block, 'TYPE', Blockly.Arduino.ORDER_ATOMIC)} ${Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC)} = ${Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC)};\n`;
}

Blockly.Blocks['set_variable'] = {
    init: {
        
    }
}