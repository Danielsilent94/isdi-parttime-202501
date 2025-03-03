var names = ['Juan', ['Francisco', 'Loli', ['Dante', 'Germán']], 'Diana', ['Gonzalo', 'Angel', ['María', 'David']], 'Sonia', ['Lidia', 'Tere', ['Amira', 'Telma']], 'Marta'];

function myFlat(array, deepIndex = 1) {
    var resultArray = []; 
    var deep = 0;

    while (deep < deepIndex) {
        var provisionalArray = []; 

        for (var i = 0; i < array.length; i++) {
            
            if (array[i].constructor !== Array) {
                provisionalArray[provisionalArray.length] = array[i];
            } else {
                
                for (var j = 0; j < array[i].length; j++) {
                    if (array[i][j].constructor !== Array) {
                        provisionalArray[provisionalArray.length] = array[i][j];
                    } else {
                        
                        for (var k = 0; k < array[i][j].length; k++) {
                            provisionalArray[provisionalArray.length] = array[i][j][k];
                        }
                    }
                }
            }
        }

        
        array = provisionalArray;

        deep++; 
    }

    
    return array;
}

console.log(myFlat(names, 1)); 
console.log(myFlat(names, 2)); 
console.log(myFlat(names, 3)); 
