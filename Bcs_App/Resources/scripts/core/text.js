var codePages = {};
codePages.en = { '8': 'backspace', '9': 'tab', '13': 'enter', '16': 'shift', '17': 'ctrl', '18': 'alt', '19': 'pause/break', '20': 'caps lock', '27': 'escape', '33': 'page up', '34': 'page down', '35': 'end', '36': 'home', '37': 'left arrow', '38': 'up arrow', '39': 'right arrow', '40': 'down arrow', '45': 'insert', '46': 'delete', '48': '0', '49': '1', '50': '2', '51': '3', '52': '4', '53': '5', '54': '6', '55': '7', '56': '8', '57': '9', '65': 'a', '66': 'b', '67': 'c', '68': 'd', '69': 'e', '70': 'f', '71': 'g', '72': 'h', '73': 'i', '74': 'j', '75': 'k', '76': 'l', '77': 'm', '78': 'n', '79': 'o', '80': 'p', '81': 'q', '82': 'r', '83': 's', '84': 't', '85': 'u', '86': 'v', '87': 'w', '88': 'x', '89': 'y', '90': 'z', '91': 'left window key', '92': 'right window key', '93': 'select key', '96': 'numpad 0', '97': 'numpad 1', '98': 'numpad 2', '99': 'numpad 3', '100': 'numpad 4', '101': 'numpad 5', '102': 'numpad 6', '103': 'numpad 7', '104': 'numpad 8', '105': 'numpad 9', '106': 'multiply', '107': 'add', '109': 'subtract', '110': 'decimal point', '111': 'divide', '112': 'f1', '113': 'f2', '114': 'f3', '115': 'f4', '116': 'f5', '117': 'f6', '118': 'f7', '119': 'f8', '120': 'f9', '121': 'f10', '122': 'f11', '123': 'f12', '144': 'num lock', '145': 'scroll lock', '186': 'semi-colon', '187': 'equal sign', '188': 'comma', '189': 'dash', '190': 'period', '191': 'forward slash', '192': 'grave accent', '219': 'open bracket', '220': 'back slash', '221': 'close braket', '222': 'single quote', };
codePages.ru = { '8': 'backspace', '9': 'tab', '13': 'enter', '16': 'shift', '17': 'ctrl', '18': 'alt', '19': 'pause/break', '20': 'caps lock', '27': 'escape', '33': 'page up', '34': 'page down', '35': 'end', '36': 'home', '37': 'left arrow', '38': 'up arrow', '39': 'right arrow', '40': 'down arrow', '45': 'insert', '46': 'delete', '48': '0', '49': '1', '50': '2', '51': '3', '52': '4', '53': '5', '54': '6', '55': '7', '56': '8', '57': '9', '65': 'a', '66': 'b', '67': 'c', '68': 'd', '69': 'e', '70': 'f', '71': 'g', '72': 'h', '73': 'i', '74': 'j', '75': 'k', '76': 'l', '77': 'm', '78': 'n', '79': 'o', '80': 'p', '81': 'q', '82': 'r', '83': 's', '84': 't', '85': 'u', '86': 'v', '87': 'w', '88': 'x', '89': 'y', '90': 'z', '91': 'left window key', '92': 'right window key', '93': 'select key', '96': 'numpad 0', '97': 'numpad 1', '98': 'numpad 2', '99': 'numpad 3', '100': 'numpad 4', '101': 'numpad 5', '102': 'numpad 6', '103': 'numpad 7', '104': 'numpad 8', '105': 'numpad 9', '106': 'multiply', '107': 'add', '109': 'subtract', '110': 'decimal point', '111': 'divide', '112': 'f1', '113': 'f2', '114': 'f3', '115': 'f4', '116': 'f5', '117': 'f6', '118': 'f7', '119': 'f8', '120': 'f9', '121': 'f10', '122': 'f11', '123': 'f12', '144': 'num lock', '145': 'scroll lock', '186': 'semi-colon', '187': 'equal sign', '188': 'comma', '189': 'dash', '190': 'period', '191': 'forward slash', '192': 'grave accent', '219': 'open bracket', '220': 'back slash', '221': 'close braket', '222': 'single quote', };

