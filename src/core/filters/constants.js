export const filtersConfig = {
    gender: {
        label: 'gender',
        options: [
            ['male', 'male'],
            ['female', 'female'],
            ['non_binary', 'non-binary/third gender']
        ]
    },
    salary: {
        label: 'salary',
        options: [
            ['range_work_for_free', '$0'],
            ['range_0_10', '$0-$10k'],
            ['range_10_30', '$10-$30k'],
            ['range_30_50', '$30-$50k'],
            ['range_50_100', '$50-$100k'],
            ['range_100_200', '$100-$200k'],
            ['range_more_than_200', '$200k+']
        ]
    },
    companySize: {
        label: 'company size',
        options: [
            ['range_1', 'one'],
            ['range_1_5', '1~5'],
            ['range_5_10', '5~10'],
            ['range_10_20', '10~20'],
            ['range_20_50', '20~50'],
            ['range_50_100', '50~100'],
            ['range_100_1000', '100~1000'],
            ['range_more_than_1000', '1000+']
        ]
    },
    workExperience: {
        label: 'work experience',
        options: [
            ['range_less_than_1', '<1 year'],
            ['range_1_2', '1~2 years'],
            ['range_2_5', '2~5 years'],
            ['range_5_10', '5~10 years'],
            ['range_10_20', '10~20 years'],
            ['range_more_than_20', '>20 years']
        ]
    }
}
