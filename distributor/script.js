// 用户类型切换
document.addEventListener('DOMContentLoaded', function() {
    const userTypeButtons = document.querySelectorAll('.user-type-btn');
    
    userTypeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有active类
            userTypeButtons.forEach(b => b.classList.remove('active'));
            // 添加active类到当前按钮
            this.classList.add('active');
        });
    });
    
    // 密码显示/隐藏切换（登录页面）
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            togglePasswordVisibility(passwordInput, this);
        });
    }
    
    // 密码显示/隐藏切换（忘记密码页面 - 新密码）
    const forgotPasswordToggle = document.getElementById('passwordToggle');
    const newPasswordInput = document.getElementById('newPassword');
    
    if (forgotPasswordToggle && newPasswordInput) {
        forgotPasswordToggle.addEventListener('click', function() {
            togglePasswordVisibility(newPasswordInput, this);
        });
    }
    
    // 密码显示/隐藏切换（忘记密码页面 - 确认密码）
    const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (confirmPasswordToggle && confirmPasswordInput) {
        confirmPasswordToggle.addEventListener('click', function() {
            togglePasswordVisibility(confirmPasswordInput, this);
        });
    }
    
    // 密码显示/隐藏通用函数
    function togglePasswordVisibility(input, toggleBtn) {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        
        // 更新图标
        const svg = toggleBtn.querySelector('svg');
        if (type === 'text') {
            // 显示眼睛图标（可见状态）
            svg.innerHTML = `
                <path d="M10 3C5 3 1.73 7.11 1 10C1.73 12.89 5 17 10 17C15 17 18.27 12.89 19 10C18.27 7.11 15 3 10 3ZM10 15C7.24 15 5 12.76 5 10C5 7.24 7.24 5 10 5C12.76 5 15 7.24 15 10C15 12.76 12.76 15 10 15ZM10 7C8.34 7 7 8.34 7 10C7 11.66 8.34 13 10 13C11.66 13 13 11.66 13 10C13 8.34 11.66 7 10 7Z" fill="currentColor"/>
            `;
        } else {
            // 显示带斜线的眼睛图标（隐藏状态）
            svg.innerHTML = `
                <path d="M10 3C5 3 1.73 7.11 1 10C1.73 12.89 5 17 10 17C15 17 18.27 12.89 19 10C18.27 7.11 15 3 10 3ZM10 15C7.24 15 5 12.76 5 10C5 7.24 7.24 5 10 5C12.76 5 15 7.24 15 10C15 12.76 12.76 15 10 15ZM10 7C8.34 7 7 8.34 7 10C7 11.66 8.34 13 10 13C11.66 13 13 11.66 13 10C13 8.34 11.66 7 10 7Z" fill="currentColor"/>
                <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            `;
        }
    }
    
    // 获取验证码功能
    const getCodeLink = document.getElementById('getCodeLink');
    if (getCodeLink) {
        let countdown = 0;
        let countdownTimer = null;
        
        getCodeLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email1 = document.getElementById('email1');
            if (!email1 || !email1.value) {
                alert('请先输入邮箱地址');
                return;
            }
            
            // 如果正在倒计时，不执行
            if (countdown > 0) {
                return;
            }
            
            // 这里可以添加实际的验证码发送逻辑
            console.log('发送验证码到:', email1.value);
            
            // 开始倒计时
            countdown = 60;
            this.style.pointerEvents = 'none';
            this.style.color = '#999';
            
            const updateCountdown = () => {
                if (countdown > 0) {
                    this.textContent = `Get Verification Code (${countdown}s)`;
                    countdown--;
                    countdownTimer = setTimeout(updateCountdown, 1000);
                } else {
                    this.textContent = 'Get Verification Code';
                    this.style.pointerEvents = 'auto';
                    this.style.color = '#ff6b9d';
                }
            };
            
            updateCountdown();
            
            // 示例：显示成功消息
            alert('验证码已发送到您的邮箱');
        });
    }
    
    // 登录表单提交处理
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const activeUserType = document.querySelector('.user-type-btn.active').dataset.type;
            
            // 这里可以添加实际的登录逻辑
            console.log('登录信息:', {
                email: email,
                userType: activeUserType
            });
            
            // 根据用户类型跳转到不同页面
            if (activeUserType === 'reseller') {
                window.location.href = 'earnings-report.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        });
    }
    
    // 忘记密码表单提交处理
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email1 = document.getElementById('email1').value;
            const code = document.getElementById('code').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // 获取选中的用户类型
            const activeUserType = document.querySelector('.user-type-btn.active');
            const userType = activeUserType ? activeUserType.dataset.type : 'distributor';
            
            // 验证密码是否匹配
            if (newPassword !== confirmPassword) {
                alert('两次输入的密码不一致，请重新输入');
                return;
            }
            
            // 这里可以添加实际的密码重置逻辑
            console.log('密码重置信息:', {
                email: email1,
                code: code,
                newPassword: newPassword,
                userType: userType
            });
            
            // 示例：显示成功消息（实际应用中应该调用API）
            alert(`密码重置请求已提交\n邮箱: ${email1}\n用户类型: ${userType}`);
        });
    }
});


