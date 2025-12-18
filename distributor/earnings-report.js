// Earnings Report页面交互功能
console.log('earnings-report.js 文件已加载');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded 事件已触发');
    
    // 导出佣金按钮
    const exportBtn = document.querySelector('.export-commissions-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('点击了导出佣金按钮');
            // 这里可以添加实际的导出逻辑
            alert('导出佣金功能');
        });
    }
    
    // 操作搜索
    const actionSearchInput = document.querySelector('.action-search-input');
    if (actionSearchInput) {
        actionSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            console.log('搜索:', searchTerm);
            // 这里可以添加实际的搜索逻辑
        });
    }
    
    // 分页按钮点击处理
    const pageNumbers = document.querySelectorAll('.page-number');
    pageNumbers.forEach(btn => {
        btn.addEventListener('click', function() {
            pageNumbers.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 每页显示数量选择
    const itemsSelect = document.querySelector('.items-select');
    if (itemsSelect) {
        itemsSelect.addEventListener('change', function() {
            console.log('每页显示数量:', this.value);
            // 这里可以添加实际的分页逻辑
        });
    }
    
    // 用户菜单（确保能够正常工作）
    // 延迟执行，确保在 dashboard.js 之后执行
    setTimeout(function() {
        const userMenuWrapper = document.querySelector('.user-menu-wrapper');
        const userAvatarBtn = document.querySelector('.user-menu-wrapper .user-avatar');
        
        console.log('earnings-report.js: 检查用户菜单元素', { userMenuWrapper, userAvatarBtn });
        
        if (userMenuWrapper && userAvatarBtn) {
            // 移除可能存在的旧事件监听器（通过克隆元素）
            const newBtn = userAvatarBtn.cloneNode(true);
            userAvatarBtn.parentNode.replaceChild(newBtn, userAvatarBtn);
            
            // 重新绑定事件监听器
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('earnings-report.js: 点击头像按钮');
                userMenuWrapper.classList.toggle('active');
                console.log('earnings-report.js: 菜单状态', userMenuWrapper.classList.contains('active'));
            });
            
            // 点击页面其他地方关闭菜单
            document.addEventListener('click', function(e) {
                if (userMenuWrapper && !e.target.closest('.user-menu-wrapper')) {
                    userMenuWrapper.classList.remove('active');
                }
            });
        } else {
            console.error('earnings-report.js: 未找到用户菜单元素');
        }
    }, 200);
    
    console.log('所有事件监听器已设置完成');
});

