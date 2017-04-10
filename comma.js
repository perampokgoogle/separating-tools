    function column_to_delimited(input, character) {

        var result = replaceAll("\n", character, input).trim();

        while (result.trim().substr(result.length - 1) === character)
            result = result.slice(0, -1);

        while (result.trim().charAt(0) === character)
            result = result.substring(1);

        return result;
    }

    function delimited_to_column(input, character) {

        var result = replaceAll(character,"\n", input).trim();

        while (result.trim().substr(result.length - 1) === "\n")
            result = result.slice(0, -1);

        while (result.trim().charAt(0) === "\n")
            result = result.substring(1);

        return result;
    }





    function convert(input) {

        return column_to_delimited(input, ',');
    }


    
    function replaceAll(find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    function beautify(str) {


        var result = '';

        var length = str.length;

        var i = 0;

        var braceCountLeft = 0;
        var braceCountRight = 0;

        var withinQuotes = false;

        while (i < length) {

            var c = str[i];

            if (c == '"' && (i == 0 || c[i - 1] != '\\')) {
                // non-escaped quotes
                withinQuotes = !withinQuotes;
            }

            if (!withinQuotes && (c == '}' || c == '{' || c == ',')) {

                console.log('Start####' + result);

                // look back and remove carriage returns and whitespace that are already there

                var resultIndex = result.length - 1;
                while (resultIndex >= 0 && (result[resultIndex] == ' ' || result[resultIndex] == '\r' || result[resultIndex] == '\n' || result[resultIndex] == '\t')) {

                    resultIndex = resultIndex - 1;
                    result = result.substr(0, resultIndex + 1);

                    console.log('char ' + result[resultIndex] + '-----' + result + 'zzz ' + result.length + ' ' + resultIndex);

                }


                if (c == '{') {
                    braceCountLeft++;
                    result += c + '\r' + GetTabs(braceCountLeft - braceCountRight);
                } else if (c == '}') {
                    braceCountRight++;
                    // precede with carriage return
                    result += '\r' + GetTabs(braceCountLeft - braceCountRight) + c;
                } else if (c == ',') {
                    result += c + '\r' + GetTabs(braceCountLeft - braceCountRight);
                }

                var nextChar = '';

                // advance through whitespace and remove carriage returns that are already there
                while (i < length && (str[i + 1] == ' ' || str[i + 1] == '\r' || str[i + 1] == '\n' || str[i + 1] == '\t')) {
                    i++;
                }

            } else {

                result += str[i];

            }


            i++;

        }

        return result;

    }

    function GetTabs(count) {

        var result = '';

        for (var i = 0; i < count; i++) {
            result += '    ';
        }

        return result;

    }
