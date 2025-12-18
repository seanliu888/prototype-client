// Profile页面交互功能
console.log('profile.js 文件已加载');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded 事件已触发');
    
    // 可伸缩字段点击事件
    const clickableHeaders = document.querySelectorAll('.profile-field-header-clickable');
    clickableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const fieldCard = this.closest('.profile-field-card');
            const isActive = fieldCard.classList.contains('active');
            
            // 关闭所有其他展开的字段
            document.querySelectorAll('.profile-field-card').forEach(card => {
                if (card !== fieldCard) {
                    card.classList.remove('active');
                }
            });
            
            // 切换当前字段
            if (isActive) {
                fieldCard.classList.remove('active');
            } else {
                fieldCard.classList.add('active');
            }
        });
    });
    
    // 保存按钮功能
    const saveBtns = document.querySelectorAll('.profile-save-btn');
    saveBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const inputGroup = this.closest('.profile-input-group');
            const input = inputGroup?.querySelector('.profile-input');
            if (input) {
                const value = input.value;
                console.log('保存:', value);
                
                // 更新显示的值
                const fieldCard = this.closest('.profile-field-card');
                const fieldValue = fieldCard.querySelector('.profile-field-value');
                if (fieldValue && value) {
                    fieldValue.textContent = value;
                }
                
                // 关闭展开区域
                fieldCard.classList.remove('active');
                
                alert('保存成功！');
            }
        });
    });
    
    // 编辑图标按钮功能
    const editIconBtns = document.querySelectorAll('.profile-edit-icon-btn');
    editIconBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const expandable = this.closest('.profile-field-expandable');
            const input = expandable?.querySelector('.profile-input');
            if (input) {
                input.focus();
                input.select();
            }
        });
    });
    
    // 复制邀请链接
    const copyLinkBtn = document.querySelector('.referral-copy-btn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const textToCopy = this.getAttribute('data-copy') || this.previousElementSibling.value;
            
            // 复制到剪贴板
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // 显示复制成功提示
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                    }, 2000);
                });
            } else {
                // 降级方案
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                
                const originalHTML = this.innerHTML;
                this.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 2000);
            }
        });
    }
    
    // 复制QR码
    const qrCopyBtn = document.querySelector('.qr-copy-btn');
    if (qrCopyBtn) {
        qrCopyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const invitationLink = 'https://test.esimtours.com/zh-Hans/register?referralCode=RFG36E8B';
            
            // 复制链接
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(invitationLink).then(() => {
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                    }, 2000);
                });
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = invitationLink;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                
                const originalHTML = this.innerHTML;
                this.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 2000);
            }
        });
    }
    
    console.log('所有事件监听器已设置完成');
});

