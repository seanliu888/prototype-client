// Dashboard交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 导航项点击处理
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 如果有点击事件，可以在这里处理导航逻辑
            // 例如：移除所有active类，添加当前项的active类
            if (!this.querySelector('.nav-arrow')) {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Branding 和 Reseller 菜单展开/收起
    const navItemParents = document.querySelectorAll('.nav-item-parent');
    navItemParents.forEach(parent => {
        parent.addEventListener('click', function(e) {
            // 如果点击的是箭头或父项本身，切换展开状态
            if (e.target.closest('.nav-arrow') || e.target === this || e.target.closest('span')) {
                e.preventDefault();
                e.stopPropagation();
                
                const isExpanded = this.classList.contains('expanded');
                const submenu = this.nextElementSibling;
                
                if (isExpanded) {
                    this.classList.remove('expanded');
                    if (submenu && submenu.classList.contains('nav-submenu')) {
                        submenu.style.display = 'none';
                    }
                } else {
                    this.classList.add('expanded');
                    if (submenu && submenu.classList.contains('nav-submenu')) {
                        submenu.style.display = 'flex';
                    }
                }
            }
        });
    });
    
    // 分页按钮点击处理
    const pageNumbers = document.querySelectorAll('.page-number');
    pageNumbers.forEach(btn => {
        btn.addEventListener('click', function() {
            pageNumbers.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 上一页/下一页按钮
    const prevBtn = document.querySelector('.page-btn:first-of-type');
    const nextBtn = document.querySelector('.page-btn:last-of-type');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            const activePage = document.querySelector('.page-number.active');
            if (activePage) {
                const currentPage = parseInt(activePage.textContent);
                if (currentPage > 1) {
                    const prevPage = document.querySelector(`.page-number:nth-child(${currentPage})`);
                    if (prevPage) {
                        pageNumbers.forEach(b => b.classList.remove('active'));
                        prevPage.classList.add('active');
                    }
                }
            }
        });
        
        nextBtn.addEventListener('click', function() {
            const activePage = document.querySelector('.page-number.active');
            if (activePage) {
                const currentPage = parseInt(activePage.textContent);
                if (currentPage < 18) {
                    const nextPage = document.querySelector(`.page-number:nth-child(${currentPage + 2})`);
                    if (nextPage) {
                        pageNumbers.forEach(b => b.classList.remove('active'));
                        nextPage.classList.add('active');
                    }
                }
            }
        });
    }
    
    // 每页显示数量选择
    const itemsSelect = document.querySelector('.items-select');
    if (itemsSelect) {
        itemsSelect.addEventListener('change', function() {
            console.log('每页显示数量:', this.value);
            // 这里可以添加实际的分页逻辑
        });
    }
    
    // 搜索功能（仅内容搜索）
    const contentSearchInput = document.querySelector('.content-search-input');
    if (contentSearchInput) {
        contentSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            console.log('搜索:', searchTerm);
            // 这里可以添加实际的搜索逻辑
        });
    }
    
    // Reseller筛选功能
    const resellerFilter = document.getElementById('resellerFilter');
    if (resellerFilter) {
        resellerFilter.addEventListener('change', function() {
            console.log('Reseller筛选:', this.value);
            filterTable();
        });
    }
    
    // Type筛选功能
    const typeFilter = document.getElementById('typeFilter');
    if (typeFilter) {
        typeFilter.addEventListener('change', function() {
            console.log('Type筛选:', this.value);
            filterTable();
        });
    }
    
    // 日期筛选功能
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    if (startDateInput && endDateInput) {
        startDateInput.addEventListener('change', function() {
            console.log('开始日期:', this.value);
            filterTable();
        });
        
        endDateInput.addEventListener('change', function() {
            console.log('结束日期:', this.value);
            filterTable();
        });
    }
    
    // 表格筛选函数
    function filterTable() {
        const resellerValue = resellerFilter ? resellerFilter.value.toLowerCase() : '';
        const typeValue = typeFilter ? typeFilter.value.toLowerCase() : '';
        const startDateValue = startDateInput ? startDateInput.value : '';
        const endDateValue = endDateInput ? endDateInput.value : '';
        
        const tableRows = document.querySelectorAll('.data-table tbody tr');
        
        tableRows.forEach(row => {
            let showRow = true;
            
            // Reseller筛选（检查Referral列）
            if (resellerValue) {
                const referralCell = row.cells[3]; // Referral列是第4列（索引3）
                if (referralCell && !referralCell.textContent.toLowerCase().includes(resellerValue)) {
                    showRow = false;
                }
            }
            
            // Type筛选
            if (typeValue && showRow) {
                const typeCell = row.cells[1]; // Type列是第2列（索引1）
                if (typeCell && !typeCell.textContent.toLowerCase().includes(typeValue)) {
                    showRow = false;
                }
            }
            
            // 日期筛选
            if (startDateValue && showRow) {
                const dateCell = row.cells[6]; // Date列是第7列（索引6）
                if (dateCell) {
                    const rowDate = dateCell.textContent.trim();
                    if (rowDate < startDateValue) {
                        showRow = false;
                    }
                }
            }
            
            if (endDateValue && showRow) {
                const dateCell = row.cells[6]; // Date列是第7列（索引6）
                if (dateCell) {
                    const rowDate = dateCell.textContent.trim();
                    if (rowDate > endDateValue) {
                        showRow = false;
                    }
                }
            }
            
            row.style.display = showRow ? '' : 'none';
        });
    }
    
    // 语言选择器（可以添加下拉菜单功能）
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('click', function() {
            console.log('打开语言选择菜单');
            // 这里可以添加语言选择下拉菜单
        });
    }
    
    // 用户菜单
    const userMenuWrapper = document.querySelector('.user-menu-wrapper');
    const userAvatarBtn = document.querySelector('.user-menu-wrapper .user-avatar');
    
    if (userAvatarBtn && userMenuWrapper) {
        userAvatarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            userMenuWrapper.classList.toggle('active');
        });
        
        // 点击页面其他地方关闭菜单
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.user-menu-wrapper')) {
                userMenuWrapper.classList.remove('active');
            }
        });
    }
});

