// Return empty string if value is null
export function nullToEmptyString(value) {
    return value === null ? '' : value
}

// Add (s) to any string by count
export function plural(value, count) {
    return count <= 1 ? value : value + 's'
}

// Substring with ...
export function subString(string, length = 0) {
    return string.length > length ? `${string.substr(0, length)}...` : string
}

// Add dots (...) to any string by limit
export function add3Dots(string, limit = 30) {
    const dots = "...";

    if (string.length > limit) {
        string = string.substring(0, limit) + dots;
    }
    return string;
}

// Slug
export function slug(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w-]+/g, '')       // Remove all non-word chars
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '')            // Trim - from end of text
}