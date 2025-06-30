
/**
 * Group courses by a label
 * @param courses {Course[]}
 * @param getKey {(course: Course) => string}
 * @returns {*}
 */
function groupCoursesByLabel(courses, getKey) {

    return courses.reduce(function (prev, course) {

        const key = getKey(course);
        const group = prev[key] || [];

        return {...prev, [key]: [...group, course]};
    }, {});
}

/**
 *
 * @param courses { Course[] }
 * @param keyword { string }
 * @param getLabels { (course: Course) => string[]} A callback function to
 * return the list of values that should be searched
 */
function searchCoursesByKeyword(courses, keyword, getLabels) {

    if (! (keyword = keyword.trim())) return courses;
    return courses.filter((course) => {
        const labels = getLabels(course);
        const searchPattern = new RegExp(`${keyword}`, 'i');

        return labels.some((value) => searchPattern.test(value));
    });
}

/**
 *
 * @returns {{
 *      searchCoursesByKeyword: ((function(Course[], string, function(Course): string[]): (Course[]))|*),
 *      groupCoursesByLabel: (function(Course[], function(Course): string): *)
 *  }}
 */
export const useCourse = () => ({
    groupCoursesByLabel,
    searchCoursesByKeyword
});
