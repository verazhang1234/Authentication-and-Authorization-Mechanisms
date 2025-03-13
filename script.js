document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    errorMessage.textContent = "";
    
    // 添加调试日志
    console.log('Attempting login with:', { username, password });

    try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // 修改：使用 username 而不是 email 作为字段名
            body: JSON.stringify({ username: username, password: password })
        });

        const data = await response.json();
        // 添加调试日志
        console.log('Server response:', data);

        if (response.ok) {
            // 保存用户信息和token
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // 显示成功消息
            errorMessage.style.color = 'green';
            errorMessage.textContent = "登录成功！正在跳转...";
            
            // 延迟跳转，让用户看到成功消息
            setTimeout(() => {
                window.location.href = "/dashboard.html";
            }, 1500);
        } else {
            errorMessage.style.color = 'red';
            errorMessage.textContent = data.message || "登录失败，请检查用户名和密码。";
        }
    } catch (error) {
        errorMessage.style.color = 'red';
        errorMessage.textContent = "网络错误，请稍后重试。";
        console.error("登录错误:", error);
    }
}); 