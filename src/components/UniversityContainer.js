import React from 'react';
import UniversityFilter from './UniversityFilter';
import UniversityList from './UniversityList';
import { withUniversityConsumer } from '../context';
import Loading from './Loading';

function UniversityContainer({ context }) {
  const { loading, sortedUniversities, universities } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <UniversityFilter universities={universities} />
      <UniversityList universities={sortedUniversities} />
    </div>
  );
}

export default withUniversityConsumer(UniversityContainer);

// import React from 'react';
// import UniversityFilter from './UniversityFilter';
// import UniversityList from './UniversityList';
// import { UniversityConsumer } from '../context';
// import Loading from './Loading';

// export default function UniversityContainer() {
//   return (
//     <UniversityConsumer>
//       {value => {
//         const { loading, sortedUniversities, universities } = value;
//         if (loading) {
//           return <Loading />;
//         }
//         return (
//           <div>
//             Hello From Universities Container
//             <UniversityFilter universities={universities} />
//             <UniversityList universities={sortedUniversities} />
//           </div>
//         );
//       }}
//     </UniversityConsumer>
//   );
// }