codePages.google = { '8': 'Backspace', '9': 'Tab', '13': 'Enter', '16': 'ShiftLeft', '17': 'ControlLeft', '18': 'AltLeft', '19': 'Pause', '20': 'CapsLock', '27': 'Escape', '32': 'Space', '33': 'PageUp', '34': 'PageDown', '35': 'End', '36': 'Home', '37': 'ArrowLeft', '38': 'ArrowUp', '39': 'ArrowRight', '40': 'ArrowDown', '45': 'Insert', '46': 'Delete', '48': 'Digit0', '49': 'Digit1', '50': 'Digit2', '51': 'Digit3', '52': 'Digit4', '53': 'Digit5', '54': 'Digit6', '55': 'Digit7', '56': 'Digit8', '57': 'Digit9', '65': 'KeyA', '66': 'KeyB', '67': 'KeyC', '68': 'KeyD', '69': 'KeyE', '70': 'KeyF', '71': 'KeyG', '72': 'KeyH', '73': 'KeyI', '74': 'KeyJ', '75': 'KeyK', '76': 'KeyL', '77': 'KeyM', '78': 'KeyN', '79': 'KeyO', '80': 'KeyP', '81': 'KeyQ', '82': 'KeyR', '83': 'KeyS', '84': 'KeyT', '85': 'KeyU', '86': 'KeyV', '87': 'KeyW', '88': 'KeyX', '89': 'KeyY', '90': 'KeyZ', '91': 'MetaLeft', '92': 'MetaRight', '93': 'ContextMenu', '96': 'Numpad0', '97': 'Numpad1', '98': 'Numpad2', '99': 'Numpad3', '100': 'Numpad4', '101': 'Numpad5', '102': 'Numpad6', '103': 'Numpad7', '104': 'Numpad8', '105': 'Numpad9', '106': 'NumpadMultiply', '107': 'NumpadAdd', '109': 'NumpadSubtract', '110': 'NumpadDecimal', '111': 'NumpadDivide', '112': 'F1', '113': 'F2', '114': 'F3', '115': 'F4', '116': 'F5', '117': 'F6', '118': 'F7', '119': 'F8', '120': 'F9', '121': 'F10', '122': 'F11', '123': 'F12', '144': 'NumLock', '145': 'ScrollLock', '186': 'Semicolon', '187': 'Equal', '188': 'Comma', '189': 'Minus', '190': 'Period', '191': 'Slash', '192': 'Backquote', '219': 'BracketLeft', '220': 'Backslash', '221': 'BracketRight', '222': 'Quote' };
codePages.systems = { '8': 'Backspace', '9': 'Tab', '13': 'Enter', '16': 'ShiftLeft', '17': 'ControlLeft', '18': 'AltLeft', '19': 'Pause', '20': 'CapsLock', '27': 'Escape', '33': 'PageUp', '34': 'PageDown', '35': 'End', '36': 'Home', '37': 'ArrowLeft', '38': 'ArrowUp', '39': 'ArrowRight', '40': 'ArrowDown', '45': 'Insert', '46': 'Delete', '91': 'MetaLeft', '92': 'MetaRight', '93': 'ContextMenu', '112': 'F1', '113': 'F2', '114': 'F3', '115': 'F4', '116': 'F5', '117': 'F6', '118': 'F7', '119': 'F8', '120': 'F9', '121': 'F10', '122': 'F11', '123': 'F12', '144': 'NumLock', '145': 'ScrollLock' };

codePages.numbers = { '48': '0', '49': '1', '50': '2', '51': '3', '52': '4', '53': '5', '54': '6', '55': '7', '56': '8', '57': '9', '96': '0', '97': '1', '98': '2', '99': '3', '100': '4', '101': '5', '102': '6', '103': '7', '104': '8', '105': '9' };
codePages.numbersCode = { '48': 'Digit0', '49': 'Digit1', '50': 'Digit2', '51': 'Digit3', '52': 'Digit4', '53': 'Digit5', '54': 'Digit6', '55': 'Digit7', '56': 'Digit8', '57': 'Digit9', '96': 'Numpad0', '97': 'Numpad1', '98': 'Numpad2', '99': 'Numpad3', '100': 'Numpad4', '101': 'Numpad5', '102': 'Numpad6', '103': 'Numpad7', '104': 'Numpad8', '105': 'Numpad9' };
codePages.rus = { '65': 'ф', '66': 'и', '67': 'с', '68': 'в', '69': 'у', '70': 'а', '71': 'п', '72': 'р', '73': 'ш', '74': 'о', '75': 'л', '76': 'д', '77': 'ь', '78': 'т', '79': 'щ', '80': 'з', '81': 'й', '82': 'к', '83': 'ы', '84': 'е', '85': 'г', '86': 'м', '87': 'ц', '88': 'ч', '89': 'н', '90': 'я', '186': 'ж', '188': 'б', '190': 'ю', '192': 'ё', '219': 'х', '221': 'ъ', '222': 'э' };

