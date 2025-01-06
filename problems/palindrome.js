export function isPalindrome(word, start = 0, end = word.length - 1) {
    if (start >= end) {
        return true;
    } else {
        if (word[start] === word[end]) {
            return isPalindrome(word, start + 1, end - 1);
        }
        return false;
    }
}