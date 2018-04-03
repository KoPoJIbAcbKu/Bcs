function getDate(date) {
    if (date == null) return true;
    switch (typeof date)
    {
        case "undefined":
            return true;
            break;
        case "function":
            return getDate(date());
            break;
        case "boolean":
            return true;
            break;
        case "number":
            return new Date(date);
            break;
        case "object":
            switch (toString.call(date)) {
                case "[object Date]":
                    return date;
                    break;
                case "[object Object]":
                    try {
                        return getDate(date.val());
                    } catch (e) {

                    }
                    break;
            }
            break;
        case "string":
            if (date == '') return true;
            var values = date.split('.');
            return new Date(parseInt(values[2]), parseInt(values[1]) - 1, parseInt(values[0]));
            break;
    }
}

function BigThan(date, date2) {
    date = getDate(date);
    date2 = getDate(date2);
    if (date == true || date2 == true) return true;
    if (date > date2) return true;
    return false;
}

function BigThanOrEqual(date, date2) {
    date = getDate(date);
    date2 = getDate(date2);
    if (date == true || date2 == true) return true;
    if (date >= date2) return true;
    return false;
}

function LessThen(date, date2) {
    date = getDate(date);
    date2 = getDate(date2);
    if (date == true || date2 == true) return true;
    if (date < date2) return true;
    return false;
}

function LessThenOrEqual(date, date2) {
    date = getDate(date);
    date2 = getDate(date2);
    if (date == true || date2 == true) return true;
    if (date <= date2) return true;
    return false;
}

function Equal(date, date2) {
    date = getDate(date);
    date2 = getDate(date2);
    if (date == true || date2 == true) return true;
    if (date = date2) return true;
    return false;
}


