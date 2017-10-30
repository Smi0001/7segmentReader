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

1st line:
" _  _  _        _     _  _ "

parse at 3 chars: A1 =
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

parse at 3 chars: A2 =
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

parse at 3 chars: A3=

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
concatenate serially,
```numArray.push( A1 [0] + A2 [0] + A3[0] )	=	' _ ', '|_ ', '|_|' 	=	' _ |_ |_|'```
similarly push for i = 0 to 9
now numArray is having codes of each number as an array
check *getNum(numArray[i])* for each & get the num, & write on new file sequentially for each lines
this was assuming every input is valid.

If input are not valid, then for *getNum(numArray[i]) == undefined* write any other special character for invalid *(say '?' for unknown)*


