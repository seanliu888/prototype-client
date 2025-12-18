// Refer & Invite页面交互功能
console.log('refer-invite.js 文件已加载');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded 事件已触发');
    
    // 复制邀请链接
    const copyLinkBtn = document.querySelector('.referral-input-group .copy-btn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function() {
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
    
    // 复制QR码（可以复制链接或下载图片）
    const qrCopyBtn = document.querySelector('.qr-copy-btn');
    if (qrCopyBtn) {
        qrCopyBtn.addEventListener('click', function() {
            const invitationLink = 'https://zhangsan.esimtours.com';
            
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

