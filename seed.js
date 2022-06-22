// import { addDoc, collection } from 'firebase/firestore';
// import { db } from './firebase';

// const seedDatabase = async () => {
//   const users = [
//     {
//       userId: '12345abcdefg',
//       userName: 'alisafaa',
//       fullName: 'ali safaa',
//       email: 'alisafaa@gmail.com',
//       following: [3],
//       followers: [2, 3, 4],
//       dateCreate: Date.now(),
//     },
//     {
//       userId: 1,
//       userName: 'bennyproduction',
//       fullName: 'benny production',
//       email: 'bennyproduction@gmail.com',
//       following: [],
//       followers: ['12345abcdefg'],
//       dateCreate: Date.now(),
//     },
//     {
//       userId: 2,
//       userName: 'sashamorga',
//       fullName: 'sasha morga',
//       email: 'sashamorga@gmail.com',
//       following: [],
//       followers: ['12345abcdefg'],
//       dateCreate: Date.now(),
//     },
//     {
//       userId: 3,
//       userName: 'sarahadson',
//       fullName: 'sara hadson',
//       email: 'sarahadson@gmail.com',
//       following: [],
//       followers: ['12345abcdefg'],
//       dateCreate: Date.now(),
//     },
//   ];
//   for (let k = 0; k < users.length; k++) {
//     await addDoc(collection(db, 'users', users[k]));
//   }
//   for (let i = 1; i < 4; i++) {
//     addDoc(collection(db, 'photos'), {
//       photoId: i,
//       userId: '1',
//       imageSource: `/images/${i}.jpeg`,
//       createDate: Date.now(),
//     });
//   }
// };
// export default seedDatabase;
