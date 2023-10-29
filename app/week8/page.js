"use client";
import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";  // Ensure this import is present if you're using the Link component

function LandingPage() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    const handleLogin = async () => {
        await gitHubSignIn();
    };

    const handleLogout = async () => {
        await firebaseSignOut();
    };

    if (!user) {
        return (
            <main className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto text-center">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                        Shopping List App
                    </h1>
                    <button 
                        onClick={handleLogin} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Login with GitHub
                    </button>
                </div>
            </main>
        );
    } else {
        return (
            <main className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto text-center">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                        Welcome back!
                    </h1>
                    <p className="text-gray-800 text-lg mb-4">
                        Welcome, {user.displayName} ({user.email})
                    </p>
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4"
                    >
                        Logout
                    </button>
                    <div className="mt-4">
                        <Link href="week8/shopping-list" className="text-blue-500 hover:underline">
                            Go to Shopping List
                        </Link>
                    </div>
                </div>
            </main>
        );
    }
}

export default LandingPage;
