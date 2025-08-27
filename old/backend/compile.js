function tokenize(code) {
    const keywords = ['int', 'void', 'return', 'if', 'else', 'for', 'while', 'setup', 'loop'];
    const operators = ['=', '==', '!=', '<', '>', '+', '-', '*', '/', '&&', '||'];
    const punctuation = [';', ',', '(', ')', '{', '}'];
    
    const tokens = [];
    const regex = /\s*([A-Za-z_]\w*|\d+|==|!=|&&|\|\||[=+\-*/<>{}(),;])\s*/g;
    let match;
  
    while ((match = regex.exec(code)) !== null) {
      const value = match[1];
  
      if (keywords.includes(value)) {
        tokens.push({ type: 'keyword', value });
      } else if (operators.includes(value)) {
        tokens.push({ type: 'operator', value });
      } else if (punctuation.includes(value)) {
        tokens.push({ type: 'punctuation', value });
      } else if (/^\d+$/.test(value)) {
        tokens.push({ type: 'number', value });
      } else {
        tokens.push({ type: 'identifier', value });
      }
    }
  
    return tokens;
}  