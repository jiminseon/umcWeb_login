import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { loginUser } from "../reducer/userSlice.js";
import axios from "axios";


function LoginComponent() {
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [pw, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const LoginFunc = (e) => {
        e.preventDefault();
        // Loading... 메세지 출력
        setMsg("Loading...");

        // API
        let body = {
            id,
            pw
        }
        axios.post("http://localhost:8000/user/login", body)
        .then(res => {
            console.log(res.data)
            
            // 2순위 통신이 끝나야 작동. 통신 이후 클릭이 되도록.
            setLoading(false);
            // Loading... 메세지가 통신이 끝난 후 1.5초 이후 없어짐.
            setTimeout(() => setMsg(""), 1500);

            dispatch(loginUser(res.data.result));
            localStorage.setItem('token', res.data.result.AccessToken);
            localStorage.setItem('id', res.data.result.userId);
        })
        // 1순위 로그인 버튼을 누르면 클릭이 안되도록.
        setLoading(true);
    }

    return (
        <>
            <h1>LoginComponent</h1>
            <form 
                onSubmit={LoginFunc}
                className="login-wrap"
            >
                <input
                        type="text" 
                        placeholder='아이디' 
                        className='id'
                        onChange={e => setId(e.target.value)}
                    />
                    <br />
                    <input 
                        type="password" 
                        placeholder='비밀번호' 
                        className='pw'
                        onChange={e => setPassword(e.target.value)} 
                    />
                <br />
                <button
                    disabled={loading} 
                    type="submit"
                    className='btn'
                >
                    로그인
                </button>
                <div
                    className='msg'
                >
                    {msg}
                </div>
            </form>
        </>
    )
}

export default LoginComponent