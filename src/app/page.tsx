import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Link href="/admin">
                <Image
                    src="https://i.pinimg.com/736x/db/04/ef/db04ef10d7b9ca96ad242c840bbfc783.jpg"
                    alt="Description"
                    width={500}
                    height={500}
                />
            </Link>
        </div>
    );
}
