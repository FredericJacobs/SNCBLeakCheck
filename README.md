SNCBLeakCheck
=============

SNCB Leak Checker is a simple lookup application that was used to lookup your personal information in the leaked SNCB database in a way that respects privacy of everyone.

## What ?

This application is code that powered the lookup tool. No magic here, it's just an application that searches in a database and returns results.

The data is not provided. (and don't ask for it, I don't have it anymore, now try to prove that one ;) )

It's completely written in NodeJS and uses MongoDB for the database layer.

Please consider the fact that this utility has been coded in a few hours and that it may not respect all coding conventions.

## I have the data, how can I use it ?

If you have the file, first run this command in a UNIX based environment. This will change the encoding of the SNCB file to Unicode.

	iconv -f latin1 -t UTF-8 from.tsv > to.tsv

Now you need to import it in MongoDB.

	mongoimport --db SNCB --collection passengers --type tsp --file /PATH_TO_THE_TSV

Then hash the emails to MD5 and replace all information that are not names to booleans.

Install node and run the app

	node app

## MIT-Licensed 

Copyright (c) 2013 Frederic Jacobs

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.