# timetable-server

A small NodeJS server application with a MySQL database, made as a laboratory work while studying at university.

To receive data in xml format, the corresponding address must be entered in the address bar:

1. [http://localhost:1337/classrooms](http://localhost:1337/classrooms "http://localhost:1337/classrooms") - information about classrooms.
2. [http://localhost:1337/groups](http://localhost:1337/groups "http://localhost:1337/groups") - information about groups.
3. [http://localhost:1337/teachers](http://localhost:1337/teachers "http://localhost:1337/teachers") - information about teachers.
4. [http://localhost:1337/timetable](http://localhost:1337/timetable "http://localhost:1337/timetable") – timetable.

Moreover, the output at [http://localhost:1337/timetable](http://localhost:1337/timetable "http://localhost:1337/timetable") can be filtered by adding a parameter to the url request.

1. To filter the output by group number, use the “Group_number” parameter, for example: [http://localhost:1337/timetable?Group_number=3301](http://localhost:1337/timetable?Group_number=3301 "http://localhost:1337/timetable?Group_number=3301")
2. To filter the output by classroom number, use the “Classroom_num” parameter, for example: [http://localhost:1337/timetable?Classroom_num=201](http://localhost:1337/timetable?Classroom_num=201 "http://localhost:1337/timetable?Classroom_num=201")
3. To filter the output by teacher name, use the “Name” parameter, for example: [http://localhost:1337/timetable?Name=Ivanov%20Ivan%20Ivanovich](http://localhost:1337/timetable?Name=Ivanov%20Ivan%20Ivanovich "http://localhost:1337/timetable?Name=Ivanov%20Ivan%20Ivanovich")
4. To filter the output by subject, use the “Subject_name” parameter, for example: [http://localhost:1337/timetable?Subject_name=Algebra](http://localhost:1337/timetable?Subject_name=Algebra "http://localhost:1337/timetable?Subject_name=Algebra")

If there are no parameters or incorrect parameters were sent, the full timetable is displayed.

Only the first parameter sent is considered, other parameters are ignored.
