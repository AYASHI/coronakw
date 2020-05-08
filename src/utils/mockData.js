export const questions = [
  {
    id: '1',
    questionText: 'ارتفاع درجة الحرارة الى ما يشبه الحمى',
  },
  {id: '2', questionText: 'السعال الجاف والكحة المؤلمة'},
  {id: '3', questionText: 'سيلان الأنف بإستمرار'},
  {id: '4', questionText: 'إسهال'},
  {
    id: '5',
    questionText: 'الشعور بالتعب وارهاق عام في الجسم',
  },
  {id: '6', questionText: 'الصعوبة بالتنفس'},
];

export const accomodationTypes = [
  {
    id: 0,
    text: 'Building',
  },
  {
    id: 1,
    text: 'House',
  },
];

export const countries = [
  {
    id: 1,
    text: 'الصين',
  },
  {
    id: 2,
    text: 'اليابان',
  },
  {
    id: 3,
    text: 'امريكا',
  },
  {
    id: 4,
    text: 'ايطاليا',
  },
  {
    id: 5,
    text: 'المملكة المتحدة',
  },
  {
    id: 6,
    text: 'اسبانيا',
  },
];
export const areas = cityId => {
  const citiesSelected = cities.filter(city => {
    return city.id === cityId;
  });

  if (citiesSelected.length > 0) {
    const areas = citiesSelected[0].areas;
    const mapped = areas.map(item => {
      return {
        ...item,
        id: item.areaId,
        text: item.areaName,
      };
    });

    return mapped;
  }

  return [];
};

export const cities = (() => {
  const parsed = JSON.parse(
    `
    [
      {
          "cityId": 1,
          "cityName": "الكويت",
          "areas": [
              {
                  "areaId": 1,
                  "areaName": "دسمان"
              },
              {
                  "areaId": 2,
                  "areaName": "شرق"
              }
          ]
      },
      {
          "cityId": 2,
          "cityName": "حولي",
          "areas": [
              {
                  "areaId": 3,
                  "areaName": "السالمية"
              },
              {
                  "areaId": 4,
                  "areaName": "الجابرية"
              }
          ]
      }
    ]
    `,
  );

  const mapped = parsed.map(item => {
    return {
      ...item,
      id: item.cityId,
      text: item.cityName,
    };
  });
  return mapped;
})();
