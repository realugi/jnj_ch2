// ESM syntax is supported.

const input = `
ID;Name;Subject;Grade
1;Yu Lake;Math;2
2;Ho Berger;Math;3
3;Klaudia Bean;Science;1
4;Dougie Mitchell;English;1
5;Zain Houghton;English;2
6;Tabita Griffiths;Math;3
`;

let students = input.split('\n')
    // skips following:
    // - first empty line
    // - CSV header definition
    // - last empty line
    .slice(2, -1)
    // map CSV elements to js object
    .map((e) => {
        let elems = e.split(';');
        return { 
            id: elems[0], 
            name: elems[1],
            subject: elems[2],
            grade: parseInt(elems[3])
        };
    })

// group by subject
let subjectGroup = {};
students.forEach((student, i, students) => {
    if (!Object.keys(subjectGroup).includes(student.subject)) {
        subjectGroup[student.subject] = [];
    }
    subjectGroup[student.subject].push(student);
})

let result = Object.values(subjectGroup)
    // apply set transformations to subject group arrays and reduce them to single object
    .map((s) => {
        return {
            subject: s[0].subject, 
            student_count: s.length, 
            grade_avg: s.reduce((t, e) => t + e.grade, 0) / s.length
        };
    })
    // sort by student_count descending
    .sort((a, b) => b.student_count - a.student_count);

result.forEach(r => {
    console.log('name of subject: ' + r.subject 
        + ', number of students: ' + r.student_count
        + ', average grade: ' + r.grade_avg)
})

export {}
