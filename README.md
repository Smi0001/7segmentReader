
Solution for Marco Polo Instructions:
=====================================
```
function marcopolo() {
  var arr = [];
  for(var i = 1; i <= 100; i++) {
    if (i%(7*4) == 0) arr.push('marcopolo');
    else if (i%4 == 0) arr.push('marco');
    else if (i%7 == 0) arr.push('polo');
    else arr.push(i);
  }
  return arr.join(',');
}
```

How can you limit the scope on a directive and why would you do this?
=====================================================================
```
The scope on a directive can be limited by creating it as an isolated scope. It is created by defining "scope : {}" in a directive definition, in this way it is completely detached from its parent scope.

While making custom directive, we may need to have a complete independent scope that is generic and can be used anywhere in the application (independent of parent scope). In this case we need to limit the scope by isolating it.
```


# Steps to Setup the Project:

1. Download the project from https://github.com/Smi0001/task-discussion
2. This project need Node.js (if it is not yet installed, please install it from https://nodejs.org/en/download )
3. Open Node.JS command prompt, move to destination directory (to execute npm commands)
```
    For example the project folder task-discussion is located at "C:\7segmentReader"
    Then enter "cd C:\7segmentReader" (press enter) 
```
4. Enter **npm install** (press enter, this will install all dependencies of the project, and it would be ready to run).

# Step to Run the Project:

1.    Open Node.JS command prompt and execute **node index.js**
2.    After this message - *Server listening on port 5000*, open the browser, the project is available at **http://localhost:5000**


# Step to Test the Project:

1.    Open Node.JS command prompt at the same location and execute **karma start**


# 7segmentReader
Tool to read 7 segment from uploaded file and download converted readable form

# Strategy of conversion
**7 segments digits are:**
```
 _ 
| |
|_|

   
  |
  |

 _ 
 _|
|_ 
 
 _ 
 _|
 _|

   
|_|
  |

 _ 
|_ 
 _|

 _ 
|_ 
|_|

 _ 
  |
  |

 _ 
|_|
|_|

 _
|_|
 _|
```

**Make dictionary array of 0-9**
```
0 = [' _ ', '| |', '|_|']
1 = ['   ', '  |', '  |']
2 = [' _ ', ' _|', '|_ ']
3 = [' _ ', ' _|', ' _|']
4 = ['   ', '|_|', '  |']
5 = [' _ ', '|_ ', ' _|']
6 = [' _ ', '|_ ', '|_|']
7 = [' _ ', '  |', '  |']
8 = [' _ ', '|_|', '|_|']
9 = [' _ ', '|_|', ' _|']
```
make a codeMap for each of these codes against their original digit
```
let codeMap = new Map();
for (let i = 0; i < dict.length; i++) {
  codeMap.set(dict[i].join(''), i);
}

let getNum = function(segments) {
	return codeMap.get(segments); // returns num if matches else return undefined
};
```


**READ**
split by new line
get 27 chars
parse at 3 chars & fill array
```
"
 _  _  _        _     _  _ 
|_ | || |  ||_| _|  ||_ |_ 
|_||_||_|  |  | _|  | _| _|
"

parse at 3-3 chars for 3 times(lines) to store as 9 elements in an array numArray

1st line:
" _  _  _        _     _  _ "

[
 ' _ ',
 ' _ ',
 ' _ ',
 '   ',
 '   ',
 ' _ ',
 '   ',
 ' _ ',
 ' _ '
]

similarly 2nd line:
"|_ | || |  ||_| _|  ||_ |_ "

(this will concatenate to previous respective index)
[
 '|_ ',
  '| |',
  '| |',
  '  |',
  '|_|',
  ' _|',
  '  |',
  '|_ ',
  '|_ '
]

similarly 3rd line:
"|_||_||_|  |  | _|  | _| _|"

(this will concatenate to previous respective index)
[
 '|_|',
 '|_|',
 '|_|',
 '  |',
 '  |',
 ' _|',
 '  |',
 ' _|',
 ' _|'
]
```
**concatenate serially**
```
now numArray [0 to 9] is having codes of each number as an array
check *getNum(numArray[i])* for each & get the num, & write on new file sequentially for each lines
this was assuming every input is valid.

If input are not valid, then for *getNum(numArray[i]) == undefined* write any other special character for invalid *(say '?' for unknown)*
