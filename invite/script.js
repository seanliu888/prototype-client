// 标签页切换功能
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const coupons = document.querySelectorAll('.coupon-card');
    const emptyState = document.getElementById('emptyState');
    const couponsGrid = document.getElementById('couponsContainer');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有活跃状态
            tabs.forEach(t => t.classList.remove('active'));
            
            // 添加当前活跃状态
            this.classList.add('active');
            
            // 获取选中的状态
            const selectedStatus = this.dataset.status;
            
            // 显示/隐藏优惠券
            let visibleCount = 0;
            coupons.forEach(coupon => {
                if (selectedStatus === 'all' || coupon.dataset.status === selectedStatus) {
                    coupon.style.display = 'flex';
                    visibleCount++;
                } else {
                    coupon.style.display = 'none';
                }
            });
            
            // 显示/隐藏空状态
            if (visibleCount === 0) {
                emptyState.style.display = 'block';
                couponsGrid.style.display = 'none';
            } else {
                emptyState.style.display = 'none';
                couponsGrid.style.display = 'grid';
            }
        });
    });

    // 初始化显示可用优惠券
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        activeTab.click();
    }

    // 复制优惠券码功能
    const couponCodes = document.querySelectorAll('.coupon-code');
    couponCodes.forEach(code => {
        code.style.cursor = 'pointer';
        code.title = '点击复制券码';
        
        code.addEventListener('click', function() {
            const codeText = this.textContent.replace('券码: ', '');
            copyToClipboard(codeText, '券码已复制: ' + codeText);
        });
    });

    // 优惠券使用倒计时（针对即将过期的优惠券）
    updateExpireStatus();
    setInterval(updateExpireStatus, 60000); // 每分钟更新一次

    function updateExpireStatus() {
        const unusedCoupons = document.querySelectorAll('.coupon-card.unused');
        const now = new Date();
        
        unusedCoupons.forEach(coupon => {
            const expireText = coupon.querySelector('.coupon-expire');
            if (expireText) {
                const expireDateStr = expireText.textContent.replace('有效期至: ', '');
                const expireDate = new Date(expireDateStr);
                const diffTime = expireDate - now;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                // 如果3天内过期，添加警告样式
                if (diffDays <= 3 && diffDays > 0) {
                    expireText.style.color = '#ff6b6b';
                    expireText.style.fontWeight = 'bold';
                    expireText.innerHTML = `⚠️ 有效期至: ${expireDateStr} (还剩${diffDays}天)`;
                } else if (diffDays <= 0) {
                    // 已过期，更新状态
                    coupon.classList.remove('unused');
                    coupon.classList.add('expired');
                    coupon.dataset.status = 'expired';
                    
                    const badge = coupon.querySelector('.coupon-status-badge');
                    badge.className = 'coupon-status-badge expired-badge';
                    badge.textContent = '已过期';
                }
            }
        });
    }

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 复制邀请码
function copyCode() {
    const code = document.getElementById('inviteCode').textContent;
    copyToClipboard(code, '邀请码已复制: ' + code);
}

// 复制邀请链接
function copyLink() {
    const link = document.getElementById('inviteLink').value;
    copyToClipboard(link, '邀请链接已复制！');
}

// 复制到剪贴板
function copyToClipboard(text, message) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(message);
        }).catch(() => {
            fallbackCopy(text, message);
        });
    } else {
        fallbackCopy(text, message);
    }
}

// 降级复制方案
function fallbackCopy(text, message) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showToast(message);
    } catch (err) {
        showToast('复制失败，请手动复制');
    }
    
    document.body.removeChild(textarea);
}

// 显示提示信息
function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 1000;
        animation: slideDown 0.3s ease;
    `;
    
    // 添加动画样式
    if (!document.getElementById('toast-animations')) {
        const style = document.createElement('style');
        style.id = 'toast-animations';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 分享到微信
function shareToWechat() {
    showToast('请使用手机浏览器打开并分享到微信');
}

// 分享到QQ
function shareToQQ() {
    showToast('请使用手机浏览器打开并分享到QQ');
}

// 分享到微博
function shareToWeibo() {
    const link = document.getElementById('inviteLink').value;
    const text = encodeURIComponent('快来注册，使用我的邀请码享受优惠！');
    const url = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(link)}&title=${text}`;
    window.open(url, '_blank');
}

// 分享到邮件
function shareToEmail() {
    const link = document.getElementById('inviteLink').value;
    const code = document.getElementById('inviteCode').textContent;
    const subject = encodeURIComponent('邀请你注册享受优惠');
    const body = encodeURIComponent(`嗨！我在使用这个平台，邀请你来注册！\n\n使用我的邀请码: ${code}\n或直接点击链接: ${link}\n\n期待与你一起！`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}
