export default function UserView({ user }: { user: any }) {
    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Welcome, {user.name}!</h3>
                <div className="mt-2 text-sm text-gray-500">
                    <p>Email: {user.email}</p>
                    <p>Status: <span className={user.is_approved ? 'text-green-600 font-bold' : 'text-yellow-600 font-bold'}>
                        {user.is_approved ? 'Approved' : 'Pending Approval'}
                    </span></p>
                </div>
                {!user.is_approved && (
                    <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
                        <p>Your account is waiting for administrator approval. You might not be able to access some features.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
