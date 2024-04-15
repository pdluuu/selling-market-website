"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
    const router = useRouter();

    // if (!window.localStorage.getItem("access_token")) {
    //     router.push("/auth/login");
    // }
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const getUser = () => {
    //         fetch("http://localhost:8080/api/v1/auth/login/success", {
    //             method: "GET",
    //             credentials: "include",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 "Access-Control-Allow-Origin": "*",
    //                 "Access-Control-Allow-Methods": " OPTIONS, GET, POST",
    //                 "Access-Control-Allow-Headers":
    //                     " Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control",
    //             },
    //         })
    //             .then((response) => {
    //                 console.log(response);

    //                 if (response.status === 200) return response.json();
    //                 throw new Error("authentication has been failed!");
    //             })
    //             .then((resObject) => {
    //                 setUser(resObject.user);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     };
    //     getUser();
    // }, []);

    useEffect(() => {
        const getUser = () => {
            fetch("http://localhost:8080/api/v1/auth/login/success", {
                method: "GET",
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })

                .catch((err) => {
                    console.log(err);
                });
        };
        getUser();
    }, []);
    return (
        <button type="button" onClick={() => router.push("/dashboard")}>
            <div className=" lg:text-sm text-lg">Dashboard</div>
        </button>
    );
}
