---
title: Introduction to Bash Scripting
date:   2018-06-28 01:00:00
layout: post
tag:
- Computer Science
category: blog
author: chrishyland
description: Crash course on Bash Scripting.
---
# How to write bash scripts

First we need to define some definitions:

*Terminal*: What is used to take in input and print output. However, the terminal doesn't know what to do with this.
*Shell*: The shell interprets what the user types in and executes those commands. We can also use the python interpretor shell to run commands.
*Bash*: Type of shell program. This is the default on lots of systems. Bash came from sh (shell command language) but now has more features.

Bash is for small task automation. Not necessary for large scale software development. If more than 50 lines of code, recommended to use other languages.

```bash
echo "Hello"
```
Returns standard out. If we want to store it, we can _redirect_ it into another file.

```bash
echo "Hello" > new.txt  # use >> to append to a file.
```

We can count the number of lines in a file by the _wc_ command.
```bash
wc -l < file.txt
```
The flow of data is reverse here since the file on the right is going in as the input to the command on the left. The -l flag will count the number of lines in the code. A more conventional and intuitive way of doing this is going:
```bash
cat file.txt | wc -l
```
This pipes the output of the cat command as the input for the wc command.

We can execute multiple commands with the && command. 
```bash
cat file.txt | wc -l && echo "It worked!"
```
The latter half of the code after the && will only execute if the first half executes correctly. We can use conditional execution using ||.

## Variables and Quoting
Whenever we have a \$, that denotes a *variable* in bash scripting. When denoting environment variables, or variables outside of the program, we denote them with capital letters such as $HOME.
```bash
echo $HOME
```
To initialise a variable, we can go:
```bash
myvar="I like potatos"
```
*DO NOT HAVE SPACES WHEN DOING THIS. SHELL WILL THINK IT'S A BUNCH OF COMMANDS.*
We can then call that variable by going:
```bash
echo $myvar
```
To concatenate variables, we can go:
```bash
number=5
echo "This is my ${number}th pair of headphones.
```

We can also do command substitution whereby we include the output of the command in what we are working with. This can be substituted in with the `` symbols.
```bash
echo "There are `cat file.txt | wc -l` number of files in the file"
```


To know which bash we are using, we can go:
```bash
which bash
```

Bash scripts should start with:
```bash
#!bin/src
#!bin/bash
```
We can use either src or bash (for my purposes, I'll use bash). The # indicates a comment and the bin/bash part will tell the path to the bash binary executable. This is for the kernal. This is known as *shebang*. Naming things with .sh at the end doesn't actually matter for Linux operating systems but is good practice and helps other people figure out what is going on.

Exit code 0 means there is no error with the code being executed.

We can include 
```bash
exit $?
```
At the end, similar to return 0 in C.

We need to change the file mode to run shell scripts to be executable as well.
```bash
chmod +x myscript.sh
```
We can run shell scripts in 3 different manners:
```bash
./myscript.sh
bash myscript.sh
source myscript.sh
```

We can also pass in arguments to our file. Note that the first argument is the name of the script.
```bash
ourfilename=$0
echo $ourfilename # name of file
```
For numerous arguments, we can go:
```bash
arg1=$1
arg2=$
echo "Our arguments are ${arg1} and ${arg2}:
```

## Control Flows
```bash
X="Dog"
if [ "$X" = "Dog" ]; then
    echo "Hello"
fi
    echo "Bye"
```

We can have multiple conditions for the logic flow:
```bash
if [ "$X" = "Dog" ]; then
    echo "Hi"
elif [ "$X" = "Cat"]; then
    echo "I hate cats"
else
    echo "Nevermind!"
fi
```

We use the symbol -lt as the less than sign. Hence, we can test whether has there been a certain number of variables passed into the code. The list for binary opeartors are:
-eq (Check if they are equal)
-ne (Check if they are not equal)
-gt (Check if the LHS is greater than the RHS)
-ge (Check if the LHS is greater than or equal to RHS)
-lt (Check if the LHS is less than the RHS)
-le (Check if the LHS is less than or equal to the RHS)

```bash
arguments_needed=5
if [ $# -lt arguments_needed ]; then
    echo "Not enough arguments."
fi
```
The \$# counts the number of arguments being passed into the script.

We can also use || again.
```bash
echo "Hello" || echo "Bye"
```
Here, we only execute the LHS since that is true and it won't bothered running the RHS. If the LHS was not true, then the RHS will execute instead.
```bash
if [ "$str1" != "$str2" ]; then
    echo "${str1} is the same as ${str2}"
fi
```

To check if something is *not null*, we can use -n. To check if length is 0, then we can use *-z*.
```bash
if [ -n "$word" ]; then
    echo "This word is not null!"
if [ -z "word" ]; then
    echo "The length of the string is 0!"
fi
```

## Functions

If we want to use *for loops*, we go:
```bash
for arg in "$@"; do
    echo "$arg"
done
```
\$@ symbol is an array containing all the arguments passed into the file. Hence, arg will iterate through the array.

We define functions by going:
```bash
function mycode (){
    echo "Hi there $1" # The $1 refers to the second arguments passed into this function specifically.
}

function runcode (){
    mycode chris   # in bash, you don't have () to pass in arguments for functions
}
```
The runcode function will call the mycode function and the argument passed in is chris.

## Input
We can read input in with the read command.
```bash
read varname
echo "Hey there ${varname}"
```
The tr utility copies the given input to produce output with substitution or deletion of selected characters. tr stands for translated/transliterate. It takes 2 sets of characters and replaces the first ones with the latter ones.
```bash
echo 'linux' | tr "[:lower:]" "[:upper:]"
echo 'linux' | tr "a-z" "A-Z"
```
These two lines are equivalent. 
```bash
echo 'linux' | tr l q  # this will print out qinux
```
We can also translate characters around.
```bash
echo "linux" | tr ['a-z'] ['c-z']
```
This will shift everything two characters down. To make sure it works for when we go past the letter z, we go:
```bash
echo "linux" | tr ['a-z'] ['n-za-m'] # This will shift it by 13 spots
```
To make it case insensitive:
```bash
#!bin/src
read varname
echo "${varname}" | tr [A-Za-z] [N-ZA-Mn-za-m]
```
We can manipulate for loops like we would in Python
```bash
for file_var in `ls`; do
    echo file: $file_var
done
```
This prints out all the files in the current directory.

To keep on processing things as long user gives input, we go:
```bash
while [ true ]; do
    read varname
    if [-z "$varname" ]; then
        break
    fi
    # Command to do stuff
done
```
This will continuously run stuff until user stops giving in input.

We can also traverse directories using cd etc in Bash. This will take in a folder as first argument and the file extension to search for.
```bash
#!bin/src
cd ${1}
ls | grep -i ${2}$
```


