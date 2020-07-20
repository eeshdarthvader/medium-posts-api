// https://stackoverflow.com/a/48073476/10629172
function encodeHTML(str) {
    return str.replace(/[\u00A0-\u9999<>&](?!#)/gim, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
}

function kFormatter(num) {
    return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
        : Math.sign(num) * Math.abs(num);
}

function isValidHexColor(hexColor) {
    return new RegExp(/^([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4})$/).test(
        hexColor
    );
}

function parseBoolean(value) {
    if (value === 'true') {
        return true;
    } else if (value === 'false') {
        return false;
    } else {
        return value;
    }
}

function fallbackColor(color, fallbackColor) {
    return (isValidHexColor(color) && `#${color}`) || fallbackColor;
}

module.exports = {
    renderError,
    kFormatter,
    encodeHTML,
    isValidHexColor,
    parseBoolean,
    fallbackColor
};
