// 리엑트 훅스 중에서 (useState라는 상태관리 라이브러리)
// useEffect: 리엑트 생명주기 관리 라이브러리
// useCallback: 리엑트 콜백함수 라이브러리
import { useState, useEffect, useCallback } from "react";

function UserList() {
    // 상태변수
    const [userlist, setUserlist] = useState([]);

    // useCallback에서 2번째 매개변수로서
    // 내부 상태 관리가 가능!
    const requestFetchUsers = useCallback(async () => {
        const url = "/api/users";
        const response = await fetch(url);  //Promise 상태
        console.log(response);
        const json = await response.json();
        console.log(json);
        setUserlist(json.content);
    }, []);

    // 초기상태(맨처음 로드될 때)는
    // 반드시 빈배열을 2번째 매개변수에 던진다!
    // 2번째 매개변수를 생략할 경우, 매번 업데이트될 때마다 실행(잘 안씀!)
    // 배열에 값을 전달할 경우, 값이 변경될 때마다 효과가 발생!!
    useEffect( () => {
        requestFetchUsers();
    },[requestFetchUsers]);

    return (
        <main className="userListSection">
            <section>


                <h1>유저 리스트</h1>
                <ul>
                    {userlist.map((list)=>(
                        <li key={list._id}>
                            {list.name} : {list.age}세
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default UserList;