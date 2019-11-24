import dhbk1 from './images/dhbk1.jpeg';

export default [
  {
    city: '15',
    groupMajor: {
      _id: '5dbe3c5f6b5d32218be6ce3e',
      name: 'Khoa học - Kỹ thuật',
      __v: 0,
    },
    id: '5dbe3cf46b5d32218be6ce3f',
    images: [
      {
        src: dhbk1,
        title: 'dhbk1.jpeg',
      },
    ],
    major: [
      {
        _id: '5dbe4c0a0ffb3139e9e8a534',
        name: {
          _id: '5d9010b86597bf186d2e97bd',
          name: 'Công nghệ thông tin',
          __v: 0,
        },
        price: 300,
      },
    ],
    name: 'Trường Đại Học Bách Khoa Đà Nẵng',
    slug: 'truong-dai-hoc-bach-khoa-da-nang',
    reviews: [
      {
        _id: '5dbe9d6c974a0734d56647fe',
        ratingStar: 4.5,
        displayName: 'Thang Nguyen',
        reviewDate: new Date().toISOString(),
        major: 'Software Engineer',
        graduationYear: '2020',
        review:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu!',
      },
    ],
  },
];
