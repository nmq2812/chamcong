"use client";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios, { AxiosError } from "axios";

const FaceCapture: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const [result, setResult] = useState<string>("");

    const capture = async () => {
        const screenshot = webcamRef.current?.getScreenshot();
        if (!screenshot) return;

        try {
            const response = await axios.post(
                "http://localhost:5001/recognize-face",
                {
                    image: screenshot.replace("data:image/jpeg;base64,", ""),
                },
            );

            setResult(`✅ Welcome, ${response.data.user}`);
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                setResult(`❌ ${err.response.data.message}`);
            } else {
                setResult("❌ Error connecting to server");
            }
        }
    };

    return (
        <div className="text-center">
            <Webcam
                audio={false}
                height={320}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={480}
                videoConstraints={{
                    width: 480,
                    height: 320,
                    facingMode: "user",
                }}
            />
            <div className="mt-4">
                <button
                    onClick={capture}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Chấm công
                </button>
            </div>
            <p className="mt-4 text-lg">{result}</p>
        </div>
    );
};

export default FaceCapture;
