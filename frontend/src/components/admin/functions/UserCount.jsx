const UserCount = ({ users, loading }) => {
    return (
      <div className="card w-96 bg-base-100 shadow-xl border border-gray-200">
        <div className="card-body text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-4xl font-bold text-primary">
            {!loading ? users.length : <span className="loading loading-dots loading-md" />}
          </p>
        </div>
      </div>
    );
  };
  
  export default UserCount;
  