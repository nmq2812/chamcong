import FaceCapture from "@/components/face-capture";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <FaceCapture />
            <Link href="/admin" className="mt-4 text-blue-500 hover:underline">To Admin page</Link>
        </div>
    );
}
