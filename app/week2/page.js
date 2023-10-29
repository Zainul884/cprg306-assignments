import Link from "next/link";
import StudentInfo from "../StudentInfo";

export default function Week2() {
    return (
        <main className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto text-center">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                    My Shopping List
                </h1>
                <StudentInfo />
            </div>
        </main>
    )
}
