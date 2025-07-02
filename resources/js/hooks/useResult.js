const gradeToMinimumScore = {
    A: 70, B: 60, C: 55,
    D: 50, E: 40, F: 0
};

const gradeToPoint = {
    A: 5, B: 4, C: 3,
    D: 2, E: 1, F: 0
}

/**
 *
 * @param grade 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
 * @returns { number }
 */
const getMinimumScoreForGrade = (grade) => {
    if (! (grade in gradeToMinimumScore))
        throw new Error(`Invalid grade ${grade}`);

    return gradeToMinimumScore[grade]
};

/**
 *
 * @param grade 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
 * @returns { number }
 */
const getPointFromGrade = (grade) => {
    if (! (grade in gradeToPoint))
        throw new Error(`Invalid grade ${grade}`);

    return gradeToPoint[grade];
};

/**
 * @param result { {
 *     TEST: number|null,
 *     LAB: number|null,
 *     EXAM: number|null,
 *     TOTAL: number|null,
 *     GRADE: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
 *  } }
 * @returns number
 */
const getTotalScore = (result) => {
    if ('TEST' in result && 'LAB' in result && 'EXAM' in result)
        return parseInt(result.TEST) + parseInt(result.LAB) + parseInt(result.EXAM);
    if ('TOTAL' in result) return parseInt(result.TOTAL);

    // TODO: For now, return minimum score to get the grade.
    if ('GRADE' in result) {
        try { return getMinimumScoreForGrade(result.GRADE); }
        catch (error) { return 0; }
    }
}

const getRemark = (result) => {
    return getGrade(result) !== 'F' ? 'Passed' : 'Failed';
}

/**
 *
 * @param result
 * @returns { 'A' | 'B' | 'C' | 'D' | 'E', 'F' }
 */
const getGrade = (result) => {

    const score = getTotalScore(result);
    for (const grade in gradeToMinimumScore) {
        const minimumScore = gradeToMinimumScore[grade];
        if (score >= minimumScore) return grade;
    }
    return 'F';
}

const processResult = (studentResult) => {

    const [TGP, GNU] = studentResult.reduce(
        /**
         *
         * @param prev { [number, number] }
         * @param curr { [ Course , {
         *     TEST: number|null,
         *     LAB: number|null,
         *     EXAM: number|null,
         *     TOTAL: number|null,
         *     GRADE: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
         * }] }
         * @param index
         * @returns {[number, number]}
         */
        function (prev, curr, index) {
            const [prevTGP, prevGNU] = prev;
            const [course, courseResult] = curr;

            const GP = course.unit * getPointFromGrade(getGrade(courseResult));

            return [
                prevTGP + GP,
                prevGNU + course.unit
            ];
        }, [0, 0]
    );

    return ({
        TGP,
        GNU,
        CGPA: (TGP / GNU).toFixed(2)
    })

}

export default function useResult() {

    return ({
        processResult,
        getGrade,
        getRemark,
        getPointFromGrade,
        getTotalScore,
        getMinimumScoreForGrade
    });
}
