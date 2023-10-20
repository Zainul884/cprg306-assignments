import StudentInfo from "./StudentInfo";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          CPRG 306: Web Development 2 - Assignments
        </h1>
        <StudentInfo />
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Week Assignments
          </h2>
          <ul className="space-y-2">
            <li>
              <Link href="./week2" className="text-blue-500 hover:underline">
                Week 2 Assignment
              </Link>
            </li>
            <li>
              <Link href="./week3" className="text-blue-500 hover:underline">
                Week 3 Assignment
              </Link>
            </li>
            <li>
              <Link href="./week4" className="text-blue-500 hover:underline">
                Week 4 Assignment
              </Link>
            </li>
            <li>
              <Link href="./week5" className="text-blue-500 hover:underline">
                Week 5 Assignment
              </Link>
            </li>
            <li>
              <Link href="./week6" className="text-blue-500 hover:underline">
                Week 6 Assignment
              </Link>
            </li>
            <li>
              <Link href="./week7" className="text-blue-500 hover:underline">
                Week 7 Assignment
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
