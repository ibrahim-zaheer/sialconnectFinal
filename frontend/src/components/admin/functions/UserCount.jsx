// const UserCount = ({ users, loading }) => {
//     return (
//       <div className="card w-96 bg-base-100 shadow-xl border border-gray-200">
//         <div className="card-body text-center">
//           <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
//           <p className="text-4xl font-bold text-primary">
//             {!loading ? users.length : <span className="loading loading-dots loading-md" />}
//           </p>
//         </div>
//       </div>
//     );
//   };
  
//   export default UserCount;
  
// UserCount.jsx
const UserCount = ({ users, loading }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h3 className="text-lg font-medium text-neutral-600 mb-2">Registered Users</h3>
      <div className="text-5xl font-bold text-primary-600">
        {!loading ? (
          users.length.toLocaleString()
        ) : (
          <div className="h-12 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <p className="text-sm text-neutral-500 mt-2">
        Across all user roles
      </p>
    </div>
  );
};

export default UserCount;