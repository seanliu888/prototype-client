// Sales Commission页面交互功能
console.log('sales-commission.js 文件已加载');

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
    
    console.log('所有事件监听器已设置完成');
});

