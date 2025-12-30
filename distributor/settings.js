// Settings页面交互功能
console.log('settings.js 文件已加载');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded 事件已触发');
    
    // 保存密码按钮
    const savePasswordBtn = document.querySelector('.password-save-btn');
    if (savePasswordBtn) {
        savePasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const oldPassword = document.querySelector('.password-input[placeholder="Old Password"]')?.value;
            const newPassword = document.querySelector('.password-input[placeholder="New Password"]')?.value;
            const confirmPassword = document.querySelector('.password-input[placeholder="Confirm Password"]')?.value;
            
            if (!oldPassword || !newPassword || !confirmPassword) {
                alert('请填写所有密码字段');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('新密码和确认密码不匹配');
                return;
            }
            
            console.log('保存密码');
            alert('密码已更新！');
            
            // 清空输入框
            document.querySelectorAll('.password-input').forEach(input => {
                input.value = '';
            });
        });
    }
    
    console.log('所有事件监听器已设置完成');
});



