"use client";
import { useState } from "react";

function permissionPage() {
    const [list, setList] = useState(["A", "B", "C"]);
    return (
        <ul>
            {list.map((item, index) => (
                <li key={item}>
                    <input defaultValue={item} />
                </li>
            ))}
            <button onClick={() => setList(["X", ...list])}>
                Thêm X vào đầu
            </button>
        </ul>
    );
}

export default permissionPage;
