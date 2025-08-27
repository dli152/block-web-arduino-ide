// generator.js

// Ensure Blockly.Arduino exists. If you're including the official Blockly
// Arduino generator (generators/arduino.js), this line might not be strictly necessary
// but it's good practice for robustness in case that file isn't loaded.
Blockly.Arduino = new Blockly.Generator('Arduino');

// Define the order of operations for Arduino code generation.
// This is crucial for correct precedence in generated code.
// For a barebones setup, we can use the default Blockly order.
Blockly.Arduino.ORDER_ATOMIC = 0; // A literal or a parenthesized expression
Blockly.Arduino.ORDER_UNARY_POSTFIX = 1; // expr++ expr--
Blockly.Arduino.ORDER_UNARY_PREFIX = 2; // -expr !expr ~expr ++expr --expr
Blockly.Arduino.ORDER_MULTIPLICATIVE = 3; // * / %
Blockly.Arduino.ORDER_ADDITIVE = 4; // + -
Blockly.Arduino.ORDER_SHIFT = 5; // << >>
Blockly.Arduino.ORDER_RELATIONAL = 6; // < <= > >=
Blockly.Arduino.ORDER_EQUALITY = 7; // == !=
Blockly.Arduino.ORDER_BITWISE_AND = 8; // &
Blockly.Arduino.ORDER_BITWISE_XOR = 9; // ^
Blockly.Arduino.ORDER_BITWISE_OR = 10; // |
Blockly.Arduino.ORDER_LOGICAL_AND = 11; // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 12; // ||
Blockly.Arduino.ORDER_CONDITIONAL = 13; // expr ? expr : expr
Blockly.Arduino.ORDER_ASSIGNMENT = 14; // = += -= *= /= %= <<= >>= &= ^= |=
Blockly.Arduino.ORDER_COMMA = 15; // ,
Blockly.Arduino.ORDER_NONE = 99; // Do not wrap.

// --- Custom Block Generators ---

// arduino_setup
Blockly.Arduino['arduino_setup'] = function(block) {
    // Get code from the 'DO' statement input
    var statements_do = Blockly.Arduino.statementToCode(block, 'DO');
    // Ensure all code in setup is correctly indented
    return 'void setup() {\n' + statements_do + '}\n';
};

// arduino_loop
Blockly.Arduino['arduino_loop'] = function(block) {
    // Get code from the 'DO' statement input
    var statements_do = Blockly.Arduino.statementToCode(block, 'DO');
    // Ensure all code in loop is correctly indented
    return 'void loop() {\n' + statements_do + '}\n';
};

// arduino_digital_write
Blockly.Arduino['arduino_digital_write'] = function(block) {
    // Get the value of the 'PIN' input (can be a number or another block)
    var pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '0';
    // Get the value of the 'STATE' input (can be HIGH/LOW, true/false, 1/0)
    var state = Blockly.Arduino.valueToCode(block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
    return 'digitalWrite(' + pin + ', ' + state + ');\n';
};

// arduino_digital_read
Blockly.Arduino['arduino_digital_read'] = function(block) {
    // Get the value of the 'PIN' input
    var pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '0';
    // Return the C++ code and its precedence
    return ['digitalRead(' + pin + ')', Blockly.Arduino.ORDER_ATOMIC];
};

// arduino_math
Blockly.Arduino['arduino_math'] = function(block) {
    var argument0 = Blockly.Arduino.valueToCode(block, 'A', Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
    var operator = block.getFieldValue('OPERATOR');
    var argument1 = Blockly.Arduino.valueToCode(block, 'B', Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
};


// arduino_repeat (for loop)
Blockly.Arduino['arduino_repeat'] = function(block) {
    // Get the value of the 'COUNT' input
    var count = Blockly.Arduino.valueToCode(block, 'COUNT', Blockly.Arduino.ORDER_ATOMIC) || '0';
    // Get code from the 'DO' statement input
    var branch = Blockly.Arduino.statementToCode(block, 'DO');
    // Generate the for loop structure
    var code = 'for (int i = 0; i < ' + count + '; i++) {\n' + branch + '}\n';
    return code;
};

// arduino_serial_begin
Blockly.Arduino['arduino_serial_begin'] = function(block) {
    // Get the value of the 'BAUD' input
    var baud = Blockly.Arduino.valueToCode(block, 'BAUD', Blockly.Arduino.ORDER_ATOMIC) || '9600';
    return 'Serial.begin(' + baud + ');\n';
};

// arduino_serial_print
Blockly.Arduino['arduino_serial_print'] = function(block) {
    // Get the value of the 'TEXT' input (can be a string, number, variable, etc.)
    var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '""';
    return 'Serial.println(' + text + ');\n';
};

// --- Helper Functions (often included in a full generator, but good to know) ---

// This function is usually called by the Blockly.Generator base class
// to get the entire generated code, including includes, definitions, setup, and loop.
// For this barebones version, we just generate the setup and loop functions.
Blockly.Arduino.finish = function(code) {
    // This is where you would typically add global declarations, includes, etc.
    // For now, we'll just return the main setup and loop code.

    // You might also want to ensure that 'void setup()' and 'void loop()'
    // are present even if the blocks aren't used.
    // However, for a barebones setup, we rely on the user dragging them in.

    // A simple approach if you need global definitions, e.g. for pinMode:
    // Blockly.Arduino.addSetup('setup_pin_mode', 'pinMode(13, OUTPUT);');

    var allCode =
        Blockly.Arduino.definitions_['variables'] + '\n' +
        Blockly.Arduino.definitions_['declarations'] + '\n' +
        Blockly.Arduino.definitions_['functions'] + '\n\n' +
        code; // This `code` variable contains the generated setup/loop blocks.

    // You might want to handle global definitions and includes here.
    // For barebones, we'll just return the generated setup and loop functions.
    return allCode;
};

// Placeholder for init function. In a full generator, you might reset state here.
Blockly.Arduino.init = function(workspace) {
    // Create a dictionary of definitions to be printed at the top of the code.
    Blockly.Arduino.definitions_ = Object.create(null);
    // Create a dictionary of code to be inserted in the 'setup()' function.
    Blockly.Arduino.setups_ = Object.create(null);
};

// Placeholder for valueToCode (already used above, but part of the generator API)
// Blockly.Arduino.valueToCode = function(block, name, order) { /* ... */ };

// Placeholder for statementToCode (already used above, but part of the generator API)
// Blockly.Arduino.statementToCode = function(block, name) { /* ... */ };