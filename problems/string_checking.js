import {LinkedListStack} from "../stacks";

export function reverseStringWithStack(str) {
    const stack = new LinkedListStack();
    if (str.length < 2) {
        return str;
    }
    for (const char of str) {
        stack.push(char);
    }
    let result = '';
    while (!stack.isEmpty()) {
        result += stack.pop();
    }
    return result;
}

export function parenthesisCheckerWithStack(str) {
    const stack = new LinkedListStack();
    if (!str.length) {
        return true;
    }
    for (const char of str) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else if (char === ')' || char === '}' || char === ']') {
            const last = stack.pop();
            if (char === ')' && last !== '(') {
                return false;
            }
            if (char === '}' && last !== '{') {
                return false;
            }
            if (char === ']' && last !== '[') {
                return false;
            }
        }
    }
    return stack.isEmpty();
}