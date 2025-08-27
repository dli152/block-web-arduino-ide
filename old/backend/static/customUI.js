document.addEventListener('DOMContentLoaded', function () {
    // Wait for Blockly to render the toolbox
    function injectButton() {
        // Blockly injects the toolbox with class 'blocklyToolboxDiv'
        const toolboxDiv = document.querySelector('.blocklyToolboxDiv');
        if (!toolboxDiv) {
            // Try again if not yet rendered
            setTimeout(injectButton, 100);
            return;
        }

        // Prevent duplicate button
        if (toolboxDiv.querySelector('#custom-toolbox-btn')) return;

        // Create the button
        const btn = document.createElement('button');
        btn.id = 'custom-toolbox-btn';
        btn.textContent = 'Custom Toolbox Action';
        btn.style.width = '90%';
        btn.style.margin = '10px 5% 10px 5%';
        btn.style.padding = '8px';
        btn.style.background = '#4CAF50';
        btn.style.color = '#fff';
        btn.style.border = 'none';
        btn.style.borderRadius = '4px';
        btn.style.cursor = 'pointer';

        // Example click handler
        btn.onclick = function () {
            alert('Custom toolbox button clicked!');
        };

        // Insert at the bottom of the toolbox
        toolboxDiv.appendChild(btn);
    }

    injectButton();
});