codePages.spec = { '-1': ' ', '-2': '-', '-3': '\'', '-4': 'i', '-5': 'v', '-6': 'x' }

codePages.spec2 = { '-7': '.' }

function containSymbol(symb, page) {
    for (var c in page) {
        if (page[c] == symb) return true;
    }
    return false;
}

function containCode(code, page) {
    for (var c in page) {
        if (c == code) return true;
    }
    return false;
}

function append(c, name) {
    if (codePages.rus[c] === undefined) {
        codePages.rus[c] = name;
    }
}

function registry(reg, val) {
    if (reg == 'first') {
        var oldval = val;
        var newval = '';
        var vals = oldval.split(/\s* \s*|\s*-\s*/);
        $(vals).each(function (i, item) {
            if (item != '') {
                newval += item[0].toUpperCase() + item.substr(1).toLowerCase();
                if (i < vals.length - 1) newval += oldval[newval.length];
            }
        })
        return newval.replace(/i/g, 'I').replace(/x/g, 'X').replace(/v/g, 'V');
    } else if (reg == 'all') {
        return val.toUpperCase();
    }
}

function multiPages(name) {
    var names = name.split(',');
    if (names.length > 1) {
        var resultObj = {};
        for (var i in names) {
            for (var c in codePages[names[i]]) {
                resultObj[c] = codePages[names[i]][c];
            }
        }
        return resultObj;
    }
    else return codePages[names[0]];
}

$(document).ready(function () {
    $('[data-format]').bind("paste", function(e){
        var str = e.originalEvent.clipboardData.getData('text');
        for (var c in str) {
            if (containSymbol(str[c].toLowerCase(), multiPages($(this).attr('data-format')))) {
                var start = $(this)[0].selectionStart;
                var end = $(this)[0].selectionEnd;
                $(this).val($(this).val().substr(0, start) + str[c] + $(this).val().substr(end));
                $(this)[0].selectionStart = start + 1;
                $(this)[0].selectionEnd = start + 1;
            }
        }

        if ($(this).attr('data-format-registry')) {
            $(this).val(registry($(this).attr('data-format-registry'), $(this).val()));
        }
        return false;
    })
    
    $('[data-required]').keydown(function () {
        if ($(this).closest('.textbox-group').hasClass('error')) {
            $(this).closest('.textbox-group').removeClass('error')
        }
    })
    $('.datepicker').change(function () {
        if ($(this).closest('.textbox-group').hasClass('error')) {
            $(this).closest('.textbox-group').removeClass('error')
        }
    })
    $('[data-dictionary]').change(function () {
        if ($(this).closest('.textbox-group').hasClass('error')) {
            $(this).closest('.textbox-group').removeClass('error')
        }
    })
    $('[data-format]').keydown(function (e) {
        if (containCode(e.keyCode, codePages.systems) || e.ctrlKey) {
        } else {
            //console.log(e);
            //var key = codePages[$(this).attr('data-format')][e.keyCode];
            //append(e.keyCode, e.key);
            if (containSymbol(e.key.toLowerCase(), multiPages($(this).attr('data-format')))) {
                var start = $(this)[0].selectionStart;
                var end = $(this)[0].selectionEnd;
                $(this).val($(this).val().substr(0, start) + e.key + $(this).val().substr(end));
                $(this)[0].selectionStart = start + 1;
                $(this)[0].selectionEnd = start + 1;
            }

            if ($(this).attr('data-format-registry')) {
                $(this).val(registry($(this).attr('data-format-registry'), $(this).val()));
            }
            e.preventDefault(true);
            return false;
        }
    });
})